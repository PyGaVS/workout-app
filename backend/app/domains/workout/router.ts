import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const WorkoutsController = () => import('#domains/workout/controllers/workouts_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('/', [WorkoutsController, 'index'])
      })
      .prefix('/workouts')
  })
  .prefix('v1')
  .middleware(middleware.auth())
