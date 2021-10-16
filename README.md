cli-timer
=========

Run a timer from your shell.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/cli-timer.svg)](https://npmjs.org/package/cli-timer)
[![Downloads/week](https://img.shields.io/npm/dw/cli-timer.svg)](https://npmjs.org/package/cli-timer)
[![License](https://img.shields.io/npm/l/cli-timer.svg)](https://github.com/ulisesantana/cli-timer/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g cli-timer
$ cli-timer COMMAND
running command...
$ cli-timer (-v|--version|version)
cli-timer/0.1.0 linux-x64 node-v14.16.0
$ cli-timer --help [COMMAND]
USAGE
  $ cli-timer COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cli-timer hello [FILE]`](#cli-timer-hello-file)
* [`cli-timer help [COMMAND]`](#cli-timer-help-command)

## `cli-timer hello [FILE]`

describe the command here

```
USAGE
  $ cli-timer hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ cli-timer hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/ulisesantana/cli-timer/blob/v0.1.0/src/commands/hello.ts)_

## `cli-timer help [COMMAND]`

display help for cli-timer

```
USAGE
  $ cli-timer help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_
<!-- commandsstop -->
