import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const SetsController = () => import('#domains/set/controllers/sets_controller')

export default function setRoutes() {
  router
    .group(() => {
      router
        .group(() => {
          router.post('/:exerciseBlocId/:exerciseId', [SetsController, 'store'])
          //router.put('/update/:setId', [SetsController, 'update'])
        })
        .prefix('/sets')
    })
    .middleware(middleware.auth())
}
