# Facilitator Network Cell

Facilitator Android app for [Network Cell Manager](https://github.com/IndigoMultimediaTeam/android-tv-network-cell).

Application created by [INDIGO Multimedia s.r.o.](https://indigo.cz).

Contact:

- [Jan Andrle](mailto:jan.andrle@indigo.cz), Main Developer
- [Martin Antos](mailto:martin.antos@indigo.cz), Developer
- [Pavel Fiala](mailto:pavel.fiala@indigo.cz), Indigo Head


This app was created using [`@capacitor/create-app`](https://github.com/ionic-team/create-capacitor-app),
and comes with a very minimal shell for building an app.

## 👋 Quick start

1. `git clone git@github.com:IndigoMultimediaTeam/facilitator-network-cell.git`
1. `cd facilitator-network-cell`
1. `npm ci`
1. [Project overview](./#-project-overview)

## 🔍 Project overview
Project uses:

1. NPM
	- relevant files: [`package.json`](./package.json), see `config` key (refered as **C**)
1. Build system: [bs/README.md](./bs/README.md) (refered as **bs**)
	- internally uses [Vite](https://vite.dev/guide/) (relevant files: [`vite.config.ts`](./vite.config.ts))
	- and ↓
1. [Capacitor by Ionic - Cross-platform apps with web technology](https://capacitorjs.com/)
	- [Capacitor Documentation](https://capacitorjs.com/docs)
	- relevant files: [`capacitor.config.json`](./capacitor.config.json) (partially generated using **C**, see **bs**), [`android`](./android)
1. [Web app (part)](./src/README.md)

## Resources
- [IndigoMultimediaTeam/CIS-Foundation-Facilitator: Android Cordova App for Facilitators in CIS Foundation Project](https://github.com/IndigoMultimediaTeam/CIS-Foundation-Facilitator)
- [IndigoMultimediaTeam/android-tv-network-cell: Network Cell Manager for Google TV](https://github.com/IndigoMultimediaTeam/android-tv-network-cell)
- Discord: https://discord.com/channels/@me/855089988126244894/1298621989631819839
