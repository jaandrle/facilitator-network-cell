## bs: Build system based on executables
This project uses [jaandrle/bs: The simplest possible build system using executable/bash scripts](
https://github.com/jaandrle/bs).

### Available executables
You can use `* --help` to get help for each executable.

#### Development basics

##### bs/dev/lint.js
Runs Biome **linting** + TypeScript **type checking**.

**Options**:
- `--fix`: Apply automatic fixes
- `--verbose`: Show detailed output

##### bs/dev/biome.js
[Getting Started | Biome](https://biomejs.dev/guides/getting-started/).
**Format code**
```bash
bs/dev/biome.js Formatting
```

**Options**:
- Add `--fix` to apply fixes
- Add `--verbose` for detailed output

##### bs/test/unit.js
Runs unit tests (wrapper around `npx playwright test`). Arguments are passed to playwright (you can use `help` to print
playwright help).

##### bs/build/vite.js
Prepares the vite configuration and builds the web (part of the) app to `dist/` directory.
*Internally runs `npx vite build`*.

##### bs/dev/assets.js
Generates `index.ts` files for all `assets` folders in `src/` directory.
See [../src](../src/README.md#assets) for rules. Use `--all` flag to generate constants for all assets options in
case you want to use new options (code auto-remove unused options otherwise).

#### Development and publishing

##### bs/localhost.js
Creates a localhost development web server. *Internally runs `npx vite`*,
you can use additional arguments (see `vite --help`).

##### bs/run.js
Builds a web app and runs it on device/emulator (only android).
*Internally runs `bs/build/vite.js && npx cap run android`*, you
can use additional arguments (see `npx cap run --help`).

##### bs/test/e2e.js
Runs e2e tests (wrapper around `npx playwright test`). Arguments are passed to playwright (you can use `help` to print
playwright help).

##### bs/build.js
Creates the android package. See `bs/build/capacitor.js` and `bs/build/vite.js`.

##### bs/build/capacitor.js
Prepares the capacitor configuration and builds the android package.
*Internally runs `npx cap build android`*, **you
must use additional arguments (see `npx cap build --help`).**

#### Helpers

##### bs/helpers/languages.js
The helper script to sumup all available languages. See `src/translations/index.ts`.

##### bs/i18next/migration.js
The helper script to migrate old translation files from
https://github.com/IndigoMultimediaTeam/CIS-Foundation-Facilitator

#### Internal

##### bs/dev/ws.js
This mocks a WebSocket server for local development.

##### bs/hooks/npm-prepare.js
NPM life-cycle script (registers git hooks).

##### bs/hooks/git-post-merge
Git life-cycle script/hook to detects package.json changes and runs `npm install`
if necessary.
