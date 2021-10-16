import * as http from 'http'
import * as path from 'path'
import {promisify} from 'util'
import {launch} from './helpers'
import {exec as execCallback} from 'child_process'

const exec = promisify(execCallback)

describe('Daemon should', () => {
  beforeAll(async () => {
    await exec('npm run build')
  }, 60_000)

  describe('run script as background child process', () => {
    it('successfully', function (done) {
      const script = path.join('test/daemon/fixtures/simple.js')

      const port = '12345'

      const child = launch([script, port])

      child.stdout.pipe(process.stdout, {end: false})
      child.stderr.pipe(process.stderr, {end: false})

      // spawning child should exit
      child.on('exit', function (code) {
        expect(code).toBe(0)
        done()
      })

      // wait for http server to start up
      setTimeout(function () {
        const opt = {
          host: 'localhost',
          port: port,
        }

        http.get(opt, function (res) {
          const onData = function (chunk: number) {
            process.kill(chunk, 'SIGTERM')
            done()
          }
          res.setEncoding('utf8')
          res.on('data', onData)
        })
      }, 500)
    }, 10000)

    // sanity check that a no daemon process exits
    it('no daemon', function (done) {
      const script = path.join('test/daemon/fixtures/nodaemon.js')
      const child = launch([script])
      child.on('exit', function (code) {
        expect(code).toBe(0)
        done()
      })
    })
  })
})

