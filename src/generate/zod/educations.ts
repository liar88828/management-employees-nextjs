import * as z from "zod"
import { CompleteEmployees, RelatedEmployeesModel } from "./index"


export const EducationsModel = z.object({
	id: z.number().int().optional(),
	text: z.string().min(1),
	employeeId: z.string().min(1),
})

export interface CompleteEducations extends z.infer<typeof EducationsModel> {
	Employees: CompleteEmployees
}

/**
 * RelatedEducationsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedEducationsModel: z.ZodSchema<CompleteEducations> = z.lazy(() => EducationsModel.extend({
	Employees: RelatedEmployeesModel,
}))
