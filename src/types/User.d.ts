import { User } from "@/models"
import { ZodString } from "zod"

export type UserByLogin = Omit<User, 'guid_IS' | 'password'>

export type UpdateUserPassword = {
    password: string
    temporary: boolean
}

export type UpdatePasswordSchema = {
    password: ZodString
    newPassword: ZodString
}

export type UpdatePasswordData = {
    password: string
    newPassword:string
}