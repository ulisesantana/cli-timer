cli-timer
=========

Run a timer from your shell. node-notifier is a peer dependency which must be installed with --cli option.

```shell
npm i --cli node-notifier
```

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
$ npm install -g @ulisesantana/cli-timer
$ timmy COMMAND
running command...
$ timmy (-v|--version|version)
@ulisesantana/cli-timer/0.2.1 linux-x64 node-v14.16.0
$ timmy --help [COMMAND]
USAGE
  $ timmy COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`timmy add`](#timmy-add)
* [`timmy help [COMMAND]`](#timmy-help-command)

## `timmy add`

describe the command here

```
USAGE
  $ timmy add

OPTIONS
  -d, --description=description  Timer description.
  -h, --help                     show CLI help
  -m, --minutes=minutes          [default: 1] Time for timer in minutes.
  -s, --seconds=seconds          Time for timer in seconds.

EXAMPLE
  $ timmy add
  Added timer for 1 minute.
```

_See code: [src/commands/add.ts](https://github.com/ulisesantana/cli-timer/blob/v0.2.1/src/commands/add.ts)_

## `timmy help [COMMAND]`

display help for timmy

```
USAGE
  $ timmy help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_
<!-- commandsstop -->
