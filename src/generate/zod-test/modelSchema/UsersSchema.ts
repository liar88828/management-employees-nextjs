import { z } from 'zod';
import type { EmployeesOptionalDefaultsWithRelations, EmployeesWithRelations } from './EmployeesSchema'
import { EmployeesOptionalDefaultsWithRelationsSchema, EmployeesWithRelationsSchema } from './EmployeesSchema'

/////////////////////////////////////////
// USERS SCHEMA
/////////////////////////////////////////

export const UsersSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	phone: z.string(),
	email: z.string().email(),
	password: z.string(),
	role: z.string(),
	otp: z.string().nullish(),
	otpExpired: z.date(),
	imgPass: z.string(),
	statusUser: z.string(),
})

export type Users = z.infer<typeof UsersSchema>

/////////////////////////////////////////
// USERS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const UsersOptionalDefaultsSchema = UsersSchema.merge(z.object({
	id: z.string().uuid().optional(),
	otpExpired: z.date().optional(),
	statusUser: z.string().optional(),
}))

export type UsersOptionalDefaults = z.infer<typeof UsersOptionalDefaultsSchema>

/////////////////////////////////////////
// USERS RELATION SCHEMA
/////////////////////////////////////////

export type UsersRelations = {
	Employees?: EmployeesWithRelations | null;
};

export type UsersWithRelations = z.infer<typeof UsersSchema> & UsersRelations

export const UsersWithRelationsSchema: z.ZodType<UsersWithRelations> = UsersSchema.merge(z.object({
	Employees: z.lazy(() => EmployeesWithRelationsSchema).nullish(),
}))

/////////////////////////////////////////
// USERS OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type UsersOptionalDefaultsRelations = {
	Employees?: EmployeesOptionalDefaultsWithRelations | null;
};

export type UsersOptionalDefaultsWithRelations =
	z.infer<typeof UsersOptionalDefaultsSchema>
	& UsersOptionalDefaultsRelations

export const UsersOptionalDefaultsWithRelationsSchema: z.ZodType<UsersOptionalDefaultsWithRelations> = UsersOptionalDefaultsSchema.merge(z.object({
	Employees: z.lazy(() => EmployeesOptionalDefaultsWithRelationsSchema).nullish(),
}))

export default UsersSchema;
