import { test } from '@japa/runner'
import { computeBitfield } from '#commons/utils/compute_bitfield'
import { Permissions } from '#commons/permissions/permissions_enum'

test.group('utils/computeBitField', () => {
  test('retourne 0 si aucune permissions', async ({ assert }) => {
    const result = computeBitfield([])
    assert.equal(result, 0)
  })

  test('retourne une permission seule', async ({ assert }) => {
    const result = computeBitfield([Permissions.VIEW_USER])
    assert.equal(result, Permissions.VIEW_USER)
  })

  test('combinaison de deux permissions', async ({ assert }) => {
    const result = computeBitfield([Permissions.MANAGE_SET, Permissions.VIEW_SET])
    assert.equal(result, 192)
  })

  test('ignore les doublons', async ({ assert }) => {
    const result = computeBitfield([
      Permissions.MANAGE_EXERCISE,
      Permissions.VIEW_EXERCISE_BLOC,
      Permissions.VIEW_USER,
      Permissions.VIEW_USER,
    ])
    assert.equal(result, 33800)
  })

  test("vérification des permissions de l'admin", async ({ assert }) => {
    const result = computeBitfield([Permissions.ADMIN])
    assert.equal(result, 2097152)
  })
})
