import { createServer as createServerNode } from "node:net";

/**
 * @prop {number} opcode
 * @prop {string} payload
 * */
export class Request {
	static TEXT = 1;
	static CLOSE = 8;
	constructor(buffer) {
		const firstByte = buffer[0];
		this.opcode = firstByte & 0x0f; // Opcode (e.g., text frame, binary frame, etc.)

		if (this.opcode !== 1) return this;

		this.payload = decodeWebSocketFrame(buffer);
		return this;
	}
}
/**
 * Small wrapper around node:net.createServer. Processing websocket handshake,
 * emitting `message` event (with decoded payload). Also allow sending messages
 * using `socket.emit("response", message)`.
 *
 * ```js
 * const log= (...args) => console.log(...args);
 * const server= createServer((socket) => {
 *	 socket.on("message", log.bind(null, "Decoded message:"));
 *	 socket.emit("response", "Hello world!");
 *	 socket.emit("response", { alice: "bob" });
 * })
 * ```
 * …dev detail, see https://ably.com/topic/websockets
 *
 * @param {(socket: import("node:net").Socket)=> void} onClinet
 * */
export function createServer(onClinet) {
	return createServerNode((socket) => {
		onClinet(socket);
		socket.on("data", async (data) => {
			const request = data.toString();

			const keyMatch = request.match(/Sec-WebSocket-Key: (.+)/);
			if (!keyMatch || !keyMatch[1]) return socket.emit("message", new Request(data));

			// Handshake
			const secWebSocketKey = keyMatch[1].trim();
			const acceptKey = await generateAcceptValue(secWebSocketKey);

			const responseHeaders = [
				"HTTP/1.1 101 Switching Protocols",
				"Upgrade: websocket",
				"Connection: Upgrade",
				`Sec-WebSocket-Accept: ${acceptKey}`,
				"",
				"",
			].join("\r\n");

			socket.write(responseHeaders);
		});
		socket.on("response", (message) => {
			message = typeof message === "string" ? message : JSON.stringify(message);
			const frame = Buffer.from([0x81, message.length, ...Buffer.from(message)]);
			socket.write(frame);
		});
	});
}

import { createHash } from "node:crypto";

async function generateAcceptValue(secWebSocketKey) {
	const MAGIC_STRING = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

	const hash = createHash("sha1");
	hash.update(secWebSocketKey + MAGIC_STRING);
	return hash.digest("base64");
}

function decodeWebSocketFrame(buffer) {
	const secondByte = buffer[1];
	const isMasked = (secondByte & 0x80) === 0x80; // Check if MASK bit is set
	let payloadLength = secondByte & 0x7f; // Get payload length

	let offset = 2;
	if (payloadLength === 126) {
		payloadLength = buffer.readUInt16BE(2);
		offset += 2;
	} else if (payloadLength === 127) {
		payloadLength = buffer.readBigUInt64BE(2);
		offset += 8;
	}

	let maskingKey;
	if (isMasked) {
		maskingKey = buffer.slice(offset, offset + 4);
		offset += 4;
	}

	const payload = buffer.slice(offset, offset + payloadLength);

	if (isMasked) {
		for (let i = 0; i < payload.length; i++) {
			payload[i] ^= maskingKey[i % 4]; // Unmask payload
		}
	}

	return payload.toString("utf8");
}
