#!/usr/bin/env node
import meow from 'meow'

import { execute } from './executor'
import { TEnv, TStampOptions } from './interfaces'

const cli = meow(`
    Usage:
      buildstamp --out=some/path/stamp.json --git --docker.imageTag=foo --date.format=iso
    Options
      --out, path to generated file, optional, data is printed in stdout if absent
      --git, add git data to output, optional
      --cwd, working directory, default to process.cwd()
      --docker.imageTag, image tag, optional
      --date.format, adds date info to stamp, iso or instant
      --date.value, any valid input for Date constructor, default is current time
`, {
  flags: {
    out: {
      type: 'string',
    },
    git: {
      type: 'boolean',
    },
    cwd: {
      type: 'string',
    },
    docker: {
      type: 'string',
      isMultiple: true,
    },
    date: {
      type: 'string',
      isMultiple: true,
    },
  },
})

const launch = () => {
  try {
    execute(cli.flags as TStampOptions, process.env as TEnv)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

launch()
