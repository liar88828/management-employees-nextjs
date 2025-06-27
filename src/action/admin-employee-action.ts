'use server'

import { globalPageSize, url_fastapi } from "@/config/nextPublicBaseUrl";
import { prisma } from "@/config/prisma";
import { ROLE } from "@/interface/enum";
import { EmployeeUserClient, EmployeeUserPhotoClient, ResponseAction, TEmployeeDB } from "@/interface/model";
import { deleteImage, ResponseUploadEncrypt } from "@/action/upload.action";


export async function updateStatus(employee: EmployeeUserPhotoClient, status?: string): Promise<ResponseAction> {
	const findEmployee = await prisma.employees.findUnique({
		where: { id: employee.id },
	})
// console.log(statusEmployee)
	if (!findEmployee || !status) {
		return {
			success: false,
			message: "Failed to update statusEmployee",
		}
	}

	const data = await prisma.employees.update({
		where: { id: employee.id },
		data: {
			statusEmployee: status,
			registration: ![
				"Registration",
				"Reject",
			].includes(status)

		}
	})

	return {
		response: data,
		success: true,
		message: 'Successfully updated statusEmployee'

	}

}

export const adminEmployeePageLoader = async (name: string, status: string, page: number) => {
	// console.log({ name, statusEmployee, page })
	// const globalPageSize = 3; // You can adjust the currentPage size

	const totalEmployees = await prisma.employees.count({
		where: {
			statusEmployee: { contains: status },
			User: {
				name: { contains: name },
				role: ROLE.USER,
			}
		}
	});

	const employees = await prisma.employees.findMany({
		where: {
			statusEmployee: { contains: status },
			User: {
				name: { contains: name },
				role: ROLE.USER,
			},
		},
		skip: ( page - 1 ) * globalPageSize,
		take: globalPageSize,
		include: {
			User: {
				omit: {
					password: true,
					otp: true,
					otpExpired: true,
				}
			}
		}
	}).then((item): EmployeeUserClient[] => {
		return item
		.map((i) => {
			if (i && i.User) return { ...i, User: i.User }
			return null
		})
		.filter((i) => i !== null)
	})

	const totalPages = Math.ceil(totalEmployees / globalPageSize);

	return { totalPages, employees }
}

export async function adminEmployeeDetailLoader(
	{ employeeId }: { employeeId: string }
): Promise<TEmployeeDB | null> {
	return prisma.employees.findUnique({
		where: { id: employeeId },
		include: {
			ImageEmployee: true,
			User: {
				omit: {
					password: true,
					otp: true,
					otpExpired: true,
				}
			},
			Skills: true,
			Experiences: true,
			Educations: true,
		},
	});
}

export async function deleteEmployee({ id, ImageEmployee }: TEmployeeDB): Promise<ResponseAction> {
	try {

		const response = await fetch(`${ url_fastapi }/images/`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				photoIjazah: ImageEmployee?.photoIjazah?.replace('/images', '') || null,
				photoKtp: ImageEmployee?.photoKtp?.replace('/images', '') || null,
			}),
		});

		const data: ResponseUploadEncrypt = await response.json()

		console.log(data, 'from api ')
		if (!data.success) {
			// throw new Error(`Error uploading file: ${ typeFile } : ${ data.detail }`)
			return {
				message: `Error : ${ data.detail }`,
				success: false
			}
		}

		await prisma.$transaction(async (tx) => {

			// Delete related records first
			await tx.imageEmployee.deleteMany({
				where: { employeeId: id },
			});
			console.log("delete database imageEmployee");

			await tx.skills.deleteMany({
				where: { employeeId: id },
			});
			console.log("delete database skills");

			await tx.experiences.deleteMany({
				where: { employeeId: id },
			});
			console.log("delete database experiences");

			await tx.educations.deleteMany({
				where: { employeeId: id },
			});
			console.log("delete database educations");

			const employeeDB = await tx.employees.delete({
				where: { id }
			});
			console.log("delete database educations");

			await tx.users.delete({
				where: { id: employeeDB.userId },
			});
			console.log("delete database");
		})

		await deleteImage(ImageEmployee?.photoProfile)
		console.log("delete local next js");

		return {
			success: true,
			message: 'Employee and related data successfully deleted',
		};
	} catch (error) {
		console.error('Error deleting employee and related data:', error);
		return {
			success: false,
			message: 'Failed to delete employee',
		};
	}
}
