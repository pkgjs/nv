'use strict'
const assert = require('assert')
const { suite, test } = require('mocha')
const { execFileSync } = require('child_process')
const path = require('path')

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
      assert(r.version.startsWith('8.'))
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
})
