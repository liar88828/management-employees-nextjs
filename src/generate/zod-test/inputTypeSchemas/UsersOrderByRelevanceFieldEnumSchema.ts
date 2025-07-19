import { z } from 'zod';

export const UsersOrderByRelevanceFieldEnumSchema = z.enum(['id','name','phone','email','password','role','otp','imgPass','statusUser']);

export default UsersOrderByRelevanceFieldEnumSchema;
