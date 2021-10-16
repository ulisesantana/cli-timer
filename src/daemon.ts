import {ChildProcess, spawn, exec, SpawnOptions} from 'child_process'

export class Daemon {
  static start(params: Function | Partial<NodeJS.Process> = {}): number {
    // we are a daemon, don't daemonize again
    if (process.env.__daemon) {
      return process.pid
    }

    if (typeof params === 'function') {
      Daemon.runCallback(params)
    } else {
      Daemon.runScript(Daemon.prepareSpawnOptions(params))
    }

    return process.exit()
  }

  private static runScript(childProcessOptions: SpawnOptions): ChildProcess {
    const [_node, script, ...args]: string[] = [...process.argv]

    // spawn the child using the same node process as ours
    const child = spawn(process.execPath, [script].concat(args), childProcessOptions)

    // required so the parent can exit
    child.unref()

    return child
  }

  private static runCallback(fn: Function): ChildProcess {
    const child = spawn(`node -e "(${fn.toString()})()"`, [], Daemon.prepareSpawnOptions())

    // required so the parent can exit
    child.unref()

    return child
  }

  private static prepareSpawnOptions(options: Partial<NodeJS.Process> = {}): SpawnOptions {
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

