import {describe, it, expect} from '@abstractest/core'
import {spawn} from '../../main/ts/buildstamp'
import * as path from 'node:path'
import * as os from 'node:os'
import {fileURLToPath} from 'node:url'
import * as fs from 'node:fs/promises'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const cli = path.resolve(__dirname, `../../main/ts/cli.ts`)
const run = async (...args: string[]) => spawn('node', [
    '--loader=ts-node/esm',
    '--experimental-specifier-resolution=node',
    cli,
    ...args
  ], process.cwd())


describe('CLI', () => {
  it('returns a result corresponding the passed opts', async () => {
    const tmp = path.resolve(await fs.realpath(os.tmpdir()), Math.random().toString(36).slice(2))
    const output = path.resolve(tmp, 'out.json')

    await run(`--output=${output}`)

    const stamp = JSON.parse(await fs.readFile(output, 'utf8'))
    expect(stamp.git_repo_name).toEqual('qiwi/buildstamp')
  })

  // it('prints own version', async () => {
  //   expect((await run(`-v`)).stdout).toEqual('foo')
  // })

  it('prints help', async () => {
    expect((await run(`-h`)).stdout.includes('Usage:')).toEqual(true)
  })
})
