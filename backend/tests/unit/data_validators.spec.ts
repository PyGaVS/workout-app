import { test } from '@japa/runner'
import { createWorkoutValidator } from '#domains/workout/validators/workouts_validator'
import { createSetValidator } from '#domains/set/validators/set_validator'
import { loginValidator } from '#domains/authentication/validators/auth_validator'

test.group('Data validators', () => {
  test('valide un payload POST workout', async ({ assert }) => {
    const payload = {
      date: '2025-01-01 10:10:10',
      exercise_blocs: [{ title: 'Chest', sets: [{ exercise_id: 1, reps: 10, weight: 20 }] }],
    }
    const output = await createWorkoutValidator.validate(payload)

    assert.equal(output.date.toISOString(), new Date('2025-01-01 10:10:10').toISOString())
    assert.equal(output.exercise_blocs![0].title, 'Chest')
    assert.equal(
      output.exercise_blocs![0].sets![0].exercise_id,
      payload.exercise_blocs[0].sets[0].exercise_id
    )
  })

  test('valide un payload POST set', async ({ assert }) => {
    const payload = {
      reps: 2,
      weight: 12,
      comment: 'Set test comment',
      restTime: 120,
    }
    const output = await createSetValidator.validate(payload)

    assert.deepEqual(output, payload)
  })

  test('valide un payload POST login', async ({ assert }) => {
    const payload = {
      email: 'malikoh.kupa@test.com',
      password: '12345678',
    }

    const output = await loginValidator.validate(payload)

    assert.deepEqual(output, payload)
  })
})
