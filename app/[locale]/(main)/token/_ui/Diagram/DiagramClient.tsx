'use client'

import { useFormatter } from 'next-intl'
import { Pie, PieChart } from 'recharts'

import { TokenUtility } from '@/src/shared/api/_models'
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent } from '@/src/shared/ui/Chart'

import { colors } from '../../_config'

export type IDiagramClientProps = {
  data: TokenUtility[]
}

const DiagramClient = ({ data }: IDiagramClientProps) => {
  const format = useFormatter()

  const chartConfig = data
    .map((item) => item)
    .reduce(
      (a, v, i) => ({
        ...a,
        [v.tokenUse]: {
          label: v.tokenUse,
          color: colors[i] ?? colors[0],
        },
      }),
      {},
    ) satisfies ChartConfig

  const chartData = data.map((item, i) => ({
    ...item,
    fill: colors[i] ?? colors[0],
  }))

  return (
    <ChartContainer
      config={chartConfig}
      className="ml-auto aspect-square max-h-[800px] max-lg:max-h-none max-lg:min-h-[700px] max-md:min-h-[500px] max-sm:min-h-[380px]"
    >
      <PieChart>
        <Pie
          labelLine={false}
          label={(entry) => format.number(entry.percent, 'percent')}
          isAnimationActive={false}
          data={chartData}
          dataKey="totalSupply"
          nameKey="tokenUse"
          innerRadius="47%"
          paddingAngle={1}
          cornerRadius="10%"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </PieChart>
    </ChartContainer>
  )
}

export default DiagramClient
