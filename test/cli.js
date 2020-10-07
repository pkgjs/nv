'use strict'

const assert = require('assert')
const { suite, test } = require('mocha')
const childProcess = require('child_process')
const path = require('path')

const nv = path.join(__dirname, '..', 'bin', 'nv')
const cwd = path.join(__dirname, '..')

suite('nv cli', () => {
  test('should contain help information', () => {
    const result = childProcess.execSync(`${nv} --help`, { cwd: cwd }).toString()
    assert.ok(result.includes('List Node.js versions'))
  })

  test('should contain information about version 8', () => {
    const result = childProcess.execSync(`${nv} ls 8`, { cwd: cwd }).toString()
    assert.ok(result.includes('carbon'))
  })
})
