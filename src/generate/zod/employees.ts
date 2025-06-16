import * as z from "zod"
import {
	CompleteEducations,
	CompleteImageEmployee,
	CompleteSkills,
	CompleteUsers,
	RelatedEducationsModel,
	RelatedImageEmployeeModel,
	RelatedSkillsModel,
	RelatedUsersModel
} from "./index"


export const EmployeesModel = z.object({
	id: z.string().uuid().optional(),
	gender: z.string().min(1),
	dateOfBirth: z.date(),
	hireDate: z.date(),
	jobTitle: z.string().min(1),
	statusEmployee: z.string().min(1),
	registration: z.boolean(),
	address: z.string().min(1),
	city: z.string().min(1),
	postalCode: z.string().min(1),
	workTime: z.string().min(1),
	notes: z.string().min(0),
	salary: z.number().int().min(0),
	userId: z.string(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
})

export interface CompleteEmployees extends z.infer<typeof EmployeesModel> {
	Educations: CompleteEducations[]
	Skills: CompleteSkills[]
	User: CompleteUsers
	ImageEmployee?: CompleteImageEmployee | null
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
	ImageEmployee: RelatedImageEmployeeModel.nullish(),
}))
