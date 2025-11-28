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
          router.put('/:id', [WorkoutsController, 'update'])
        })
        .prefix('/workouts')
    })
    .middleware(middleware.auth())
}
