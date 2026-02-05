## bs: Build system based on executables
This project uses [jaandrle/bs: The simplest possible build system using executable/bash scripts](
https://github.com/jaandrle/bs).

### Available executables
You can use `* --help` to get help for each executable.

#### bs/localhost.js
Creates a localhost development web server. *Internally runs `npx vite`*,
you can use additional arguments (see `vite --help`).

#### bs/run.js
Builds a web app and runs it on device/emulator (only android).
*Internally runs `bs/build/vite.js && npx cap run android`*, you
can use additional arguments (see `npx cap run --help`).

#### bs/build.js
Creates the android package. See `bs/build/capacitor.js` and `bs/build/vite.js`.

#### bs/build/vite.js
Prepares the vite configuration and builds the web (part of the) app.
*Internally runs `npx vite build`*.

#### bs/build/capacitor.js
Prepares the capacitor configuration and builds the android package.
*Internally runs `npx cap build android`*, **you
must use additional arguments (see `npx cap build --help`).**

#### bs/dev/lint.js
Linting files.

#### bs/dev/biome.js
[Getting Started | Biome](https://biomejs.dev/guides/getting-started/).

#### bs/dev/ws.js
This mocks a WebSocket server for local development.

#### bs/helpers/languages.js
The helper script to sumup all available languages. See `src/translations/index.ts`.

#### bs/i18next/migration.js
The helper script to migrate old translation files from
https://github.com/IndigoMultimediaTeam/CIS-Foundation-Facilitator

#### bs/hooks/npm-prepare.js
NPM life-cycle script (registers git hooks).

#### bs/hooks/git-post-merge
Git life-cycle script/hook to detects package.json changes and runs `npm install`
if necessary.
