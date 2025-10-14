import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

// const ExercisesController = () => import('#domains/exercise/controllers/exercises_controller')

router
  .group(() => {
    router
      .group(() => {
        // router.get('/', [ExercisesController, 'index'])
      })
      .prefix('/exercises')
  })
  .prefix('v1')
  .middleware(middleware.auth())
