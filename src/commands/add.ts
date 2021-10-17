import {Command, flags} from '@oclif/command'
import {Daemon} from '../daemon'

export default class Add extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ timmy add
Added timer for 1 minute.
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    description: flags.string({
      char: 'd',
      description: 'Timer description.',
    }),
    minutes: flags.integer({
      char: 'm',
      description: 'Time for timer in minutes.',
      default: 1,
    }),
    seconds: flags.integer({
      char: 's',
      description: 'Time for timer in seconds.',
    }),
  }

  async run() {
    const {flags} = this.parse(Add)
    if (flags.seconds === undefined) {
      this.addTimerInMinutes(flags.minutes, flags.description)
    } else {
      this.addTimerInSeconds(flags.seconds, flags.description)
    }
  }

  private addTimerInMinutes(minutes: number, description?: string) {
    const timeout = Add.fromMinutesToMilliseconds(minutes)
    const message = description || `Time out for ${minutes} minutes.`
    const [cb, ...params] = this.generateNotificationCallback(timeout, message)
    this.log(`Added timer for ${minutes} minutes.`)
    new Daemon().runCallback(cb, ...params)
  }

  private addTimerInSeconds(seconds: number, description?: string) {
    const timeout = Add.fromSecondsToMilliseconds(seconds)
    const message = description || `Time out for ${seconds} seconds.`
    const [cb, ...params] = this.generateNotificationCallback(timeout, message)
    this.log(`Added timer for ${seconds} seconds.`)
    new Daemon().runCallback(cb, ...params)
  }

  private generateNotificationCallback(timeout: number, message: string): [Function, number, string] {
    return [
      (timeout: number, message: string) => {
        setTimeout(() => {
          const {notify} = require('node-notifier')
          notify({
            title: 'timmy',
            message,
            sound: true,
            timeout: 30, // Will be shown for 30 seconds unless user interact with notification
          })
        }, timeout)
      },
      timeout,
      message,
    ]
  }

  private static fromMinutesToMilliseconds(minutes: number) {
    return Add.fromSecondsToMilliseconds(minutes * 60)
  }

  private static fromSecondsToMilliseconds(seconds: number) {
    return seconds * 1000
  }
}
