import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const WorkoutsController = () => import('#domains/workout/controllers/workouts_controller')

export default function workoutRoutes() {
  router
    .group(() => {
      router
        .group(() => {
          router.get('/', [WorkoutsController, 'index'])
          router.post('/', [WorkoutsController, 'store'])
        })
        .prefix('/workouts')
    })
    .prefix('v1')
    .middleware(middleware.auth())
}
