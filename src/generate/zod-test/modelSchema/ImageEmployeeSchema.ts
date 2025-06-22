import { z } from 'zod';
import type { EmployeesOptionalDefaultsWithRelations, EmployeesWithRelations } from './EmployeesSchema'
import { EmployeesOptionalDefaultsWithRelationsSchema, EmployeesWithRelationsSchema } from './EmployeesSchema'

/////////////////////////////////////////
// IMAGE EMPLOYEE SCHEMA
/////////////////////////////////////////

export const ImageEmployeeSchema = z.object({
	id: z.number().int(),
	photoProfile: z.string().nullish(),
	photoKtp: z.string().nullish(),
	photoIjazah: z.string().nullish(),
	employeeId: z.string(),
})

export type ImageEmployee = z.infer<typeof ImageEmployeeSchema>

/////////////////////////////////////////
// IMAGE EMPLOYEE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const ImageEmployeeOptionalDefaultsSchema = ImageEmployeeSchema.merge(z.object({
	id: z.number().int().optional(),
}))

export type ImageEmployeeOptionalDefaults = z.infer<typeof ImageEmployeeOptionalDefaultsSchema>

/////////////////////////////////////////
// IMAGE EMPLOYEE RELATION SCHEMA
/////////////////////////////////////////

export type ImageEmployeeRelations = {
	Employees: EmployeesWithRelations;
};

export type ImageEmployeeWithRelations = z.infer<typeof ImageEmployeeSchema> & ImageEmployeeRelations

export const ImageEmployeeWithRelationsSchema: z.ZodType<ImageEmployeeWithRelations> = ImageEmployeeSchema.merge(z.object({
	Employees: z.lazy(() => EmployeesWithRelationsSchema),
}))

/////////////////////////////////////////
// IMAGE EMPLOYEE OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type ImageEmployeeOptionalDefaultsRelations = {
	Employees: EmployeesOptionalDefaultsWithRelations;
};

export type ImageEmployeeOptionalDefaultsWithRelations =
	z.infer<typeof ImageEmployeeOptionalDefaultsSchema>
	& ImageEmployeeOptionalDefaultsRelations

export const ImageEmployeeOptionalDefaultsWithRelationsSchema: z.ZodType<ImageEmployeeOptionalDefaultsWithRelations> = ImageEmployeeOptionalDefaultsSchema.merge(z.object({
	Employees: z.lazy(() => EmployeesOptionalDefaultsWithRelationsSchema),
}))

export default ImageEmployeeSchema;
