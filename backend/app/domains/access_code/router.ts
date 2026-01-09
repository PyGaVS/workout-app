import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const AccessCodesController = () => import('#domains/access_code/controllers/access_codes_controller')

export default function accessCodeRoutes() {
  router
    .group(() => {
      router
        .group(() => {
          router.get('/', [AccessCodesController, 'index'])
          router.post('/', [AccessCodesController, 'store'])
        })
        .prefix('/access-codes')
    })
    .middleware(middleware.auth())
}