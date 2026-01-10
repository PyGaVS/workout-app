import AccessCode from "#commons/models/access_code";

export class AccessCodeService {
  async getAccessCodes(): Promise<AccessCode[]> {
    return AccessCode.all()
  }

  async createAccessCode(memberFirstName: string, memberLastName: string): Promise<AccessCode> {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase()
    return AccessCode.create({ code, memberFirstName, memberLastName })
  }

  async findByCode(code: string): Promise<AccessCode | null> {
    return AccessCode.findBy('code', code)
  }

  async assignToUser(accessCode: AccessCode, userId: number): Promise<AccessCode> {
    accessCode.userId = userId
    await accessCode.save()
    return accessCode
  }
}