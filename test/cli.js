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
    const result = execFileSync(nv, ['--help'], { cwd: cwd }).toString()
    assert.ok(result.includes('List Node.js versions'))
  })

  test('should contain information about version 8', () => {
    const result = JSON.parse(execFileSync(nv, ['ls', '8'], { cwd: cwd }).toString())
    assert.strictEqual(result.codename, 'carbon')
  })

  test('should contain output newline json', () => {
    const result = execFileSync(nv, ['ls', '8.x', '--no-pretty-json'], { cwd: cwd })
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
})
