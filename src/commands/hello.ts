import * as notifier from 'node-notifier'
import {Command, flags} from '@oclif/command'
import {Daemon} from '../daemon'

export default class Hello extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ cli-timer hello
hello world from ./src/hello.ts!
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'file'}]

  async run() {
    this.log('RUN!!')
    notifier.notify({
      title: 'Test',
      message: 'Hi!',
    })
    const cb = () => {
      const notifier = require('node-notifier')
      setTimeout(() => {
        notifier.notify({
          title: 'My notification',
          message: 'Hello!',
        })
      }, 5000)
    }
    this.log(cb.toString())
    // Daemon.start(cb)
  }
}
