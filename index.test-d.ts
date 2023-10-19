import nv from '.'
import assert from 'node:assert'

(async () => {
  const versions = await nv()
  assert(versions[0].version)
  assert(versions[0].major)
  assert(versions[0].minor)
  assert(versions[0].patch)
  assert(versions[0].tag)
  assert(versions[0].codename)
  assert(versions[0].versionName)
  assert(versions[0].start)
  assert(versions[0].lts)
  assert(versions[0].maintenance)
  assert(versions[0].end)
  assert(versions[0].releaseDate)
  assert(versions[0].isLts)
  assert(versions[0].files)
  assert(versions[0].dependencies)
  assert(versions[0].dependencies.npm)
  assert(versions[0].dependencies.v8)
  assert(versions[0].dependencies.uv)
  assert(versions[0].dependencies.zlib)
  assert(versions[0].dependencies.openssl)
  await nv('lts_active')
  await nv(['lts_active', 'supported'])
  await nv(['lts_active'], {
    now: new Date(),
    cache: new Map(),
    mirror: 'http://example.com',
    latestOfMajorOnly: true
  })
})()
