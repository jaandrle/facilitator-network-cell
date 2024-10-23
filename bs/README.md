# bs: Build system based on executables
This project uses [jaandrle/bs: The simplest possible build system using executable/bash scripts](https://github.com/jaandrle/bs).

## Available executables

### bs/localhost
Creates a localhost development web server. *Internally runs `npx vite`*,
you can use additional arguments (see `vite --help`).

### bs/run
Builds a web app and runs it on device/emulator (only android).
*Internally runs `npx vite build && npx cap run android`*, you
can use additional arguments (see `npx cap run --help`).

### bs/build TBD!!!
Creates the android package.
*Internally runs `npx vite build && npx cap build android`*, **you
must use additional arguments (see `npx cap build --help`).**
