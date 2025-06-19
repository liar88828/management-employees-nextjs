'use server'
import { prisma } from "@/config/prisma";
import { STATUS_EMPLOYEES } from "@/interface/enum";
import { ResponseAction, TEmployeeDB, UserAuth, UserClient } from "@/interface/model";
import { RegistrationUserCreateClient } from "@/schema/registration-user-sanitizer";
import { ErrorDatabase } from "@/utils/error/ErrorClass";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { EmployeesModel } from "@/generate/zod";
import { EmployeesModelType } from "@/generate/zod/interface";
import { Prisma } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';


export async function _employeeCreateUserAction(
	{ educations, skills, ...employeeRaw }: RegistrationUserCreateClient,
	user: UserAuth
):
	Promise<ResponseAction<RegistrationUserCreateClient>> {
	try {
		const { ...employee } = EmployeesModel.parse({
			gender: employeeRaw.gender,
			registration: false,
			salary: 0,
			notes: "",
			statusEmployee: STATUS_EMPLOYEES.Registration,
			hireDate: new Date(),
			dateOfBirth: new Date(employeeRaw.dateOfBirth),
			workTime: employeeRaw.workTime,
			city: employeeRaw.city,
			address: employeeRaw.address,
			jobTitle: employeeRaw.jobTitle,
			postalCode: employeeRaw.postalCode,
			userId: user.id,
		} satisfies EmployeesModelType)

		const response = await prisma.$transaction(async (tx) => {
			const foundUser = await tx.users.findUnique({ where: { id: employee.userId } });
			if (!foundUser) {
				throw new ErrorDatabase("User Is Not Found");
			}
			await tx.users.update({
				where: { id: employee.userId },
				data: {
					name: employeeRaw.name,
					phone: employeeRaw.phone,
				}
			});

			const employeeDB = await tx.employees.create({ data: employee });

			const skillDB = await tx.skills.createMany({
				data: skills.map(({ text }) => ( {
					employeeId: employeeDB.id, text
				} ))
			})

			const educationDB = await tx.educations.createMany({
				data: educations.map(({ text }) => ( {
					employeeId: employeeDB.id, text
				} ))
			})
			return {
				employeeDB,
				skillDB,
				educationDB
			};
		})
		return {
			success: true,
			response: response,
			message: 'Successfully created',
		}
	} catch (error) {
		if (error instanceof ZodError) {
			return {
				message: "Zod Error",
				success: false,
				errors: JSON.stringify(error.flatten().fieldErrors)
			}
		}

		if (error instanceof Error) {
			console.log(error.message);
			return {
				message: "Error Data",
				success: false,
				errors: error.message
			}
		}
		return {
			message: 'Failed Create Data',
			success: false,
			errors: error,
		}
	}
}

export async function _employeeUpdateUserAction(
	{ skills, educations, ...employeeRaw }: RegistrationUserCreateClient,
	employeeId: string,
	user: UserClient
): Promise<ResponseAction<RegistrationUserCreateClient>> {

	try {
		const { ...employee } = EmployeesModel.parse({
			id: employeeId,
			gender: employeeRaw.gender,
			registration: false,
			salary: 0,
			notes: "",
			statusEmployee: STATUS_EMPLOYEES.Registration,
			hireDate: new Date(),
			dateOfBirth: new Date(employeeRaw.dateOfBirth),
			workTime: employeeRaw.workTime,
			city: employeeRaw.city,
			address: employeeRaw.address,
			jobTitle: employeeRaw.jobTitle,
			postalCode: employeeRaw.postalCode,
			userId: user.id,
		} satisfies EmployeesModelType)

		const response = await prisma.$transaction(async (tx) => {
			const foundUser = await tx.users.findUnique(
				{ where: { id: employee.userId } });
			if (!foundUser) {
				throw new Error("User Is Not Found");
			}
			await tx.users.update(
				{
					where: { id: employee.userId },
					data: {
						name: employeeRaw.name,
						phone: employeeRaw.phone,
					}
				},
			);

			const foundEmployee = await tx.employees.findFirst({ where: { userId: employee.userId } });
			if (!foundEmployee) {
				throw new Error("Is Not Found");
			}
			const employeeDB = await tx.employees.update({
				where: { id: employeeId },
				data: employee
			});
			await tx.skills.deleteMany({ where: { employeeId } })
			const skillDB = await tx.skills.createMany({
				data: skills.map(({ text }) => ( { employeeId, text } ))
			})

			await tx.educations.deleteMany({ where: { employeeId } })
			const educationDB = await tx.educations.createMany({
				data: educations.map(({ text }) => ( { employeeId, text } ))
			})

			return { employeeDB, skillDB, educationDB };
		})

		return {
			response: response,
			success: true,
			message: "Successfully updated"
		}
	} catch (error) {
		if (error instanceof ZodError) {
			return {
				message: "Zod Error",
				success: false,
				errors: JSON.stringify(error.flatten().fieldErrors)
			}
		}
		if (error instanceof Error) {
			return {
				message: "Error",
				success: false,
				errors: error.message
			}
		}
		return {
			errors: error,
			success: false,
			message: 'Failed update employee',
		}
	}
}

export async function employeeUpsertUserAction(
	{ skills, educations, experiences, ...employeeRaw }: RegistrationUserCreateClient,
	user: UserClient,
	employeeId?: string,
): Promise<ResponseAction<RegistrationUserCreateClient>> {

	try {
		const { ...employee } = EmployeesModel.parse({
			id: employeeId,
			gender: employeeRaw.gender,
			registration: false,
			salary: 0,
			notes: "",
			statusEmployee: STATUS_EMPLOYEES.Registration,
			hireDate: new Date(),
			dateOfBirth: new Date(employeeRaw.dateOfBirth),
			workTime: employeeRaw.workTime,
			city: employeeRaw.city,
			address: employeeRaw.address,
			jobTitle: employeeRaw.jobTitle,
			postalCode: employeeRaw.postalCode,
			userId: user.id,
		} satisfies EmployeesModelType)

		const response = await prisma.$transaction(async (tx) => {
			const foundUser = await tx.users.findUnique(
				{ where: { id: employee.userId } });
			if (!foundUser) {
				throw new Error("User Is Not Found");
			}
			await tx.users.update(
				{
					where: { id: employee.userId },
					data: {
						name: employeeRaw.name,
						phone: employeeRaw.phone,
					}
				},
			);
			console.log('execute employees.upsert')

			const employeeDB = await tx.employees.upsert({
				where: { id: employeeId ?? uuidv4() },
				create: employee,
				update: employee
			});

			if (employeeId) {
				console.log('execute deleteMany')
				await tx.skills.deleteMany({ where: { employeeId } })
				await tx.educations.deleteMany({ where: { employeeId } })
				await tx.experiences.deleteMany({ where: { employeeId } })
			}
			console.log('execute skills.createMany')

			const skillDB = await tx.skills.createMany({
				data: skills.map(({ text }) => ( {
					employeeId: employeeDB.id,
					text
				} ))
			})

			console.log('execute educations.createMany')
			const educationDB = await tx.educations.createMany({
				data: educations.map(({ text }) => ( {
					employeeId: employeeDB.id,
					text
				} ))
			})

			console.log('execute experiences.createMany')
			const experiencesDB = await tx.experiences.createMany({
				data: experiences.map(({ text }) => ( {
					employeeId: employeeDB.id, text
				} ))
			})

			return { employeeDB, skillDB, educationDB, experiencesDB };
		})

		return {
			response: response,
			success: true,
			message: "Successfully updated"
		}
	} catch (error) {
		if (error instanceof ZodError) {
			return {
				message: "Zod Error",
				success: false,
				errors: JSON.stringify(error.flatten().fieldErrors)
			}
		}
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return {
				message: "Something Database Error ",
				success: false,
				errors: error.message
			}
		}

		if (error instanceof Error) {
			console.log(error)
			return {
				message: "Something Error ",
				success: false,
				errors: error.message
			}
		}
		return {
			errors: error,
			success: false,
			message: 'Failed update employee',
		}
	}
}

// export async function onUpsertDataUserAction(method: "POST" | "PUT", data: RegistrationUserCreateClient, user: UserAuth, idEmployee?: string,):
// 	Promise<ResponseAction> {
//
// 	return employeeUpsertUserAction(data, user, idEmployee,)
//
// }

export async function registrationFinishedState({ userId }: { userId: string }): Promise<{
	message: string,
	success: boolean,
}> {
	const employeeDB = await prisma.employees.findUnique({
		where: { userId },
		select: {
			ImageEmployee: true
		}
	})
	if (!employeeDB || !employeeDB.ImageEmployee) {
		return {
			message: 'Please Complete the Form',
			success: false,
		}
	}

	if (!employeeDB.ImageEmployee.photoKtp) {
		return {
			message: 'Please Complete the Photo KTP is Required',
			success: false,
		}
	}

	if (!employeeDB.ImageEmployee.photoIjazah) {
		return {
			message: 'Please Complete the Photo Ijazah is Required',
			success: false,
		}
	}

	await prisma.employees.update({
		where: { userId },
		data: { registration: true }
	})
	revalidatePath("/");

	return {
		message: 'Success Registration',
		success: true,
	}
}

export async function userEmployeeDetailLoader(
	{ userId, }: { userId?: string }
): Promise<TEmployeeDB | null> {
	return prisma.employees.findUnique({
		where: { userId },
		include: {
			ImageEmployee: true,
			User: {
				omit: {
					password: true,
					otp: true,
					otpExpired: true,
				}
			},
			// languages: true,
			Skills: true,
			Experiences: true,
			Educations: true,
		},
	});
}
