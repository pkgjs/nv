import nv from '.'

(async () => {
  await nv()
  await nv('lts_active')
  await nv(['lts_active', 'supported'])
  await nv(['lts_active'], {
    now: new Date(),
    cache: new Map(),
    mirror: 'http://example.com'
  })
})()
