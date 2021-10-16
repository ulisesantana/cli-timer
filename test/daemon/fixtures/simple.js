const http = require('http')
const {Daemon} = require('../../../lib/daemon.js')

const port = process.argv[2]

Daemon.start({
  stdout: process.stdout,
  stderr: process.stderr,
})

const server = http.createServer(function (req, res) {
  res.end(String(process.pid))
})

server.listen(port)

// safety, kills process if test framework doesn't
setTimeout(function () {
  process.exit()
}, 5000)
