// commands/MakeUser.ts
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import UserService from '#domains/user/services/user_service'
import { Permissions } from '#commons/permissions/permissions_enum'
import { inject } from '@adonisjs/core'

export default class MakeUser extends BaseCommand {
  static commandName = 'make:user'
  static description = 'Create a new User with selectable permissions'
  static help = ['Requires a fullName, email, password and optional permissions']
  static options: CommandOptions = {
    startApp: true,
  }

  async interact() {
    this.logger.info('Creating user')
  }

  @inject()
  async run(userService: UserService) {
    try {
      const fullName = await this.prompt.ask('Enter fullName')
      const email = await this.prompt.ask('Enter the email')
      const password = await this.prompt.secure('Enter the password')

      // Construire les choix depuis l'enum
      const entries = Object.entries(Permissions)
        .filter(([k]) => Number.isNaN(Number(k)))
        .map(([name, value]) => ({ name, value: Number(value) }))

      this.logger.info('Available permissions:')
      entries.forEach((e, i) => {
        this.logger.info(`${i + 1}. ${e.name} (bit: ${e.value})`)
      })

      const selection = await this.prompt.ask(
        'Select permissions by numbers separated with comma (e.g. 1,3). Leave empty for none'
      )

      const permissionBits = this.parseSelectionToBitfield(selection, entries)

      await userService.store({
        fullName,
        email,
        password,
        permissions: permissionBits,
      })

      this.logger.success('Successfully created user')
    } catch (error: any) {
      this.logger.error(error.message ?? String(error))
      this.error = error
      this.exitCode = 1
    }
  }

  private parseSelectionToBitfield(
    input: string | null,
    entries: { name: string; value: number }[]
  ): number {
    if (!input || !input.trim()) return 0

    const picks = input
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => Number(s))
      .filter((n) => !Number.isNaN(n) && n >= 1 && n <= entries.length)

    const unique = Array.from(new Set(picks))
    let bitfield = 0
    for (const idx of unique) {
      const entry = entries[idx - 1]
      if (entry) bitfield |= entry.value
    }
    return bitfield
  }
}
