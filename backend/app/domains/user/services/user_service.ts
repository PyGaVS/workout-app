import User from '#commons/models/user'
import { StoreUserSchema } from '#domains/user/validators/user_validator'

export default class UserService {
  async findById(userId: number) {
    return User.findBy('id', userId)
  }

  async store(payload: StoreUserSchema) {
    return User.create({
      ...payload,
    })
  }
}
