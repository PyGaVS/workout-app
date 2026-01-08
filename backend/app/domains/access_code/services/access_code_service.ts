import AccessCode from "#commons/models/access_code";

export class AccessCodeService {
  async getAccessCodes(): Promise<AccessCode[]> {
    return AccessCode.all()
  }

  async  generateAccessCode(): Promise<AccessCode> {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase()
    return AccessCode.create({ code })
  }
}