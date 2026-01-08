import router from '@adonisjs/core/services/router'
import authRoutes from '#domains/authentication/router'
import workoutRoutes from '#domains/workout/router'
import exerciseBlocRoutes from '#domains/exercise_bloc/router'
import setRoutes from '#domains/set/router'
import exerciseRoutes from '#domains/exercise/router'
import userRoutes from '#domains/user/router'
import statRoutes from '#domains/stats/router'
import accessCodeRoutes from '#domains/access_code/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

authRoutes()
workoutRoutes()
exerciseBlocRoutes()
setRoutes()
exerciseRoutes()
accessCodeRoutes()
userRoutes()
statRoutes()
