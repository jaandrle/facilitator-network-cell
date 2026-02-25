# API Layer - WebSocket Communication

This folder contains the application's API layer for communicating with the Network Cell Manager TV devices via WebSocket.

## WebSocket Connection Management
- `useAPI(ipAddress)` - Main hook for connection state and message handling
- Automatic reconnection and state management
- Connection states: `connecting`, `connected`, `disconnected`
- **Endpoint definitions are located in `types/endpoints.ts`.**

## IP Address Discovery
- `useFindSocketIp()` - Automatically detects TV devices on local network
- Optimized for consumer Wi-Fi networks (prioritizes typical DHCP ranges)
- Concurrent WebSocket pinging with probabilistic scanning

## Development
For local development and testing, use the mock WebSocket server:
- See `bs/dev/ws.js` script ([`bs/README.md`](../../bs/README.md)) for mock server setup
- Mocked responses available in `bs/dev/.ws-responses/`

## Related
- Parent: [`../README.md`](../README.md) - Web app overview
