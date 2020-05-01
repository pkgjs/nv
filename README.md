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
    version: '10.16.3',
    major: 10,
    minor: 16,
    patch: 3,
    codename: 'dubnium',
    versionName: 'v10',
    start: 2018-04-24T00:00:00.000Z,
    lts: 2018-10-30T00:00:00.000Z,
    maintenance: 2020-04-01T00:00:00.000Z,
    end: 2021-04-01T00:00:00.000Z
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
- `active`: The newest version in the active but not maintenence mode lines
- `lts_latest`/`lts/*`: Latest of the LTS lines (`lts/*` for nvm compat)
- `supported`: Head of all maintained lines
- *DEPRECATED* `maintained`: Head of all maintained lines
- `current`/`node`: Newest of all maintained lines (`node` for nvm compat)

**Version Aliases**

- `v6`, `v8`, `v10`, `v12`, etc: Head of major version line by version number
- `dubnium`, `carbon`: Named alias for LTS lines
