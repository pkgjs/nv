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
    assert.strictEqual(versions[0].start.toISOString(), '2018-04-24T00:00:00.000Z')
    assert.strictEqual(versions[0].lts.toISOString(), '2018-10-30T00:00:00.000Z')
    assert.strictEqual(versions[0].maintenance.toISOString(), '2020-05-19T00:00:00.000Z')
    assert.strictEqual(versions[0].end.toISOString(), '2021-04-30T00:00:00.000Z')
  })

  test('lts', async () => {
    const versions = await nv('lts', { now })
    assert.strictEqual(versions.length, 2)
    assert.strictEqual(versions[0].major, 8)
    assert.strictEqual(versions[0].codename, 'carbon')
    assert.strictEqual(versions[0].versionName, 'v8')
    assert.strictEqual(versions[1].major, 10)
    assert.strictEqual(versions[1].codename, 'dubnium')
    assert.strictEqual(versions[1].versionName, 'v10')
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
  })

  test('maintained', async () => {
    const versions = await nv('maintained', { now })
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

  test('multiple: lts_latest, maintained', async () => {
    const versions = await nv(['lts_latest', 'maintained'], { now })
    assert.deepStrictEqual(versions.map((v) => v.major), [8, 10, 12])
  })

  test('10.x || >=12.0.0 ', async () => {
    const versions = await nv('10.0.0 || ~12.0.0', { now })
    assert.strictEqual(versions.length, 2)
    assert.strictEqual(versions[0].major, 10)
    assert.strictEqual(versions[1].major, 12)
  })
})
