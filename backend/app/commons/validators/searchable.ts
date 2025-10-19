import vine from '@vinejs/vine'

export const searchComposable = vine.object({
  limit: vine.number().optional(),
  page: vine.number().optional(),
  search: vine.string().optional(),
})

export const searchValidator = vine.compile(vine.object({ ...searchComposable.getProperties() }))
