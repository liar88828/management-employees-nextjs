import * as z from "zod"
import { CompleteEmployees, RelatedEmployeesModel } from "./index"


export const SkillsModel = z.object({
	id: z.number().int().optional(),
	text: z.string().min(1),
	employeeId: z.string().min(1),
})

export interface CompleteSkills extends z.infer<typeof SkillsModel> {
	Employees: CompleteEmployees
}

/**
 * RelatedSkillsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSkillsModel: z.ZodSchema<CompleteSkills> = z.lazy(() => SkillsModel.extend({
	Employees: RelatedEmployeesModel,
}))
