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
1. **Login to Github packages (project uses private packages!)**:
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
1. [![git3moji](https://img.shields.io/badge/git3moji%E2%80%93v1-%E2%9A%A1%EF%B8%8F%F0%9F%90%9B%F0%9F%93%BA%F0%9F%91%AE%F0%9F%94%A4-fffad8.svg?style=flat-square)](https://robinpokorny.github.io/git3moji/)
	- **use for commit messages, issues and PRs titles**
	- TLDR:
		- `:zap:` ⚡️ – Features and primary concerns
		- `:bug:` 🐛 – Bugs and fixes
		- `:tv:`  📺 – CI, tooling, and configuration
		- `:cop:` 👮 – Tests and linting
		- `:abc:` 🔤 – Documentation
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
1. Uses PlayWright for unit and e2e tests
	- unit tests are collocated with app code
		- **testing components relying on TanStack Query/Router doesn’t work at the moment!**
	- e2e test are located in [tests/e2e](./tests/e2e)
	- configs, see [`playwright.unit.config.ts`](./playwright.unit.config.ts) and [`playwright.e2e.config.ts`](./playwright.e2e.config.ts)
	- resources: [Components (experimental) | Playwright](https://playwright.dev/docs/test-components), [How to Set Up Testing with Code-Based Routing | TanStack Router Docs](https://tanstack.com/router/latest/docs/how-to/setup-testing)
	- implementation plan, see [`changelog/plans/plan-testing.md`](./changelog/plans/plan-testing.md)

## Resources
- [IndigoMultimediaTeam/CIS-Foundation-Facilitator: Android Cordova App for Facilitators in CIS Foundation Project](
https://github.com/IndigoMultimediaTeam/CIS-Foundation-Facilitator)
- [IndigoMultimediaTeam/android-tv-network-cell: Network Cell Manager for Google TV](
https://github.com/IndigoMultimediaTeam/android-tv-network-cell)
- Discord: https://discord.com/channels/@me/855089988126244894/1298621989631819839
