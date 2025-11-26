import router from '@adonisjs/core/services/router'

const AuthController = () => import('#domains/authentication/controllers/auth_controller')

export default function authRoutes() {
  router
    .group(() => {
      router.post('/register', [AuthController, 'register']).as('auth.register')
      router.post('/login', [AuthController, 'login']).as('auth.login')
      router.get('/me', [AuthController, 'me']).as('auth.me')
    })
    .prefix('v1/auth')
}
