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

### State Management Pattern

The application uses a **Jotai-based state management pattern** for route parameters:

- **Atoms**: Each route level defines its own atoms (e.g., `atomIp`, `atomPresentationId`, `atomSlide`)
- **`useSetAtomsFromPage` hook**: Automatically syncs route parameters and search params to Jotai atoms
- **Usage**: Components read from atoms instead of directly accessing route parameters

**Example:**
```typescript
// Define atoms (e.g., in src/app/app-$ip/core/atoms.ts)
export const atomIp = atom<string>();

// In route component
useSetAtomsFromPage(atoms, Route.useParams(), Route.useSearch());

// In child components
const ip = useAtomValue(atomIp); // Instead of useParams()
```

This pattern provides:
- Better separation of concerns
- Easier testing (can mock atoms instead of route context)
- Consistent state access across the application
- Automatic synchronization between route changes and state

### App structure

For routing [TanStack Router with Vite](https://tanstack.com/router/latest/docs/framework/react/installation/with-vite)
is used. All `app-*` content is processed by TanStack Router, anything else can be used to colocate logic in route
folders/files.

#### Colocation convention
Each route/component folder contains:

- (`app-index.tsx`) `index.tsx` - (route) component (required)
- `index.css.ts` - (route) component styles
- `components/` - shared components
- `core/` - shared utility functions, hooks and state management utilities
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

…for component/core also colocate test:
```
…/
	components/
		Component.tsx
		Component.test.tsx
	core/
		hook.ts
		hook.test.ts
		util.ts
		util.test.ts
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
Each `assets` folder contains static assets and auto-generated `index.ts` file (see
[`bs/dev/assets.js`](../bs/README.md#assets) for details).[^1]

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

[^1]: This happend to be side effect when working on playwright tests and happend to not needed for them.
