import { EUserRole } from "./Enums"

export interface IUserAuth {
    id: number,
    login: string,
    email: string,
    role: EUserRole
}