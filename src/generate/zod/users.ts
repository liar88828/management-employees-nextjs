import * as z from "zod"
import { CompleteEmployees, RelatedEmployeesModel } from "./index"

export const UsersModel = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    phone: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(1),
    role: z.string().min(1),
    otp: z.string().min(1).nullish(),
    otpExpired: z.date(),
    imgPass: z.string().min(1),
    statusEmployee: z.string(),
})

export interface CompleteUsers extends z.infer<typeof UsersModel> {
    Employees?: CompleteEmployees | null
}

/**
 * RelatedUsersModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUsersModel: z.ZodSchema<CompleteUsers> = z.lazy(() => UsersModel.extend({
    Employees: RelatedEmployeesModel.nullish(),
}))
