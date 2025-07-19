import { z } from 'zod';

export const EmployeesOrderByRelevanceFieldEnumSchema = z.enum(['id','gender','jobTitle','statusEmployee','address','city','postalCode','workTime','notes','userId']);

export default EmployeesOrderByRelevanceFieldEnumSchema;
