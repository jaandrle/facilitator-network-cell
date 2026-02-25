### Frontend pages (URL endpoints)

For routing [TanStack Router with Vite](https://tanstack.com/router/latest/docs/framework/react/installation/with-vite)
is used. All `app-*` content is processed by TanStack Router, anything else can be used to colocate logic in route
folders/files.

#### Colocation convention
Each route folder can contain:

- `app-index.tsx` - page component
- `index.css.ts` - route-specific styles
- `components/` - route-specific components
- `core/` - route-specific hooks/functions

Each component is represented by:

- a file with the same name (`*.tsx`) and ui file (`*.css.ts`).
- or by folder for larger components, this folder should contain `*.tsx` and `*.css.ts` as above **and `index.tsx`** to
  export publicly accessible component(s)

Each core logic should be strcustured as component (but withou UI part of course).

### `./src/app/`

- `./app-__root.tsx`: root layout, see TanStack Router docs
- Existing routes
	- [`app-$ip/`](./app-$ip/README.md): app connected to router
