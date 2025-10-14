import factory from '@adonisjs/lucid/factories'
import Workout from '#commons/models/workout'
import User from '#commons/models/user'

export const WorkoutFactory = factory
  .define(Workout, async ({ faker }) => {
    const [user] = await Promise.all([User.query().select('id').orderByRaw('RANDOM()').first()])

    return {
      date: faker.date.anytime(),
      user_id: user?.id,
    }
  })
  .build()
