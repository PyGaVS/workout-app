import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const UsersController = () => import('#domains/user/controllers/users_controller')

export default function userRoutes() {
  router
    .group(() => {
      router
        .group(() => {
          router.get('/:userId', [UsersController, 'show'])
        })
        .prefix('/users')
    })
    .middleware(middleware.auth())
}
