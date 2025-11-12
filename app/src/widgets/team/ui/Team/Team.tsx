import { BACKEND_URL } from '@/src/app/config/env'
import { Photo } from '@/src/shared/api/_models'
import { listMembers } from '@/src/shared/api/fetch'
import { cn } from '@/src/shared/lib/tailwindUtils'
import { Image } from '@/src/shared/ui/Image'
import { Title } from '@/src/shared/ui/Title'

export type ITeamProps = {
  className?: string
}

const Team = async ({ className }: ITeamProps) => {
  const { docs } = await listMembers({ limit: 16 })

  if (!docs.length) return

  return (
    <section className={cn('max-w-screen-2xl ml-auto mr-auto', className)}>
      <div className="grid grid-cols-4 gap-5 max-xl:grid-cols-2 max-md:grid-cols-1 max-md:gap-2.5">
        {docs.map(({ id, name, position, image }) => (
          <article
            className="group flex min-h-64 flex-col justify-between rounded-2xl border border-surface-fifth bg-surface-third p-6 even:flex-col-reverse max-md:min-h-48 max-md:rounded-xl max-md:p-5 max-md:even:flex-col"
            key={id}
          >
            <div className="relative size-[69px] overflow-hidden rounded-xl group-even:mt-5 max-md:group-even:mt-0">
              <Image
                fillParent
                src={`${BACKEND_URL}${(image as Photo).url}`}
                width={69}
                height={69}
                alt={name}
              />
            </div>

            <div className="mt-5 group-even:mt-0 max-md:group-even:mt-5">
              <Title className="mb-1" size="sm" tag="h2">
                {name}
              </Title>

              <p className="font-main text-base text-text-secondary">{position}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Team
