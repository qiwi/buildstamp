import { TStampContext, TStampOptions } from '../interfaces'
import { formatOutput } from '../utils'

export const log = (
  ctx: TStampContext,
  opts: TStampOptions
) => {
  const body = formatOutput(
    ctx,
    opts.jsonSpace || '\t'
  )
  console.log(body)
}
