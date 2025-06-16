import { Educations, Employees, ImageEmployee, Skills, Users } from "@prisma/client";


export type UserDB = Omit<Users, "password">
export type UserClient = Omit<Users, 'password' | 'otp' | 'otpExpired'>;
export const imageDefault = 'https://dummyimage.com/300x300/000/ffffff.jpg';
export const photoKtp = 'https://dummyimage.com/400x300/000/ffffff.jpg';
export const photoIjazah = 'https://dummyimage.com/297x210/000/ffffff.jpg';
export type EmployeeUserClient = Employees & { User: UserClient }

export type EmployeeUserPhotoClient = Employees & {
	User: UserClient
	ImageEmployee: ImageEmployee | null
}
export type TEmployeeDB = EmployeeUserPhotoClient & {
	statusEmployee: string | 'UnRegister' | 'Register' | 'Interview' | 'Accept' | 'Reject';
	Skills: Skills[];
	Educations: Educations[];
	createdAt: Date;
	updatedAt: Date;
}

export type ResponseAction<P = any, E = any> = {
	// prevData?: P,
	errors?: E,
	response?: any,
	success: boolean,
	message: string,
}
