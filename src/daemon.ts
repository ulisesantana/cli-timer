import {ChildProcess, spawn, exec, SpawnOptions} from 'child_process'

export class Daemon {
  static runCallback(callback: Function): void {
    exec(`node -e "(${callback.toString()})()"`).unref()
    process.exit()
  }

  static runScript(processOptions: Partial<NodeJS.Process> = {}): void {
    if (process.env.__daemon) {
      return
    }
    const [_node, script, ...args]: string[] = [...process.argv]
    spawn(process.execPath, [script].concat(args), Daemon.prepareSpawnOptions(processOptions)).unref()
    process.exit()
  }

  private static prepareSpawnOptions(options: Partial<NodeJS.Process>): SpawnOptions {
    // the child process will have this set so we can identify it as being daemonized
    const daemonProcess = {
      ...options,
      cwd: options.cwd || process.cwd,
      env: {
        ...(options.env || process.env),
        __daemon: 'true',
      },
    } as unknown as NodeJS.Process

    const stdout = daemonProcess.stdout || 'ignore'
    const stderr = daemonProcess.stderr || 'ignore'

    return {
      stdio: ['ignore', stdout, stderr],
      env: daemonProcess.env,
      cwd: daemonProcess.cwd(),
      detached: true,
    }
  }
}

