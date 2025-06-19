import { z } from 'zod';

export const ImageEmployeeScalarFieldEnumSchema = z.enum([ 'id', 'photoProfile', 'photoSignature', 'photoKtp', 'photoIjazah', 'employeeId' ]);

export default ImageEmployeeScalarFieldEnumSchema;
