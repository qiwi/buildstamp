import exec from './executor'
import { TEnv, TStampOptions } from './interfaces'

export * from './interfaces'
export * from './executor'
export { readBuildstamp } from './getter'
export const run = (flags: Record<string, any>) => {
  try {
    if (Array.isArray(flags.docker)) {
      delete flags.docker
    }
    // for mocking purpose
    exec.execute(flags as TStampOptions, process.env as TEnv)
  } catch (e) {
    console.error(e)
    process.exit(1) // eslint-disable-line unicorn/no-process-exit
  }
}
