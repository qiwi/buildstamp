#!/usr/bin/env node

import {createRequire} from 'node:module'
import minimist from 'minimist'
import {buildstamp} from './buildstamp'

const camelize = (s: string) => s.replace(/-./g, x => x[1].toUpperCase())
const normalizeFlags = (flags = {}): Record<string, any> => Object.fromEntries(Object.entries(flags).map(( [k, v]) => [camelize(k), v]))

const { cwd, git, date, output, version, help, extra } = normalizeFlags(minimist(process.argv.slice(2), {
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

  await buildstamp({
    cwd,
    date,
    git,
    output,
    extra: extra ? JSON.parse(extra) : {}
  })
})()