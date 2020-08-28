import { TStampContext, TStampOptions } from '../interfaces'
import { formatOutput } from '../utils'
import { defaultJsonSpace } from '../constants'

export const log = (
  ctx: TStampContext,
  opts: TStampOptions
) => {
  const body = formatOutput(
    ctx,
    opts.jsonSpace || defaultJsonSpace
  )
  console.log(body)
}
