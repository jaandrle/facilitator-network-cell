### Frontent pages (URL endpoints)
The folder structure of `./src/app` containing folders representing each page component. The page component folder
structure looks like:

For routing the [TanStack Router with Vite](https://tanstack.com/router/latest/docs/framework/react/installation/with-vite) is used.  Configured in the way
that all `app-*` content is processed by TanStack Router anything else can be used to colocate logic in route
folders/files.  **In the raw (default) configuration it is set in opposite way (default processed, starting `-` for
colocating).** 

```
./src/app/app-[page]
	|- app-index.tsx … page component
	|- components … (optional) pages related components
	|- core … (optional) pages related functions, hooks, …
```
Cross-pages related components and utilities can be found in the `src` folder.
