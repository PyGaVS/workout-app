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

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

authRoutes()
workoutRoutes()
