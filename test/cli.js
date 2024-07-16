'use strict'
const assert = require('assert')
const { suite, test } = require('mocha')
const { execFileSync } = require('child_process')
const path = require('path')
const semver = require('semver')

const nv = path.join(__dirname, '..', 'bin', 'nv')
const cwd = path.join(__dirname, '..')

suite('nv cli', () => {
  test('should contain help information', () => {
    const result = execFileSync(nv, ['--help'], { cwd }).toString()
    assert.ok(result.includes('List Node.js versions'))
  })

  test('should contain information about version 8', () => {
    const result = JSON.parse(execFileSync(nv, ['ls', '8'], { cwd }).toString())
    assert.strictEqual(result.codename, 'carbon')
  })

  test('should contain output newline json', () => {
    const result = execFileSync(nv, ['ls', '8.x', '--no-pretty-json'], { cwd })
      .toString().trim().split('\n')
      .map((line) => JSON.parse(line))

    assert(Array.isArray(result))
    result.forEach((r) => {
      assert(semver.satisfies(r.version, '8.x'))
    })
  })

  test('only outputs the version number', () => {
    const result = execFileSync(nv, ['ls', '8.x', '--only-version'], { cwd: cwd })
      .toString().trim().split('\n')

    assert(Array.isArray(result))
    result.forEach((r) => {
      assert(semver.satisfies(r, '8.x'))
      assert(semver.valid(r))
    })
  })

  test('should only contain the latest of each major', () => {
    const result = execFileSync(nv, ['ls', '16.x || 18.x', '--no-pretty-json', '--latest-of-major-only'], { cwd })
      .toString().trim().split('\n')
      .map((line) => JSON.parse(line))

    assert(Array.isArray(result))
    assert.strictEqual(result.length, 2)
    assert(result[0].version.startsWith('16.'))
    assert(result[1].version.startsWith('18.'))
  })

  test('works with `--engines`', () => {
    const result = execFileSync(nv, ['ls', '8.x', '--only-version', '--engines=">=8"'], { cwd: path.join(__dirname, 'fixtures', 'engines') })
      .toString().trim().split('\n')

    assert.deepEqual(result, [
      '8.10.0',
      '8.11.0',
      '8.11.1',
      '8.11.2',
      '8.11.3',
      '8.11.4',
      '8.12.0',
      '8.13.0',
      '8.14.0',
      '8.14.1',
      '8.15.0',
      '8.15.1',
      '8.16.0',
      '8.16.1',
      '8.16.2',
      '8.17.0'
    ])

    const result2 = execFileSync(nv, ['ls', '8.x', '--only-version', '--engines=">=8.15"'], { cwd: path.join(__dirname, 'fixtures', 'engines') })
      .toString().trim().split('\n')

    assert.deepEqual(result2, [
      '8.15.0',
      '8.15.1',
      '8.16.0',
      '8.16.1',
      '8.16.2',
      '8.17.0'
    ])

    const result3 = execFileSync(nv, ['ls', '8.x', '--only-version', '--engines'], { cwd: path.join(__dirname, 'fixtures', 'engines') })
      .toString().trim().split('\n')

    assert.deepEqual(result3, [
      '8.10.0',
      '8.11.0',
      '8.11.1',
      '8.11.2',
      '8.11.3',
      '8.11.4',
      '8.12.0',
      '8.13.0',
      '8.14.0',
      '8.14.1',
      '8.15.0',
      '8.15.1',
      '8.16.0',
      '8.16.1',
      '8.16.2',
      '8.17.0'
    ])
  })
})
