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
    minutes: flags.integer({
      char: 'm',
      description: 'Time for timer.',
      default: 1
    })
  }

  static args = [{name: 'file'}]

  async run() {
    const {flags} = this.parse(Hello)
    const cb = this.generateNotificationCallback(flags.minutes)
    console.log(cb.toString())
    Daemon.runCallback(cb)
  }

  private generateNotificationCallback(minutes: number) {
    const timeout = this.fromMinutesToMilliseconds(minutes)
    return () => {
      const notifier = require('node-notifier')
      setTimeout(() => {
        notifier.notify({
          title: 'cli-timer',
          message: 'Time out',
          sound: true
        })
      }, 2000)
    }
  }

  private fromMinutesToMilliseconds(minutes: number) {
    return minutes * 60 * 1000
  }
}
