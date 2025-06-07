import * as z from "zod"
import {
    CompleteEducations,
    CompleteSkills,
    CompleteUsers,
    RelatedEducationsModel,
    RelatedSkillsModel,
    RelatedUsersModel
} from "./index"

export const EmployeesModel = z.object({
    id: z.string(),
    gender: z.string().min(1),
    dateOfBirth: z.date(),
    hireDate: z.date(),
    jobTitle: z.string().min(1),
    salary: z.number().int().min(1),
    statusEmployee: z.string().min(1),
    registration: z.boolean(),
    address: z.string().min(1),
    city: z.string().min(1),
    postalCode: z.string().min(1),
    workTime: z.string().min(1),
    notes: z.string().min(1),
    img: z.string().min(1),
    sendEmail: z.number().int(),
    photoKtp: z.string().nullish(),
    photoIjazah: z.string().nullish(),
    userId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export interface CompleteEmployees extends z.infer<typeof EmployeesModel> {
    Educations: CompleteEducations[]
    Skills: CompleteSkills[]
    User: CompleteUsers
}

/**
 * RelatedEmployeesModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedEmployeesModel: z.ZodSchema<CompleteEmployees> = z.lazy(() => EmployeesModel.extend({
    Educations: RelatedEducationsModel.array(),
    Skills: RelatedSkillsModel.array(),
    User: RelatedUsersModel,
}))
