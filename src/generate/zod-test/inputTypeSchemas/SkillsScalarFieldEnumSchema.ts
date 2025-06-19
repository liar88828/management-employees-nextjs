import { z } from 'zod';

export const SkillsScalarFieldEnumSchema = z.enum([ 'id', 'text', 'employeeId' ]);

export default SkillsScalarFieldEnumSchema;
