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
- [Package networkcell-circles](https://github.com/IndigoMultimediaTeam/HTMLNetworkCellCirclesElement/pkgs/npm/networkcell-circles)
  for drawing network cell circles background
- [@beqa/react-slots - npm](https://www.npmjs.com/package/@beqa/react-slots) and [@beqa/unplugin-transform-react-slots - npm](https://www.npmjs.com/package/@beqa/unplugin-transform-react-slots) for slots
- [jotai - npm](https://www.npmjs.com/package/jotai) for (shared) state management
- [@tanstack/react-query](https://tanstack.com/query/latest) for data fetching and state management
- [vite-plugin-svg-sprite - npm](https://www.npmjs.com/package/vite-plugin-svg-sprite) for SVG sprite, see Assets
  section below

### App structure

For routing [TanStack Router with Vite](https://tanstack.com/router/latest/docs/framework/react/installation/with-vite)
is used. All `app-*` content is processed by TanStack Router, anything else can be used to colocate logic in route
folders/files.

#### Colocation convention
Each route/component folder contains:

- (`app-index.tsx`) `index.tsx` - (route) component (required)
- `index.css.ts` - (route) component styles
- `components/` - shared components
- `core/` - shared hooks/functions
- `types/` - shared types
- `ui/` - shared ui
- `assets/` - shared static assets
- `app-….tsx` or `app-…/` - subroutes

…app routes are hierarchical and components/… should be located on the same or higher level.

```
app-parent/
	components/
		Component.tsx
	app-index.tsx # must use Component
	app-child/
		components/
			ComponentChild.tsx
		app-index.tsx # must use ComponentChild and can use Component
```

#### `src` specifics
all folders mentioned above contains global styles/components/… and:

- [`./api`](./api/README.md): app (data) workflow - WebSocket communication with TV devices
- **[`./app`](./app/README.md): This folder contains pages/endpoints**
- [`./manifest.json`](./manifest.json): App manifest (partially generated using **bs**)
- [`./translations`](./translations): Translations JSON files (see https://www.i18next.com/misc/json-format)
- [`./ui`](./ui): core ui and theme configuration
- `./index.tsx`, `./index.html`, `./routeTree.gen.ts`: app setup

…you can use `@/` alias.

### Assets
Similarly to components `assets` folder should contain `index.ts` with exported components/….

It is probably nice to use:
```ts
import Icon from './Icon.png';
export const IconId = Icon as Type;
```
…as it helps editor/ide to jump to the file when using ‘find definition’ feature.

#### Default import behavior
- **for SVG**
	- the [vite-plugin-svg-sprite](https://www.npmjs.com/package/vite-plugin-svg-sprite) is used
	- *import adds image to sprite and returns its id*
	- please also see [Accessible SVGs](https://www.unimelb.edu.au/accessibility/techniques/accessible-svgs)
- **for others**
	- default [Vite behavior](https://vite.dev/guide/assets) is used
	- creates blob URL, so called **inline** image

#### Other options
For using for example in CSS (e. g. `\`url(${…})\``) it can be useful to suppress default import behavior
and use `?no-inline` search param.

- see [Vite behavior](https://vite.dev/guide/assets)
- this uses real image on builded site and returns its URL
