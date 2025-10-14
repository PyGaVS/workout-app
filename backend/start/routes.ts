/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const AuthController = () => import('#domains/authentication/controllers/auth_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
router
  .group(() => {
    router.post('/register', [AuthController, 'register']).as('auth.register')
    router.post('/login', [AuthController, 'login']).as('auth.login')
  })
  .prefix('v1/auth')
