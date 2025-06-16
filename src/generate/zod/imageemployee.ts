import * as z from "zod"
import { CompleteEmployees, RelatedEmployeesModel } from "./index"


export const ImageEmployeeModel = z.object({
	id: z.number().int().optional(),
	photoProfile: z.string().nullish(),
	photoSignature: z.string().nullish(),
	photoKtp: z.string().nullish(),
	photoIjazah: z.string().nullish(),
	employeeId: z.string(),
})


export interface CompleteImageEmployee extends z.infer<typeof ImageEmployeeModel> {
	Employees: CompleteEmployees
}


/**
 * RelatedImageEmployeeModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedImageEmployeeModel: z.ZodSchema<CompleteImageEmployee> = z.lazy(() => ImageEmployeeModel.extend({
	Employees: RelatedEmployeesModel,
}))
