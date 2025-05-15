import {
    RegistrationUpdateServerUser,
    RegistrationUserCreateServer
} from "@/app/(user)/registration/registration-user-sanitizer";
import { prisma } from "@/config/prisma";
import { ErrorDatabase } from "@/utils/error/ErrorClass";

export async function createUserRepo(
    {
        skills,
        educations,
        name,
        phone,
        ...employee
    }: RegistrationUserCreateServer
) {
    // console.log(employee)
    return prisma.$transaction(async (tx) => {
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
                    name: name,
                    phone: phone,
                }
            },
        );

        const employeeDB = await tx.employees.create({
            data: { ...employee }
        });

        const skillDB = await tx.skills.createMany({
            data: skills.map(({ text }) => ( {
                employeesId: employeeDB.id, text
            } ))
        })

        const educationDB = await tx.educations.createMany({
            data: educations.map(({ text }) => ( {
                employeesId: employeeDB.id, text
            } ))
        })
        return {
            employeeDB, skillDB,
            // languageDB,
            educationDB
        };
    })
}
export async function updateUserRepo(
    {
        skills,
        educations,
        name,
        phone,
        ...employee
    }: RegistrationUpdateServerUser,
    id: string,
) {
    return prisma.$transaction(async (tx) => {
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
                    name: name,
                    phone: phone,
                }
            },
        );

        const foundEmployee = await tx.employees.findFirst({
            where: { userId: employee.userId }
        });
        if (!foundEmployee) {
            // 404
            throw new ErrorDatabase("Is Not Found");
        }
        const employeeDB = await tx.employees.update({
            where: { id }, data: { ...employee }
        });
        await tx.skills.deleteMany({ where: { employeesId: id } })
        const skillDB = await tx.skills.createMany({
            data: skills.map(({ text }) => ( {
                employeesId: employeeDB.id, text
            } ))
        })

        // await tx.languages.deleteMany({ where: { employeesId: id } })
        // const languageDB = await tx.languages.createMany({
        //     prevData: languages.map(({ text }) => ( {
        //         employeesId: employeeDB.id, text,
        //     } ))
        // })

        await tx.educations.deleteMany({ where: { employeesId: id } })
        const educationDB = await tx.educations.createMany({
            data: educations.map(({ text }) => ( {
                employeesId: employeeDB.id, text
            } ))
        })
        return {
            employeeDB, skillDB,
            // languageDB,
            educationDB
        };
    })
}
