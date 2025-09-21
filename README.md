# Get information about Node.js versions

[![NPM Version](https://img.shields.io/npm/v/@pkgjs/nv.svg)](https://npmjs.org/package/@pkgjs/nv)
[![NPM Downloads](https://img.shields.io/npm/dm/@pkgjs/nv.svg)](https://npmjs.org/package/@pkgjs/nv)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/standard/standard)
[![CI Test](https://github.com/pkgjs/nv/workflows/Test/badge.svg)](https://github.com/pkgjs/nv/actions)

This repository is managed by the [Package Maintenance Working Group](https://github.com/nodejs/package-maintenance), see [Governance](https://github.com/nodejs/package-maintenance/blob/master/Governance.md).

## Usage

```
$ npm i @pkgjs/nv
```

```
$ npx @pkgjs/nv --help

nv <command>

Commands:
  nv ls [versions...]  List Node.js versions                     [aliases: show]

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]

```

```
$ npx @pkgjs/nv ls --help

nv ls [versions...]

List Node.js versions

Options:
  --help                  Show help                                    [boolean]
  --version               Show version number                          [boolean]
  --mirror                mirror url to load from
                                    [string] [default: https://nodejs.org/dist/]
  --pretty-json           Pretty print json
    [string] [default: pretty print json spaces, default 2 (--no-pretty-json for
                                                        new line delimted json)]
  --latest-of-major-only  Only show latest version in each semver major range
                                                      [boolean] [default: false]
  --versions                                             [default: "lts_active"]
```

```javascript
const nv = require('@pkgjs/nv')

(async () => {
  const versions = await nv('lts')
  console.log(versions)
  /*
[
  {
    "version": "18.18.2",
    "major": 18,
    "minor": 18,
    "patch": 2,
    "tag": "",
    "codename": "hydrogen",
    "versionName": "v18",
    "start": "2022-04-19T00:00:00.000Z",
    "lts": "2022-10-25T00:00:00.000Z",
    "maintenance": "2023-10-18T00:00:00.000Z",
    "end": "2025-04-30T00:00:00.000Z",
    "releaseDate": "2023-10-13T00:00:00.000Z",
    "isLts": true,
    "files": [
      "aix-ppc64",
      "headers",
      "linux-arm64",
      "linux-armv7l",
      "linux-ppc64le",
      "linux-s390x",
      "linux-x64",
      "osx-arm64-tar",
      "osx-x64-pkg",
      "osx-x64-tar",
      "src",
      "win-x64-7z",
      "win-x64-exe",
      "win-x64-msi",
      "win-x64-zip",
      "win-x86-7z",
      "win-x86-exe",
      "win-x86-msi",
      "win-x86-zip"
    ],
    "dependencies": {
      "npm": "9.8.1",
      "v8": "10.2.154.26",
      "uv": "1.44.2",
      "zlib": "1.2.13.1-motley",
      "openssl": "3.0.10+quic"
    }
  }
]
  */
})()
```

You can also pass an array of aliases and the resulting array will be sorted and de-duped, for example:

```javascript
const versions = await nv(['lts', 'supported'])
console.log(versions.map((v) => v.version))
/*
[ '8.16.1', '10.16.3', '12.11.0' ]
*/
```

## Command line interface (CLI)

Options:
 - `--only-version`: instead of the entire output, only print one version number per line
 - `--engines`: only print versions that match the current directory's `engines.node` field
   - `--engines=lts`: only print LTS versions that also match the current directory's `engines.node` field

```sh
$ nv ls lts
{
  "version": "18.20.4",
  "major": 18,
  "minor": 20,
  "patch": 4,
  "tag": "",
  "codename": "hydrogen",
  "versionName": "v18",
  "start": "2022-04-19T00:00:00.000Z",
  "lts": "2022-10-25T00:00:00.000Z",
  "maintenance": "2023-10-18T00:00:00.000Z",
  "end": "2025-04-30T00:00:00.000Z",
  "releaseDate": "2024-07-08T00:00:00.000Z",
  "isLts": true,
  "files": [
    "aix-ppc64",
    "headers",
    "linux-arm64",
    "linux-armv7l",
    "linux-ppc64le",
    "linux-s390x",
    "linux-x64",
    "osx-arm64-tar",
    "osx-x64-pkg",
    "osx-x64-tar",
    "src",
    "win-x64-7z",
    "win-x64-exe",
    "win-x64-msi",
    "win-x64-zip",
    "win-x86-7z",
    "win-x86-exe",
    "win-x86-msi",
    "win-x86-zip"
  ],
  "dependencies": {
    "npm": "10.7.0",
    "v8": "10.2.154.26",
    "uv": "1.44.2",
    "zlib": "1.3.0.1-motley",
    "openssl": "3.0.13+quic"
  }
}
{
  "version": "20.15.1",
  "major": 20,
  "minor": 15,
  "patch": 1,
  "tag": "",
  "codename": "iron",
  "versionName": "v20",
  "start": "2023-04-18T00:00:00.000Z",
  "lts": "2023-10-24T00:00:00.000Z",
  "maintenance": "2024-10-22T00:00:00.000Z",
  "end": "2026-04-30T00:00:00.000Z",
  "releaseDate": "2024-07-08T00:00:00.000Z",
  "isLts": true,
  "files": [
    "aix-ppc64",
    "headers",
    "linux-arm64",
    "linux-armv7l",
    "linux-ppc64le",
    "linux-s390x",
    "linux-x64",
    "osx-arm64-tar",
    "osx-x64-pkg",
    "osx-x64-tar",
    "src",
    "win-arm64-7z",
    "win-arm64-zip",
    "win-x64-7z",
    "win-x64-exe",
    "win-x64-msi",
    "win-x64-zip",
    "win-x86-7z",
    "win-x86-exe",
    "win-x86-msi",
    "win-x86-zip"
  ],
  "dependencies": {
    "npm": "10.7.0",
    "v8": "11.3.244.8",
    "uv": "1.46.0",
    "zlib": "1.3.0.1-motley",
    "openssl": "3.0.13+quic"
  }
}

$ nv ls lts --only-version
18.20.4
20.15.1
```

## Supported Aliases

**Support Aliases**

For now referenced here until we have a more official doc: https://github.com/nodejs/package-maintenance/issues/236#issue-474783582

- `all`: All node versions
- `lts_active`: Head of LTS and Active major version lines
- `lts`: Head of current LTS lines
- `active`: The newest version in the active but not maintenance mode lines
- `lts_latest`/`lts/*`: Latest of the LTS lines (`lts/*` for nvm compatibility)
- `supported`: Head of all maintained lines
- *DEPRECATED* `maintained`: Head of all maintained lines
- `current`/`node`: Newest of all maintained lines (`node` for nvm compatibility)

**Version Aliases**

- `v6`, `v8`, `v10`, `v12`, etc: Head of major version line by version number
- `dubnium`, `carbon`: Named alias for LTS lines
