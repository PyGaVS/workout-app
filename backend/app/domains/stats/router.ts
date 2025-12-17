import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const StatsController = () => import('#domains/stats/controllers/stats_controller')

export default function statRoutes() {
  router
    .group(() => {
      router
        .group(() => {
          router.get('/', [StatsController, 'index'])
          router.get('/thisWeek', [StatsController, 'thisWeek'])
        })
        .prefix('/stats')
    })
    .middleware(middleware.auth())
}
