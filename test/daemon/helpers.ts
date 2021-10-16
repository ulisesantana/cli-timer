import {ChildProcess, spawn} from 'child_process'

export function launch(args: string[]): ChildProcess {
  const child = spawn(process.execPath, args)

  child.stdout.pipe(process.stdout, {end: false})
  child.stderr.pipe(process.stderr, {end: false})

  return child
}
