#!/usr/bin/env node

import {createRequire} from 'node:module'
import minimist from 'minimist'
import {buildstamp} from './buildstamp'
import * as process from "node:process";

const camelize = (s: string) => s.replace(/-./g, x => x[1].toUpperCase())
const normalizeFlags = (flags = {}): Record<string, any> => Object.fromEntries(Object.entries(flags).map(([k, v]) =>
  [camelize(k), v === 'false' ? false : v]))

const { cwd, git, date, output, version, help, extra, safe } = normalizeFlags(minimist(process.argv.slice(2), {
  alias: {
    help: ['h'],
    version: ['v'],
    output: ['o']
  },
}));

(async () => {

  if (help) {
    console.log(`
  Usage:
    $ buildstamp [opts]
  
  Options:
    --output        Specify the output file. Defaults to 'buildstamp.json'
    --git           Inject git info. True by default
    --date          Inject date. True by default
    --extra         JSON to mixin
    --safe          Suppress any errors. Defaults to false
    --help, -h      Print help digest
    --version, -v   Print version
  
  Examples:
    $ buildstamp --output=stamp.json
    $ buildstamp --extra='{"foo": "bar"}'
`)
    return
  }

  if (version) {
    console.log((import.meta.url ? createRequire(import.meta.url) : require)('../../package.json').version)
    return
  }

  try {
    await buildstamp({
      cwd,
      date,
      git,
      output,
      safe,
      extra: extra ? JSON.parse(extra) : {}
    })
    process.exit(0)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()