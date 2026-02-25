# Facilitator Network Cell

Facilitator Android app for [Network Cell Manager](https://github.com/IndigoMultimediaTeam/android-tv-network-cell).

Application created by [INDIGO Multimedia s.r.o.](https://indigo.cz).

Contact:

- [Jan Andrle](mailto:jan.andrle@indigo.cz), Main Developer
- [Martin Antos](mailto:martin.antos@indigo.cz), Developer
- [Pavel Fiala](mailto:pavel.fiala@indigo.cz), Indigo Head

## 👋 Quick start

1. `git clone git@github.com:IndigoMultimediaTeam/facilitator-network-cell.git`
1. `cd facilitator-network-cell`
1. Login to Github packages:
	1. Personal access token with `read:packages` scope. (can be created on Github > Settings > Developer settings > Personal access tokens)
	1. `npm login --registry=https://npm.pkg.github.com/ --scope=@indigomultimediateam` (use the token)
1. `npm ci`
1. [Project overview](./#-project-overview)

## 🔍 Project overview
Capacitor-based Android app with React web frontend. Project uses:

1. Git and Github Actions (CI)
	- the `main` branch is protected
	- use PR requests, code is linted (formatted)…
	- relevant files: [`.github/workflows/pr.yml`](./.github/workflows/pr.yml)
1. NPM
	- relevant files: [`package.json`](./package.json), see `config` key (refered as **C**)
1. **Build system: [bs/](./bs/README.md) (refered as *bs*)**
	- internally uses [Vite](https://vite.dev/guide/) (relevant files: [`vite.config.ts`](./vite.config.ts))
	- and ↓
1. [Capacitor by Ionic - Cross-platform apps with web technology](https://capacitorjs.com/)
	- [Capacitor Documentation](https://capacitorjs.com/docs)
	- relevant files: [`capacitor.config.json`](./capacitor.config.json) (partially generated using **C**, see **bs**),
	[`android`](./android)
	- this app was created using [`@capacitor/create-app`](https://github.com/ionic-team/create-capacitor-app)
1. **[Web app (part)](./src/README.md)**
	- app code logic

## Resources
- [IndigoMultimediaTeam/CIS-Foundation-Facilitator: Android Cordova App for Facilitators in CIS Foundation Project](
https://github.com/IndigoMultimediaTeam/CIS-Foundation-Facilitator)
- [IndigoMultimediaTeam/android-tv-network-cell: Network Cell Manager for Google TV](
https://github.com/IndigoMultimediaTeam/android-tv-network-cell)
- Discord: https://discord.com/channels/@me/855089988126244894/1298621989631819839

## Additional Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Vite Documentation](https://vite.dev/guide/)
- [TanStack Router](https://tanstack.com/router/latest)
- [Biome Documentation](https://biomejs.dev/)
- [Project GitHub](https://github.com/IndigoMultimediaTeam/facilitator-network-cell)
- [Network Cell Manager](https://github.com/IndigoMultimediaTeam/android-tv-network-cell)
