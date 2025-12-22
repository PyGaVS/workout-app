import User from '#commons/models/user'
import { HttpContext } from '@adonisjs/core/http'
import {
  loginValidator,
  registerValidator,
} from '#domains/authentication/validators/auth_validator'

export default class AuthController {
  async register({ request }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    const user = await User.create(data)

    return User.accessTokens.create(user)
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user, undefined, { expiresIn: '99999d' })

    response.plainCookie('auth_token', token.toJSON().token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      encode: false,
      maxAge: '99999d'
    })

    return response.send(user)
  }

  async me({ auth, response }: HttpContext) {
    const check = await auth.check()

    response.status(check ? 200 : 401 )
    return response.send({
      user: auth.user,
    })
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    response.clearCookie('auth_token')

    return { message: 'success' }
  }
}
