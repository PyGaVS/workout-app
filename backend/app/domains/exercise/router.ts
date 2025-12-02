import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const ExercisesController = () => import('#domains/exercise/controllers/exercises_controller')

export default function exerciseRoutes() {
  router
    .group(() => {
      router
        .group(() => {
          router.get('/', [ExercisesController, 'index'])
        })
        .prefix('/exercises')
    })
    .middleware(middleware.auth())
}
