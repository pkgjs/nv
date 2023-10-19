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
