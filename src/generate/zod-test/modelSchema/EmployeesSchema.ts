import { z } from 'zod';
import { EducationsWithRelationsSchema, EducationsOptionalDefaultsWithRelationsSchema } from './EducationsSchema'
import type { EducationsWithRelations, EducationsOptionalDefaultsWithRelations } from './EducationsSchema'
import { SkillsWithRelationsSchema, SkillsOptionalDefaultsWithRelationsSchema } from './SkillsSchema'
import type { SkillsWithRelations, SkillsOptionalDefaultsWithRelations } from './SkillsSchema'
import { ExperiencesWithRelationsSchema, ExperiencesOptionalDefaultsWithRelationsSchema } from './ExperiencesSchema'
import type { ExperiencesWithRelations, ExperiencesOptionalDefaultsWithRelations } from './ExperiencesSchema'
import { UsersWithRelationsSchema, UsersOptionalDefaultsWithRelationsSchema } from './UsersSchema'
import type { UsersWithRelations, UsersOptionalDefaultsWithRelations } from './UsersSchema'
import {
	ImageEmployeeWithRelationsSchema,
	ImageEmployeeOptionalDefaultsWithRelationsSchema
} from './ImageEmployeeSchema'
import type { ImageEmployeeWithRelations, ImageEmployeeOptionalDefaultsWithRelations } from './ImageEmployeeSchema'

/////////////////////////////////////////
// EMPLOYEES SCHEMA
/////////////////////////////////////////

export const EmployeesSchema = z.object({
	id: z.string().uuid(),
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
	salary: z.number().min(0),
	userId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
})

export type Employees = z.infer<typeof EmployeesSchema>

/////////////////////////////////////////
// EMPLOYEES OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const EmployeesOptionalDefaultsSchema = EmployeesSchema.merge(z.object({
	id: z.string().uuid().optional(),
	statusEmployee: z.string().min(1).optional(),
	registration: z.boolean().optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
}))

export type EmployeesOptionalDefaults = z.infer<typeof EmployeesOptionalDefaultsSchema>

/////////////////////////////////////////
// EMPLOYEES RELATION SCHEMA
/////////////////////////////////////////

export type EmployeesRelations = {
	Educations: EducationsWithRelations[];
	Skills: SkillsWithRelations[];
	Experiences: ExperiencesWithRelations[];
	User: UsersWithRelations;
	ImageEmployee?: ImageEmployeeWithRelations | null;
};

export type EmployeesWithRelations = z.infer<typeof EmployeesSchema> & EmployeesRelations

export const EmployeesWithRelationsSchema: z.ZodType<EmployeesWithRelations> = EmployeesSchema.merge(z.object({
	Educations: z.lazy(() => EducationsWithRelationsSchema).array(),
	Skills: z.lazy(() => SkillsWithRelationsSchema).array(),
	Experiences: z.lazy(() => ExperiencesWithRelationsSchema).array(),
	User: z.lazy(() => UsersWithRelationsSchema),
	ImageEmployee: z.lazy(() => ImageEmployeeWithRelationsSchema).nullish(),
}))

/////////////////////////////////////////
// EMPLOYEES OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type EmployeesOptionalDefaultsRelations = {
	Educations: EducationsOptionalDefaultsWithRelations[];
	Skills: SkillsOptionalDefaultsWithRelations[];
	Experiences: ExperiencesOptionalDefaultsWithRelations[];
	User: UsersOptionalDefaultsWithRelations;
	ImageEmployee?: ImageEmployeeOptionalDefaultsWithRelations | null;
};

export type EmployeesOptionalDefaultsWithRelations =
	z.infer<typeof EmployeesOptionalDefaultsSchema>
	& EmployeesOptionalDefaultsRelations

export const EmployeesOptionalDefaultsWithRelationsSchema: z.ZodType<EmployeesOptionalDefaultsWithRelations> = EmployeesOptionalDefaultsSchema.merge(z.object({
	Educations: z.lazy(() => EducationsOptionalDefaultsWithRelationsSchema).array(),
	Skills: z.lazy(() => SkillsOptionalDefaultsWithRelationsSchema).array(),
	Experiences: z.lazy(() => ExperiencesOptionalDefaultsWithRelationsSchema).array(),
	User: z.lazy(() => UsersOptionalDefaultsWithRelationsSchema),
	ImageEmployee: z.lazy(() => ImageEmployeeOptionalDefaultsWithRelationsSchema).nullish(),
}))

export default EmployeesSchema;
