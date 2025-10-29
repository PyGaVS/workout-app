import User from '#commons/models/user'
import { StoreUserSchema } from '#domains/user/validators/user_validator'

export default class UserService {
  async store(payload: StoreUserSchema) {
    return User.create({
      ...payload,
    })
  }
}
