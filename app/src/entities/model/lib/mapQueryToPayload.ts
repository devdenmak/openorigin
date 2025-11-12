import { ListModelsParams } from '@/src/shared/api/_models'

type ModelsQuery = {
  availability?: string
  tag_id?: string
  page?: string
  q?: string
}

export function mapQueryToPayload(query: ModelsQuery): ListModelsParams {
  const params: ListModelsParams = {
    limit: 12,
  }

  // Pagination
  if (query.page) {
    params.page = Number(query.page)
  }

  const where: Record<string, unknown> = {}

  if (query.availability) {
    where.availability = {
      equals: query.availability,
    }
  }

  if (query.tag_id) {
    where.tag = {
      equals: Number(query.tag_id),
    }
  }

  if (query.q) {
    where.name = {
      contains: query.q,
    }
  }

  if (Object.keys(where).length > 0) {
    params.where = where as ListModelsParams['where']
  }

  return params
}
