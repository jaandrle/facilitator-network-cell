## 📱 Web app (part)
Basic React app with TypeScript.

### Tech stack
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TanStack Router](https://tanstack.com/router/) with Vite
- [React useWebSocket](https://www.npmjs.com/package/react-use-websocket)
- [Styled Components](https://styled-components.com/)
- [i18next](https://www.i18next.com/) and [react-i18next](https://react.i18next.com/)

### App structure
- [`./src/api`](./api/README.md): app (data) workflow - WebSocket communication with TV devices
- **[`./src/app`](./app/README.md): This folder contains pages/endpoints**
- [`./src/assets`](./assets): Public static assets
- [`./src/manifest.json`](./manifest.json): App manifest (partially generated using **bs**)
- [`./src/components`](./components): Shared/reusable components
- [`./src/translations`](./translations): Translations JSON files (see https://www.i18next.com/misc/json-format)
- [`./src/core`](./core): Shared utility functions (e.g. hooks)
- [`./src/types`](./types): global types
- [`./src/ui`](./ui): core ui and theme configuration

