module.exports = [
  {
    script: 'bin/server.js',
    exec_mode: 'cluster',
    instances: 2,
  },
  {
    script: 'ace.js',
    args: 'scheduler:run',
    name: 'scheduler',
  },
  {
    script: 'ace.js',
    args: 'queue:listen',
    name: 'scraper',
  },
]
