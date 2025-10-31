/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import authRoutes from '#domains/authentication/router'
import workoutRoutes from '#domains/workout/router'
import exerciseBlocRoutes from '#domains/exercise_bloc/router'
import setRoutes from '#domains/set/router'
import exerciseRoutes from '#domains/exercise/router'
import userRoutes from '#domains/user/router'

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
userRoutes()
