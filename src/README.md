## 📱 Web app (part)
Basic React app with TypeScript.

### Tech stack
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TanStack Router](https://tanstack.com/router/) with Vite for routing
- [socket.io](https://www.npmjs.com/package/socket.io) for WebSocket
- [Styled Components](https://styled-components.com/) for styling
- [downshift](https://www.npmjs.com/package/downshift) for selects
- [i18next](https://www.i18next.com/) and [react-i18next](https://react.i18next.com/) for translations
- [Package
- networkcell-circles](https://github.com/IndigoMultimediaTeam/HTMLNetworkCellCirclesElement/pkgs/npm/networkcell-circles)
  for drawing network cell circles background
- [@beqa/react-slots - npm](https://www.npmjs.com/package/@beqa/react-slots) and [@beqa/unplugin-transform-react-slots - npm](https://www.npmjs.com/package/@beqa/unplugin-transform-react-slots) for slots
- [jotai - npm](https://www.npmjs.com/package/jotai) for (shared) state management

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

