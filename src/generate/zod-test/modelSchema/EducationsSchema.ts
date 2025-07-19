import { z } from 'zod';
import { EmployeesWithRelationsSchema, EmployeesOptionalDefaultsWithRelationsSchema } from './EmployeesSchema'
import type { EmployeesWithRelations, EmployeesOptionalDefaultsWithRelations } from './EmployeesSchema'

/////////////////////////////////////////
// EDUCATIONS SCHEMA
/////////////////////////////////////////

export const EducationsSchema = z.object({
  id: z.number().int(),
  text: z.string().min(1),
  employeeId: z.string().min(1),
})

export type Educations = z.infer<typeof EducationsSchema>

/////////////////////////////////////////
// EDUCATIONS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const EducationsOptionalDefaultsSchema = EducationsSchema.merge(z.object({
  id: z.number().int().optional(),
}))

export type EducationsOptionalDefaults = z.infer<typeof EducationsOptionalDefaultsSchema>

/////////////////////////////////////////
// EDUCATIONS RELATION SCHEMA
/////////////////////////////////////////

export type EducationsRelations = {
  Employees: EmployeesWithRelations;
};

export type EducationsWithRelations = z.infer<typeof EducationsSchema> & EducationsRelations

export const EducationsWithRelationsSchema: z.ZodType<EducationsWithRelations> = EducationsSchema.merge(z.object({
  Employees: z.lazy(() => EmployeesWithRelationsSchema),
}))

/////////////////////////////////////////
// EDUCATIONS OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type EducationsOptionalDefaultsRelations = {
  Employees: EmployeesOptionalDefaultsWithRelations;
};

export type EducationsOptionalDefaultsWithRelations = z.infer<typeof EducationsOptionalDefaultsSchema> & EducationsOptionalDefaultsRelations

export const EducationsOptionalDefaultsWithRelationsSchema: z.ZodType<EducationsOptionalDefaultsWithRelations> = EducationsOptionalDefaultsSchema.merge(z.object({
  Employees: z.lazy(() => EmployeesOptionalDefaultsWithRelationsSchema),
}))

export default EducationsSchema;
