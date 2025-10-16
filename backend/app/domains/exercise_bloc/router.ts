import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const ExerciseBlocsController = () =>
  import('#domains/exercise_bloc/controllers/exercise_blocs_controller')

export default function exerciseBlocRoutes() {
  router
    .group(() => {
      router
        .group(() => {
          router.post('/', [ExerciseBlocsController, 'store'])
        })
        .prefix('exerciseBloc/:workoutId')
    })
    .prefix('v1')
    .middleware(middleware.auth())
}
