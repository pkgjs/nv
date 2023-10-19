'use strict'
const { suite, test } = require('mocha')
const assert = require('assert')
const nv = require('..')

// 2019-02-07T16:15:49.683Z
const now = new Date(1569556149683)

suite('nv', () => {
  test('lts_active', async () => {
    const versions = await nv('lts_active', { now })
    assert.strictEqual(versions.length, 1)
    assert.strictEqual(typeof versions[0].version, 'string')
    assert.strictEqual(versions[0].major, 10)
    assert.strictEqual(typeof versions[0].minor, 'number')
    assert.strictEqual(typeof versions[0].patch, 'number')
    assert.strictEqual(versions[0].codename, 'dubnium')
    assert.strictEqual(versions[0].versionName, 'v10')
    assert.strictEqual(versions[0].releaseDate.toISOString(), '2021-04-06T00:00:00.000Z')
    assert.strictEqual(versions[0].start.toISOString(), '2018-04-24T00:00:00.000Z')
    assert.strictEqual(versions[0].lts.toISOString(), '2018-10-30T00:00:00.000Z')
    assert.strictEqual(versions[0].maintenance.toISOString(), '2020-05-19T00:00:00.000Z')
    assert.strictEqual(versions[0].end.toISOString(), '2021-04-30T00:00:00.000Z')
    assert.strictEqual(versions[0].isLts, true)
    assert.deepStrictEqual(versions[0].files, [
      'aix-ppc64',
      'headers',
      'linux-arm64',
      'linux-armv6l',
      'linux-armv7l',
      'linux-ppc64le',
      'linux-s390x',
      'linux-x64',
      'osx-x64-pkg',
      'osx-x64-tar',
      'src',
      'sunos-x64',
      'win-x64-7z',
      'win-x64-exe',
      'win-x64-msi',
      'win-x64-zip',
      'win-x86-7z',
      'win-x86-exe',
      'win-x86-msi',
      'win-x86-zip'
    ])
    assert.deepStrictEqual(versions[0].dependencies, {
      npm: '6.14.12',
      openssl: '1.1.1k',
      uv: '1.34.2',
      v8: '6.8.275.32',
      zlib: '1.2.11'
    })
  })

  test('lts', async () => {
    const versions = await nv('lts', { now })
    assert.strictEqual(versions.length, 2)
    assert.strictEqual(versions[0].major, 8)
    assert.strictEqual(versions[0].codename, 'carbon')
    assert.strictEqual(versions[0].versionName, 'v8')
    assert.strictEqual(versions[0].isLts, true)
    assert.strictEqual(versions[1].major, 10)
    assert.strictEqual(versions[1].codename, 'dubnium')
    assert.strictEqual(versions[1].versionName, 'v10')
    assert.strictEqual(versions[1].isLts, true)
  })

  test('active', async () => {
    const versions = await nv('active', { now })
    assert.strictEqual(versions.length, 2)
    assert.strictEqual(versions[0].major, 10)
    assert.strictEqual(versions[0].codename, 'dubnium')
    assert.strictEqual(versions[0].versionName, 'v10')
    assert.strictEqual(versions[1].major, 12)
    assert.strictEqual(versions[1].codename, 'erbium')
    assert.strictEqual(versions[1].versionName, 'v12')
  })

  test('lts_latest', async () => {
    const versions = await nv('lts_latest', { now })
    assert.strictEqual(versions.length, 1)
    assert.strictEqual(versions[0].major, 10)
    assert.strictEqual(versions[0].codename, 'dubnium')
    assert.strictEqual(versions[0].versionName, 'v10')

    const ltsStar = await nv('lts/*', { now })
    assert.strictEqual(ltsStar.length, 1)
    assert.strictEqual(ltsStar[0].major, 10)
    assert.strictEqual(ltsStar[0].codename, 'dubnium')
    assert.strictEqual(ltsStar[0].versionName, 'v10')
  })

  test('current', async () => {
    const versions = await nv('current', { now })
    assert.strictEqual(versions.length, 1)
    assert.strictEqual(versions[0].major, 12)
    assert.strictEqual(versions[0].codename, 'erbium')
    assert.strictEqual(versions[0].versionName, 'v12')

    const node = await nv('node', { now })
    assert.strictEqual(node.length, 1)
    assert.strictEqual(node[0].major, 12)
    assert.strictEqual(node[0].codename, 'erbium')
    assert.strictEqual(node[0].versionName, 'v12')
  })

  test('supported', async () => {
    const versions = await nv('supported', { now })
    assert.strictEqual(versions.length, 3)
    assert.strictEqual(versions[0].major, 8)
    assert.strictEqual(versions[0].codename, 'carbon')
    assert.strictEqual(versions[0].versionName, 'v8')
    assert.strictEqual(versions[1].major, 10)
    assert.strictEqual(versions[1].codename, 'dubnium')
    assert.strictEqual(versions[1].versionName, 'v10')
    assert.strictEqual(versions[2].major, 12)
    assert.strictEqual(versions[2].codename, 'erbium')
    assert.strictEqual(versions[2].versionName, 'v12')
  })

  test('v12', async () => {
    const versions = await nv('v12', { now })
    assert.strictEqual(versions.length, 1)
    assert.strictEqual(versions[0].major, 12)
    assert.strictEqual(versions[0].codename, 'erbium')
    assert.strictEqual(versions[0].versionName, 'v12')
  })

  test('v12.14.0', async () => {
    const versions = await nv('v12.14.0', { now })
    assert.strictEqual(versions.length, 1)
    assert.strictEqual(versions[0].major, 12)
    assert.strictEqual(versions[0].codename, 'erbium')
    assert.strictEqual(versions[0].versionName, 'v12')
  })

  test('dubnium', async () => {
    const versions = await nv('dubnium', { now })
    assert.strictEqual(versions.length, 1)
    assert.strictEqual(versions[0].major, 10)
    assert.strictEqual(versions[0].codename, 'dubnium')
    assert.strictEqual(versions[0].versionName, 'v10')
  })

  test('multiple: lts_latest, supported', async () => {
    const versions = await nv(['lts_latest', 'supported'], { now })
    assert.deepStrictEqual(versions.map((v) => v.major), [8, 10, 12])
  })

  test('10.x || >=12.0.0 ', async () => {
    const versions = await nv('10.0.0 || ~12.0.0', { now })
    assert.strictEqual(versions.length, 2)
    assert.strictEqual(versions[0].major, 10)
    assert.strictEqual(versions[1].major, 12)
  })

  test('mirror: v8-canary', async () => {
    const mirror = 'https://nodejs.org/download/v8-canary/'
    const versions = await nv('v13', { now, mirror })
    assert.strictEqual(versions.length, 1)
    assert.strictEqual(versions[0].major, 13)
    assert.strictEqual(versions[0].minor, 0)
    assert.strictEqual(versions[0].patch, 0)
    assert.strictEqual(versions[0].tag, 'v8-canary20191022e5d3472f57')
    assert.strictEqual(versions[0].versionName, 'v13')
  })

  test('latestOfMajorOnly', async () => {
    const versions = await nv('18.x', { now, latestOfMajorOnly: true })
    assert.strictEqual(versions.length, 1)
    assert.strictEqual(versions[0].major, 18)
  })

  test('isLts: false', async () => {
    const versions = await nv('0.8.0', { now })
    assert.strictEqual(versions[0].major, 0)
    assert.strictEqual(versions[0].isLts, false)
  })
})
