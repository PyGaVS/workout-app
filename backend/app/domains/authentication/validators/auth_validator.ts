import vine from '@vinejs/vine'

const password = vine.string().minLength(8)

export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(1),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const match = await db.from('users').select('id').where('email', value).first() // Verify if exists -> march true
        return !match // If exists (return !true -> false) unvalidated
      }),
    password,
    accessCode: vine.string().fixedLength(8).alphaNumeric()
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password,
  })
)
