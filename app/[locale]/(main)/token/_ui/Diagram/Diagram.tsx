import { getTranslations } from 'next-intl/server'

import DiagramClient from '@/[locale]/(main)/token/_ui/Diagram/DiagramClient'
import { getApiGlobalsSettings, listTokenUtilities } from '@/src/shared/api/fetch'
import { cn } from '@/src/shared/lib/tailwindUtils'
import { Title } from '@/src/shared/ui/Title'

import { statistics } from '../../_config'

export type IDiagramProps = {
  className?: string
}

const Diagram = async ({ className }: IDiagramProps) => {
  const t = await getTranslations('TokenPage')

  const { docs } = await listTokenUtilities({ limit: 100 })
  const { currentSupply } = await getApiGlobalsSettings()

  if (!docs.length) return

  const sum = docs.reduce((partialSum, a) => partialSum + a.totalSupply, 0)
  const supply = currentSupply as string

  return (
    <section
      className={cn(
        'mx-auto mb-28 flex max-w-[1360px] items-center justify-between gap-10 max-lg:flex-col-reverse max-md:mb-12 relative',
        className,
      )}
    >
      <div className="space-y-12 max-lg:-mx-3 max-lg:flex max-lg:w-full max-lg:flex-wrap max-lg:space-y-0 max-lg:text-center max-md:-mb-7 max-md:text-left [&>*:nth-child(3)>p]:font-main [&>*:nth-child(3)>p]:text-base [&>*:nth-child(3)>p]:font-medium [&>*:nth-child(3)>p]:text-text-third [&>*:nth-child(4)>p]:font-main [&>*:nth-child(4)>p]:text-base [&>*:nth-child(4)>p]:font-medium [&>*:nth-child(4)>p]:text-text-third [&>*:nth-child(5)>p]:font-main [&>*:nth-child(5)>p]:text-base [&>*:nth-child(5)>p]:font-medium [&>*:nth-child(5)>p]:text-text-third">
        <div className="space-y-1.5 max-lg:w-1/2 max-lg:px-3 max-lg:pb-8">
          <Title className="text-accent-300" tag="h4" size="3xs">
            {t(`statistics.first.title`)}
          </Title>

          <p className="font-headings text-2xl font-semibold text-text-primary max-md:text-xl">
            {sum.toLocaleString()}
          </p>
        </div>

        <div className="space-y-1.5 max-lg:w-1/2 max-lg:px-3 max-lg:pb-8">
          <Title className="text-accent-300" tag="h4" size="3xs">
            {t(`statistics.second.title`)}
          </Title>

          <p className="font-headings text-2xl font-semibold text-text-primary max-md:text-xl">
            {supply.toLocaleString()}
          </p>
        </div>

        {statistics.map((key) => (
          <div className="space-y-1.5 max-lg:w-1/3 max-lg:px-3 max-md:w-full max-md:pb-7" key={key}>
            <Title className="text-accent-300" tag="h4" size="3xs">
              {t(`statistics.${key}.title`)}
            </Title>

            <p className="font-headings text-2xl font-semibold text-text-primary">
              {t(`statistics.${key}.text`)}
            </p>
          </div>
        ))}
      </div>

      <div className="flex-1">
        <DiagramClient data={docs} />
      </div>

      <div className="absolute -bottom-2/4 -right-1/4 -z-1 size-72 -translate-x-1/4 -translate-y-1/4 bg-gradient-blur-to-r opacity-40 blur-8xl"></div>
    </section>
  )
}

export default Diagram
