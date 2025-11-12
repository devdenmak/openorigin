import { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import { ILang } from '@/src/app/model'
import { AuthWrapper } from '@/src/entities/auth-user/ui/AuthWrapper'
import { EditModelForm } from '@/src/features/model/edit-model/ui/EditModelForm'
import { findModelById, listModels } from '@/src/shared/api/fetch'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/src/shared/ui/Breadcrumb'
import { Icon } from '@/src/shared/ui/Icon'
import { LocalizedLink } from '@/src/shared/ui/LocalizedLink'
import { Title } from '@/src/shared/ui/Title'

type IProps = {
  params: { locale: ILang; id: string }
}

export async function generateStaticParams({ params: { locale } }: IProps) {
  unstable_setRequestLocale(locale)

  const { docs } = await listModels({ limit: 1000 })

  return docs.map(({ id }) => ({
    id: String(id),
  }))
}

export async function generateMetadata({ params: { locale, id } }: IProps): Promise<Metadata> {
  unstable_setRequestLocale(locale)

  const model = await findModelById(id)

  return {
    title: model?.name,
    description: model?.name,
  }
}

export default async function ModelsEditPage({ params: { locale, id } }: IProps) {
  unstable_setRequestLocale(locale)

  const t = await getTranslations()
  const model = await findModelById(id)

  return (
    <AuthWrapper>
      <div className="container flex grow flex-col py-5">
        <div className="mx-auto flex w-full max-w-screen-2xl grow flex-col max-3xl:max-w-screen-xl">
          <Breadcrumb className="mb-8 max-md:mb-5">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <LocalizedLink href="/profile">{t('Common.navigation.profile')}</LocalizedLink>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <LocalizedLink href="/profile/models">
                    {t('Common.navigation.myModels')}
                  </LocalizedLink>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage>{model?.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center">
            <div className="mr-3.5 flex size-9 items-center justify-center rounded-lg bg-accent-300 text-lg text-white">
              <Icon name="filled/models" />
            </div>

            <Title tag="h1" size="md">
              {model?.name}
            </Title>
          </div>

          <div className="mt-8 max-md:mt-6">
            <EditModelForm model={model} />
          </div>
        </div>
      </div>
    </AuthWrapper>
  )
}
