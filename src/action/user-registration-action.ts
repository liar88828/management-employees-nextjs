'use server'
import { prisma } from "@/config/prisma";
import { ZodError } from "zod";
import { revalidatePath } from "next/cache";
import { saveImage, updateImage } from "@/action/upload.action";
import { RegistrationUserCreateClient } from "@/schema/registration-user-sanitizer";
import {
    RegistrationDatabaseCreateServer,
    registrationDatabaseCreateServer,
    RegistrationDatabaseUpdateServer,
    registrationDatabaseUpdateServer
} from "@/schema/registration-database-server";
import { STATUS_EMPLOYEE } from "@/interface/enum";
import { ErrorDatabase } from "@/utils/error/ErrorClass";

import { ResponseAction, TEmployeeDB } from "@/interface/model";

export async function employeeCreateUserAction({ img, ...data }: RegistrationUserCreateClient, userId: string):
    Promise<ResponseAction<RegistrationUserCreateClient>> {
    try {
        const isImage = typeof img === 'object'
        const imageFile = img[0]
        const imagePath = imageFile ? `/uploads/${ imageFile.name }` : null
        // if (!imagePath) {
        //     throw new Error('Image is required')
        // }

        const { userName, userPhone, educations, skills, ...employee } = registrationDatabaseCreateServer.parse({
            userName: data.name,
            userPhone: data.phone,
            userId,
            registration: false,
            salary: 0,
            notes: "",
            statusEmployee: STATUS_EMPLOYEE.Registration,
            hireDate: new Date(),
            img: imagePath ?? '/uploads/person_default.webp',
            skills: data.skills,
            educations: data.educations,
            dateOfBirth: new Date(data.dateOfBirth),
            workTime: data.workTime,
            city: data.city,
            address: data.address,
            gender: data.gender,
            jobTitle: data.jobTitle,
            postalCode: data.postalCode,
        } satisfies RegistrationDatabaseCreateServer)
        const response = await prisma.$transaction(async (tx) => {
            const foundUser = await tx.users.findUnique(
                {
                    where: { id: employee.userId }
                }
            );
            if (!foundUser) {
                throw new ErrorDatabase("User Is Not Found");
            }
            await tx.users.update(
                {
                    where: { id: employee.userId },
                    data: {
                        name: userName,
                        phone: userPhone,
                    }
                },
            );

            const employeeDB = await tx.employees.create({
                data: { ...employee }
            });

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
                employeeDB, skillDB,
                // languageDB,
                educationDB
            };
        })
        // console.log('response : ', response)
        if (response && isImage && imagePath) {
            const pathImage = await saveImage(imageFile, imagePath)
            console.log('saveImage : ', pathImage)
        }
        return {
            success: true,
            response: response,
            message: 'Successfully created',
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            throw error.message
        }
        return {
            message: 'Failed Create Data',
            success: false,
            errors: error,
        }
    }
}

export async function employeeUpdateUserAction(
    { img, ...data }:
    RegistrationUserCreateClient, employeeId: string, userId: string): Promise<ResponseAction<RegistrationUserCreateClient>> {
    try {
        const isImage = typeof img === 'object';
        const imageFile = img[0]
        const imagePath = imageFile ? `/uploads/${ imageFile.name }` : undefined
        const { userName, userPhone, educations, skills, ...employee } = registrationDatabaseUpdateServer.parse({
            userName: data.name,
            userPhone: data.phone,
            userId,
            img: imagePath,
            skills: data.skills,
            educations: data.educations,
            dateOfBirth: new Date(data.dateOfBirth),
            workTime: data.workTime,
            city: data.city,
            address: data.address,
            gender: data.gender,
            jobTitle: data.jobTitle,
            postalCode: data.postalCode,
        } satisfies RegistrationDatabaseUpdateServer)
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
                        name: userName,
                        phone: userPhone,
                    }
                },
            );

            const foundEmployee = await tx.employees.findFirst({ where: { userId: employee.userId } });
            if (!foundEmployee) {
                throw new Error("Is Not Found");
            }
            const employeeDB = await tx.employees.update({ where: { id: employeeId }, data: { ...employee } });
            await tx.skills.deleteMany({ where: { employeeId } })
            const skillDB = await tx.skills.createMany({
                data: skills.map(({ text }) => ( { employeeId, text } ))
            })

            // await tx.languages.deleteMany({ where: { employeesId: id } })
            // const languageDB = await tx.languages.createMany({
            //     prevData: languages.map(({ text }) => ( {
            //         employeesId: employeeDB.id, text,
            //     } ))
            // })

            await tx.educations.deleteMany({ where: { employeeId } })
            const educationDB = await tx.educations.createMany({
                data: educations.map(({ text }) => ( {
                    employeeId,
                    text
                } ))
            })
            return { employeeDB, skillDB, educationDB };
        })
        if (response && isImage && imagePath) {
            await updateImage(imageFile, imagePath)
        }
        return {
            response: response,
            success: true,
            message: "Successfully updated"
        }
    } catch (error) {

        if (error instanceof ZodError) {
            throw JSON.stringify(error.flatten().fieldErrors)
        }
        if (error instanceof Error) {
            // console.log(errors.message);
            throw error.message;
        }
        return {
            errors: error,
            success: false,
            message: 'Failed update employee',
        }
    }
}

export async function onUpsertDataUserAction(method: "POST" | "PUT", data: RegistrationUserCreateClient, userId: string, idEmployee?: string,):
    Promise<ResponseAction> {
    try {
        if (method === "POST") {
            // console.log('Execute Post')
            return employeeCreateUserAction(data, userId)
        } else if (method === "PUT" && idEmployee) {
            // console.log('Execute Put')
            return employeeUpdateUserAction(data, idEmployee, userId)
        }
        return {
            response: null,
            message: 'Something wrong',
            success: false
        }
    } catch (e) {
        // console.log(e.message)
        return {
            response: null,
            message: 'Something wrong',
            success: false
        }
    }
}

export async function registrationFinishedState({ userId }: { userId: string }): Promise<{
    message: string,
    success: boolean,
}> {
    const employeeDB = await prisma.employees.findUnique({
        where: { userId },
        select: {
            photoKtp: true,
            photoIjazah: true,
        }
    })
    if (!employeeDB) {
        return {
            message: 'Please Complete the Form',
            success: false,
        }
    }

    if (!employeeDB.photoKtp) {
        return {
            message: 'Please Complete the Photo KTP is Required',
            success: false,
        }
    }

    if (!employeeDB.photoIjazah) {
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
            User: {
                omit: {
                    password: true,
                    otp: true,
                    otpExpired: true,
                }
            },
            // languages: true,
            Skills: true,
            Educations: true,
        },
    });
}
