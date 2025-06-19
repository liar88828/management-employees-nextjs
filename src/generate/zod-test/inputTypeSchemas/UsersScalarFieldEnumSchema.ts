import { z } from 'zod';

export const UsersScalarFieldEnumSchema = z.enum([ 'id', 'name', 'phone', 'email', 'password', 'role', 'otp', 'otpExpired', 'imgPass', 'statusEmployee' ]);

export default UsersScalarFieldEnumSchema;
