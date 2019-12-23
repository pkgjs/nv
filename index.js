'use strict'
const got = require('got')
const semver = require('semver')
const _cache = new Map()

module.exports = async function (alias = 'lts_active', opts = {}) {
  const now = opts.now || new Date()
  const cache = opts.cache || _cache

  const a = Array.isArray(alias) ? alias : [alias]
  const versions = await getLatestVersionsByCodename(now, cache)

  // Reduce to an object
  const m = a.reduce((m, a) => {
    const vers = resolveAlias(versions, a)
    if (Array.isArray(vers)) {
      vers.forEach((v) => {
        m[v.version] = v
      })
    } else {
      m[vers.version] = vers
    }
    return m
  }, {})

  // Sort and pluck version
  return Object.values(m).sort((v1, v2) => {
    return semver.gt(v1.version, v2.version) ? 1 : -1
  })
}

function resolveAlias (versions, alias) {
  if (typeof alias === 'string' && versions[alias.toLowerCase()]) {
    return versions[alias.toLowerCase()]
  }
  if (typeof alias === 'number' && versions[`v${alias}`]) {
    return versions[`v${alias}`]
  }
}

function getSchedule (cache) {
  return got('https://raw.githubusercontent.com/nodejs/Release/master/schedule.json', {
    cache
  }).json()
}

function getVersions (cache) {
  return got('https://nodejs.org/dist/index.json', {
    cache
  }).json()
}

async function getLatestVersionsByCodename (now, cache) {
  const schedule = await getSchedule(cache)
  const versions = await getVersions(cache)

  // Composite aliases point to the HEAD for each release line
  const maintained = {}
  const active = {}
  const ltsActive = {}
  const lts = {}

  const aliases = versions.reduce((obj, ver) => {
    const { major, minor, patch } = splitVersion(ver.version)
    const versionName = major !== '0' ? `v${major}` : `v${major}.${minor}`
    const codename = ver.lts ? ver.lts.toLowerCase() : versionName
    const version = `${major}.${minor}.${patch}`
    const s = schedule[versionName]

    // Version Object
    const v = {
      version,
      major,
      minor,
      patch,
      codename,
      versionName,
      start: s && s.start && new Date(s.start),
      lts: s && s.lts && new Date(s.lts),
      maintenance: s && s.maintenance && new Date(s.maintenance),
      end: s && s.end && new Date(s.end)
    }

    // All versions get added to all
    obj.all.push(v)

    // The new version is higher than the last stored version for this release line
    if (!obj[versionName] || semver.gt(ver.version, obj[versionName].version)) {
      // Version and codename alias
      obj[versionName] = obj[codename] = v

      if (now > v.start && now < v.end) {
        maintained[versionName] = v

        if (now < v.maintenance) {
          active[versionName] = v
        }

        // Latest lts
        if (now > v.lts) {
          lts[versionName] = v

          if (now < v.maintenance) {
            ltsActive[versionName] = v
          }

          if (!obj.lts_latest || semver.gt(ver.version, obj.lts_latest.version)) {
            obj.lts_latest = v
          }
        }

        // The newest supported release
        if (!obj.current || semver.gt(ver.version, obj.current.version)) {
          obj.current = v
        }
      }
    }

    return obj
  }, {
    all: []
  })

  // Add composite aliases
  ;[
    ['maintained', maintained],
    ['active', active],
    ['lts_active', ltsActive],
    ['lts', lts]
  ].forEach(([alias, vers]) => {
    aliases[alias] = Object.values(vers)
  })

  // nvm --lts='lts/*'
  aliases['lts/*'] = aliases.lts_latest

  return aliases
}

function splitVersion (ver) {
  const [, major, minor, patch] = /^v([0-9]*)\.([0-9]*)\.([0-9]*)/.exec(ver).map((n) => parseInt(n, 10))
  return { major, minor, patch }
}
