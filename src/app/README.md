### Frontent pages (URL endpoints)
The folder structure of `./src/app` containing folders representing
each page component. The page component folder structure looks like:

```
./src/app/[page]
	|- index.tsx … page component
	|- components … (optional) pages related components
	|- core … (optional) pages related functions, hooks, …
```
Cross-pages related components and utilities can be found in the `src` folder.

The file [`./src/app/routes-config.ts`](./routes-config.ts) contains associations
between the URL endpoint and the page component (folder name).

The fronted contains:

