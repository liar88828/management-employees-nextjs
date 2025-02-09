import { z } from "zod";
import { zImage } from "@/validation/image";
import { EmployeeCreate } from "@/interface/entity/employee.model";
import { zodAddress, zodEmail, zodPhone } from "@/validation/zod.valid";

// @ts-ignore
export const employeeCreateClient: z.ZodType<EmployeeCreate> = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
    email: zodEmail,
    phone: zodPhone,
    // gender: z.enum([ "Male", "Female" ]),
	gender: z.string(),
	dateOfBirth: z.coerce.date(),
	hireDate: z.coerce.date(),
	jobTitle: z.string().min(2, "Job Title must be at least 2 characters"),
	department: z.string(),
	salary: z.number().min(0, "Salary must be a positive number"),
	managerId: z.number().optional(),
	// status: z.enum([ "Active", "Inactive" ]),
	status: z.string().min(2, "Status must be a positive number"),
    address: zodAddress,
	city: z.string(),
	postalCode: z.string(),
	employmentType: z.enum([ "Full-Time", "Part-Time" ]),
	notes: z.string(),
	img: zImage,
	country: z.string(),
	education: z.string(),
	//
	skills: z.array(z.object({
		text: z.string().min(2, "Skills must be at least 2 characters"),
	})),

	languages: z.array(z.object({
		text: z.string().min(2, "Languages must be at least 2 characters"),
	})),

	certifications: z.array(z.object({
		text: z.string().min(2, "Certifications must be at least 2 characters"),
	})),

	projects: z.array(z.object({
		text: z.string().min(2, "Projects must be at least 2 characters"),
	})),
});

export const employeeCreateServer: z.ZodType<EmployeeCreate> = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
    phone: zodPhone,
	gender: z.string(),//[ "Male", "Female" ]
	dateOfBirth: z.coerce.date(),
	hireDate: z.coerce.date(),
	jobTitle: z.string().min(2, "Job Title must be at least 2 characters"),
	department: z.string(),
	salary: z.number().min(0, "Salary must be a positive number"),
	// status: z.enum(["Active", "Inactive"]),
    status: z.enum([ 'Fail', 'Complete', 'Pending', 'Active', 'Disabled' ]),
    // status: z.string(),
    address: zodAddress,
    city: z.string(),
	postalCode: z.string(),
	employmentType: z.string(),//[ "Full-Time", "Part-Time" ]
	notes: z.string(),
	img: z.string(),
	//
	country: z.string(),
	education: z.string(),
	//
	skills: z.array(z.object({
		text: z.string().min(2, "Skills must be at least 2 characters"),
	})),

	languages: z.array(z.object({
		text: z.string().min(2, "Languages must be at least 2 characters"),
	})),

	certifications: z.array(z.object({
		text: z.string().min(2, "Certifications must be at least 2 characters"),
	})),

	projects: z.array(z.object({
		text: z.string().min(2, "Projects must be at least 2 characters"),
	})),

});

export type EmployeeCreateZodClient = z.infer<typeof employeeCreateClient>;
export type EmployeeCreateZodServer = z.infer<typeof employeeCreateServer>;

