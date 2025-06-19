import { z } from 'zod';
import { EmployeesWithRelationsSchema, EmployeesOptionalDefaultsWithRelationsSchema } from './EmployeesSchema'
import type { EmployeesWithRelations, EmployeesOptionalDefaultsWithRelations } from './EmployeesSchema'

/////////////////////////////////////////
// SKILLS SCHEMA
/////////////////////////////////////////

export const SkillsSchema = z.object({
	id: z.number().int(),
	text: z.string().min(1),
	employeeId: z.string().min(1),
})

export type Skills = z.infer<typeof SkillsSchema>

/////////////////////////////////////////
// SKILLS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const SkillsOptionalDefaultsSchema = SkillsSchema.merge(z.object({
	id: z.number().int().optional(),
}))

export type SkillsOptionalDefaults = z.infer<typeof SkillsOptionalDefaultsSchema>

/////////////////////////////////////////
// SKILLS RELATION SCHEMA
/////////////////////////////////////////

export type SkillsRelations = {
	Employees: EmployeesWithRelations;
};

export type SkillsWithRelations = z.infer<typeof SkillsSchema> & SkillsRelations

export const SkillsWithRelationsSchema: z.ZodType<SkillsWithRelations> = SkillsSchema.merge(z.object({
	Employees: z.lazy(() => EmployeesWithRelationsSchema),
}))

/////////////////////////////////////////
// SKILLS OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type SkillsOptionalDefaultsRelations = {
	Employees: EmployeesOptionalDefaultsWithRelations;
};

export type SkillsOptionalDefaultsWithRelations =
	z.infer<typeof SkillsOptionalDefaultsSchema>
	& SkillsOptionalDefaultsRelations

export const SkillsOptionalDefaultsWithRelationsSchema: z.ZodType<SkillsOptionalDefaultsWithRelations> = SkillsOptionalDefaultsSchema.merge(z.object({
	Employees: z.lazy(() => EmployeesOptionalDefaultsWithRelationsSchema),
}))

export default SkillsSchema;
