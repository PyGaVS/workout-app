import User from '#commons/models/user'
import { HttpContext } from '@adonisjs/core/http'
import {
  loginValidator,
  registerValidator,
} from '#domains/authentication/validators/auth_validator'
import { AccessCodeService } from '#domains/access_code/services/access_code_service'
import { inject } from '@adonisjs/core'
import { computeBitfield } from '#commons/utils/compute_bitfield'
import { defaultUserPermissions, Permissions } from '#commons/permissions/permissions_enum'
import { PermissionService } from '#commons/permissions/permission_service'

@inject()
export default class AuthController {

  constructor(protected accessCodeService: AccessCodeService, protected permissionService: PermissionService) {}

  async register({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    const accessCode = await this.accessCodeService.findByCode(data.accessCode)
    if (!accessCode || accessCode.userId !== null) {
      return response.unauthorized({ message: 'Invalid access code' })
    }

    const user = await User.create(
      { email: data.email, password: data.password, fullName: data.fullName, permissions: computeBitfield(defaultUserPermissions) }
    )
    await this.accessCodeService.assignToUser(accessCode, user.id)
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
    const isAdmin = await this.permissionService.hasPermission(user, Permissions.ADMIN)
    return response.send({ fullName: user.fullName, email: user.email, isAdmin })
  }

  async me({ auth, response }: HttpContext) {
    const check = await auth.check()

    response.status(check ? 200 : 401 )
    const user = auth.user
    const isAdmin = user ? await this.permissionService.hasPermission(user, Permissions.ADMIN) : false
    return response.send({
      user: {
        fullName: user?.fullName,
        email: user?.email,
        isAdmin: isAdmin,
      },
    })
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    response.clearCookie('auth_token')

    return { message: 'success' }
  }
}
