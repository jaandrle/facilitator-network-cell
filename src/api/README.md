# API Layer - WebSocket Communication with TanStack Query

This folder contains the application's API layer for communicating with the Network Cell Manager TV devices via WebSocket, using TanStack Query for data fetching and state management.

## Architecture

The API layer uses a combination of:
- **TanStack Query** for data fetching, caching, and state management
- **jotai** for managing the shared WebSocket connection state
- **socket.io** for WebSocket communication

## Core Components

### 1. WebSocket Connection Management

- **`sharedIp` atom** - Manages the current server IP address
  - Updated via the `useSetAtomsFromPage` hook from route parameters
  - Shared across the application using jotai

- **`sharedSocket` atom** - Computed atom that creates and manages the WebSocket connection
  - Automatically connects when IP address is set
  - Disconnects when the atom is aborted (e.g., route changes)
  - Uses `socket.io-client` with credentials

### 2. Data Fetching with `useQuery`

```typescript
useQuery<T extends keyof Endpoints>(name: T, data: Endpoints[T]["request"])
```

- Fetches data from WebSocket endpoints
- Automatically manages loading, success, and error states
- Caches responses with a stale time of 1.5 hours
- Disabled when no socket connection exists
- Throws `RequestError` when not connected or aborted

**Example:**
```typescript
const { data, isLoading, error } = useQuery('getPresentation', { id: '123' });
```

### 3. Mutations with `useMutation`

```typescript
useMutation<T extends keyof Endpoints>(
  name: T,
  options?: UseMutationOptions<Endpoints[T]["response"], Error, Endpoints[T]["request"]>
)
```

- Performs mutations via WebSocket
- Supports TanStack Query mutation options
- Automatically handles connection state
- Throws `RequestError` when not connected

**Example:**
```typescript
const { mutate, isPending } = useMutation('updateSlide', {
  onSuccess: (data) => { /* handle success */ }
});
```

### 4. Error Handling

- **`RequestError` class** - Custom error class for API errors
  - `RequestError.notConnected` - Thrown when no socket connection exists
  - `RequestError.aborted` - Thrown when request is aborted

- Errors are automatically handled by TanStack Query
- Can be caught in `onError` callbacks or checked via `error` property

## Configuration

- **Stale Time**: 1.5 hours (90 minutes)
  - Data is considered fresh for 1.5 hours after fetching
  - After this period, data is refetched on next use

- **Connection State**: Managed via TanStack Query's `enabled` option
  - Queries are disabled when no socket connection exists
  - Automatically re-enabled when connection is established

## Endpoint Definitions

**Endpoint definitions are located in `types/endpoints.ts`.**

Each endpoint defines:
- `request` - The data structure sent to the server
- `response` - The expected response structure from the server

## Development

For local development and testing, use the mock WebSocket server:
- See `bs/dev/ws.js` script ([`bs/README.md`](../../bs/README.md)) for mock server setup
- Mocked responses available in `bs/dev/.ws-responses/`

## Related

- Parent: [`../README.md`](../README.md) - Web app overview
