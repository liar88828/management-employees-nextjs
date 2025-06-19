import { z } from 'zod';
import { EmployeesWithRelationsSchema, EmployeesOptionalDefaultsWithRelationsSchema } from './EmployeesSchema'
import type { EmployeesWithRelations, EmployeesOptionalDefaultsWithRelations } from './EmployeesSchema'

/////////////////////////////////////////
// EXPERIENCES SCHEMA
/////////////////////////////////////////

export const ExperiencesSchema = z.object({
	id: z.number().int(),
	text: z.string().min(1),
	employeeId: z.string().min(1),
})

export type Experiences = z.infer<typeof ExperiencesSchema>

/////////////////////////////////////////
// EXPERIENCES OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const ExperiencesOptionalDefaultsSchema = ExperiencesSchema.merge(z.object({
	id: z.number().int().optional(),
}))

export type ExperiencesOptionalDefaults = z.infer<typeof ExperiencesOptionalDefaultsSchema>

/////////////////////////////////////////
// EXPERIENCES RELATION SCHEMA
/////////////////////////////////////////

export type ExperiencesRelations = {
	Employees: EmployeesWithRelations;
};

export type ExperiencesWithRelations = z.infer<typeof ExperiencesSchema> & ExperiencesRelations

export const ExperiencesWithRelationsSchema: z.ZodType<ExperiencesWithRelations> = ExperiencesSchema.merge(z.object({
	Employees: z.lazy(() => EmployeesWithRelationsSchema),
}))

/////////////////////////////////////////
// EXPERIENCES OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type ExperiencesOptionalDefaultsRelations = {
	Employees: EmployeesOptionalDefaultsWithRelations;
};

export type ExperiencesOptionalDefaultsWithRelations =
	z.infer<typeof ExperiencesOptionalDefaultsSchema>
	& ExperiencesOptionalDefaultsRelations

export const ExperiencesOptionalDefaultsWithRelationsSchema: z.ZodType<ExperiencesOptionalDefaultsWithRelations> = ExperiencesOptionalDefaultsSchema.merge(z.object({
	Employees: z.lazy(() => EmployeesOptionalDefaultsWithRelationsSchema),
}))

export default ExperiencesSchema;
