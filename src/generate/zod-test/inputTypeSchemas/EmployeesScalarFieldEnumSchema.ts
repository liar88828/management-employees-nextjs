import { z } from 'zod';

export const EmployeesScalarFieldEnumSchema = z.enum([ 'id', 'gender', 'dateOfBirth', 'hireDate', 'jobTitle', 'statusEmployee', 'registration', 'address', 'city', 'postalCode', 'workTime', 'notes', 'salary', 'userId', 'createdAt', 'updatedAt' ]);

export default EmployeesScalarFieldEnumSchema;
