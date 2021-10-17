import {exec, spawn, SpawnOptions} from 'child_process'

export class Daemon {
  runCallback(callback: Function, ...params: any[]): void {
    exec(`node -e "(${callback.toString()})(${Daemon.prepareCallbackParams(params)})"`).unref()
    process.exit()
  }

  runScript(processOptions: Partial<NodeJS.Process> = {}): void {
    if (process.env.__daemon) {
      return
    }
    const [_node, script, ...args]: string[] = [...process.argv]
    spawn(process.execPath, [script].concat(args), Daemon.prepareSpawnOptions(processOptions)).unref()
    process.exit()
  }

  private static prepareCallbackParams(params: any[]): string {
    return params.map(x => typeof x === 'string' ? `'${x}'` : x).join(',')
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

