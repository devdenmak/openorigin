import { getFormatter, getTranslations } from 'next-intl/server'

import { listTokenUtilities } from '@/src/shared/api/fetch'
import { cn } from '@/src/shared/lib/tailwindUtils'

import { table } from '../../_config'
import { colors } from '../../_config'

export type ITableProps = {
  className?: string
}

const Table = async ({ className }: ITableProps) => {
  const { docs } = await listTokenUtilities({ limit: 100 })

  if (!docs.length) return

  const format = await getFormatter()
  const t = await getTranslations('TokenPage')
  const sum = docs.reduce((partialSum, a) => partialSum + a.totalSupply, 0)

  return (
    <div style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="overflow-y-auto">
      <div className="container">
        <section className={cn(className, 'min-w-[1065px] pr-8 max-sm:pr-0 max-sm:min-w-[0]')}>
          <div className="flex gap-1.5 max-sm:hidden [&>*:nth-child(1)]:w-[327px] [&>*:nth-child(2)]:w-[234px] [&>*:nth-child(3)]:w-[181px] [&>*:nth-child(4)]:grow">
            {table.head.map((item) => (
              <div
                className="mb-1.5 rounded-lg bg-surface-fifth p-5 font-headings text-xl font-semibold text-text-primary"
                key={item}
              >
                {t(`table.head.${item}`)}
              </div>
            ))}
          </div>

          <div className="relative">
            {docs.map(({ id, tokenUse, totalSupply, vesting }, index) => {
              return (
                <div
                  className="mb-1.5 flex gap-1.5 font-headings text-base font-semibold text-text-primary max-sm:block max-sm:overflow-hidden max-sm:rounded-lg [&>*:nth-child(1)]:w-[327px] [&>*:nth-child(1)]:shrink-0 [&>*:nth-child(2)]:w-[234px] [&>*:nth-child(2)]:shrink-0 [&>*:nth-child(3)]:w-[181px] [&>*:nth-child(3)]:shrink-0 [&>*:nth-child(4)]:grow [&>*:nth-child(4)]:font-main [&>*:nth-child(4)]:font-normal [&>*:nth-child(4)]:text-text-third"
                  key={id}
                >
                  <div
                    className={
                      'relative rounded-lg bg-gradient-solid-to-r p-5 pl-12 max-sm:!w-full max-sm:rounded-none max-sm:py-2.5 max-sm:pt-4'
                    }
                  >
                    <div
                      style={{ backgroundColor: `${colors[index]}` }}
                      className="absolute left-5 top-[23px] block size-4 rounded-sm content-[''] max-sm:!top-[19.5px]"
                    />
                    {tokenUse}
                  </div>

                  <div className="relative rounded-lg bg-gradient-solid-to-r p-5 max-sm:!w-full max-sm:rounded-none max-sm:py-2.5">
                    {totalSupply.toLocaleString()}
                  </div>

                  <div className="relative rounded-lg bg-gradient-solid-to-r p-5 max-sm:!w-full max-sm:rounded-none max-sm:py-2.5">
                    {format.number(totalSupply / sum, 'percent')}
                  </div>

                  <div className="relative rounded-lg bg-gradient-solid-to-r p-5 max-sm:!w-full max-sm:rounded-none max-sm:py-2.5 max-sm:pb-4">
                    {vesting}
                  </div>
                </div>
              )
            })}

            <div className="mb-1.5 flex gap-1.5 font-headings text-base font-semibold text-text-primary max-sm:block max-sm:overflow-hidden max-sm:rounded-lg [&>*:nth-child(1)]:w-[327px] [&>*:nth-child(1)]:shrink-0 [&>*:nth-child(2)]:w-[234px] [&>*:nth-child(2)]:shrink-0 [&>*:nth-child(3)]:w-[181px] [&>*:nth-child(3)]:shrink-0 [&>*:nth-child(4)]:grow [&>*:nth-child(4)]:font-main [&>*:nth-child(4)]:font-normal [&>*:nth-child(4)]:text-text-third">
              <div
                className={
                  'relative rounded-lg bg-gradient-solid-to-r p-5 pl-12 max-sm:!w-full max-sm:rounded-none max-sm:py-2.5 max-sm:pt-4'
                }
              >
                <div className="absolute left-5 top-[23px] block size-4 rounded-sm content-[''] max-sm:!top-[19.5px]" />
                {t('total')}
              </div>

              <div className="relative rounded-lg bg-gradient-solid-to-r p-5 max-sm:!w-full max-sm:rounded-none max-sm:py-2.5">
                {sum.toLocaleString()}
              </div>

              <div className="relative rounded-lg bg-gradient-solid-to-r p-5 max-sm:!w-full max-sm:rounded-none max-sm:py-2.5">
                100%
              </div>

              <div className="relative rounded-lg bg-gradient-solid-to-r p-5 max-sm:!w-full max-sm:rounded-none max-sm:py-2.5 max-sm:pb-4"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Table
