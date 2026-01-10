import Api from "../Api"
import AccessCode from "../models/AccessCode"
import User from "../models/User"

export default class AccessCodeService {
  public static async browse(): Promise<AccessCode[]> {
    const res = await Api.get<AccessCodeResponse[]>('access-codes')
    const accessCodes = res.body.map((accessCode: AccessCodeResponse) => {
      const user = accessCode.user ? new User(accessCode.user.fullName, accessCode.user.email, false, accessCode.user.isAdmin) : null
      return new AccessCode(accessCode.code, accessCode.memberFirstName, accessCode.memberLastName, user)
    })

    return accessCodes
  }

  public static async add(memberFirstName: string, memberLastName: string): Promise<AccessCode | null> {
    const res = await Api.post<{ memberFirstName: string, memberLastName: string }, AccessCodeResponse>(
      { memberFirstName, memberLastName },
      'access-codes'
    )
    if(!res.success) return null
    
    return new AccessCode(res.body.code, res.body.memberFirstName, res.body.memberLastName, null)
  }
}

interface AccessCodeResponse {
  id: number
  code: string
  memberFirstName: string
  memberLastName: string
  user?: {
    id: number
    fullName: string
    email: string
    isAdmin: boolean
  }
  createdAt: string
  updatedAt: string
}