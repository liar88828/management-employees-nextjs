import { prisma } from "@/config/prisma";
import { EmployeeCreateZodClient } from "@/validation/employee.valid";
import { EmployeeCreate, TEmployeeDB, TEmployeeSearch } from "@/interface/entity/employee.model";
import { ResponseAll, } from "@/interface/server/param";
import { InterfaceRepository, ParamsApi } from "@/interface/server/InterfaceRepository";
import { ErrorPrisma } from "@/utils/ErrorResponse";

export type EmployeeParams = ParamsApi<TEmployeeSearch>

// getAll data from database
export default class EmployeeRepository implements InterfaceRepository<EmployeeCreateZodClient> {

    async findAll({filter, pagination: {limit = 20, page = 1}}: Required<EmployeeParams>,
    ): Promise<ResponseAll<Omit<TEmployeeDB, 'status'> & { status: string }>> {
        const skip = (page - 1) * limit;
        const take = limit;
        const employees = await prisma.employees.findMany(
            {
                include: {
                    languages: true,
                    skills: true,
                    educations: true,
                },
                skip,
                take,
                where: {
                    AND: [
                        {
                            ...(filter.name ? {name: {contains: filter.name,}} : {}),
                            ...(filter.status ? {status: {contains: filter.status,}} : {}),
                        }
                    ],
                }
            }
        );
        return {data: employees, page, limit};
    }

    async findById({ userId, employeeId }: { employeeId?: string, userId?: string }): Promise<TEmployeeDB | null> {
        return prisma.employees.findUnique({
            where: { id: employeeId, userId: userId },
            include: {
                languages: true,
                skills: true,
                educations: true,
            },
        });
    }

    async findPhotoById(id: string) {
        return prisma.employees.findUnique({
            where: {id},
            include: {
                languages: true,
                skills: true,
            },
        });
    }

    async createOne({ skills, languages, educations, ...employees }: EmployeeCreate) {
        return prisma.$transaction(async (tx) => {

            const foundEmployee = await tx.employees.findUnique(
                {
                    select: { email: true },
                    where: { email: employees.email }
                }
            );
            if (foundEmployee) {
                throw new ErrorPrisma("Employee already exists", 404);
            }
            const employeeDB = await tx.employees.create({
                data: {...employees}
            });

            const skillDB = await tx.skills.createMany({
                data: skills.map(({text}) => ({
                    employeesId: employeeDB.id,
                    text,
                })),
            })

            const languageDB = await tx.languages.createMany({
                data: languages.map(({text}) => ({
                    employeesId: employeeDB.id,
                    text,
                }))
            })

            const educationDB = await tx.educations.createMany({
                data: educations.map(({ text }) => ({
                    employeesId: employeeDB.id,
                    text,
                }))
            })

            return { employeeDB, skillDB, languageDB, educationDB };
        })
    }

    async updateOne({ skills, languages, educations, ...employees }: EmployeeCreate, id: string) {

        return prisma.$transaction(async (tx) => {

            // await tx.certifications.deleteMany({ where: { employeesId: id } })
            // await tx.projects.deleteMany({ where: { employeesId: id } })

            const employeeDB = await tx.employees.update({
                where: {id},
                data: {...employees}
            });

            await tx.skills.deleteMany({ where: { employeesId: id } })
            const skillDB = await tx.skills.createMany({
                data: skills.map(({text}) => ({
                    employeesId: employeeDB.id,
                    text,
                })),
            })

            await tx.languages.deleteMany({ where: { employeesId: id } })
            const languageDB = await tx.languages.createMany({
                data: languages.map(({text}) => ({
                    employeesId: employeeDB.id,
                    text,
                }))
            })

            await tx.educations.deleteMany({ where: { employeesId: id } })
            const educationDB = await tx.educations.createMany({
                data: educations.map(({ text }) => ({
                    employeesId: employeeDB.id,
                    text,
                }))
            })

            //
            // const certificationsDB = await tx.certifications.createMany({
            // 	data: certifications.map(({ text }) => ({
            // 		employeesId: employeeDB.id,
            // 		text,
            // 	}))
            // })
            //
            // const projectDB = await tx.projects.createMany({
            // 	data: projects.map(({ text }) => ({
            // 		employeesId: employeeDB.id,
            // 		text
            // 	}))
            // })

            return { employeeDB, skillDB, languageDB, educationDB };
        })

    }

    async deleteOne(id: string) {
        return prisma.$transaction(async (tx) => {

            const employeeExist = await tx.employees.findUnique({where: {id}, select: {id: true}});
            if (!employeeExist) {
                throw new Error(`Employee by id ${id} is not exist `)
            }
            const employeeDB = await tx.employees.delete({where: {id}});
            const skillDB = await tx.skills.deleteMany({where: {employeesId: employeeDB.id}})
            const languageDB = await tx.languages.deleteMany({where: {employeesId: employeeDB.id}})
            const educationDB = await tx.educations.deleteMany({ where: { employeesId: employeeDB.id } })
            return { employeeDB, skillDB, languageDB, educationDB };
        })
    }

    async employeeFindAll({ filter, pagination: { limit = 20, page = 1 } }: Required<EmployeeParams>,
    ): Promise<ResponseAll<Omit<TEmployeeDB, 'status'> & { status: string }>> {
        const skip = (page - 1) * limit;
        const take = limit;
        const employees = await prisma.employees.findMany(
            {
                include: {
                    languages: true,
                    skills: true,
                    educations: true,
                },
                skip,
                take,
                where: {
                    AND: [
                        {
                            ...(filter.name ? { name: { contains: filter.name, } } : {}),
                            ...(filter.status ? { status: { contains: filter.status, } } : {}),
                        }
                    ],
                }
            }
        );
        return { data: employees, page, limit };
    }

    async createUserRepo({ skills, languages, educations, ...employees }: EmployeeCreate) {
        return prisma.$transaction(async (tx) => {
            const foundEmployee = await tx.employees.findUnique(
                {
                    select: { email: true },
                    where: { email: employees.email }
                }
            );
            if (foundEmployee) {
                throw new ErrorPrisma("Employee already exists", 404);
            }
            const employeeDB = await tx.employees.create({
                data: { ...employees }
            });

            const skillDB = await tx.skills.createMany({
                data: skills.map(({ text }) => ({
                    employeesId: employeeDB.id, text
                }))
            })
            const languageDB = await tx.languages.createMany({
                data: languages.map(({ text }) => ({
                    employeesId: employeeDB.id, text
                }))
            })
            const educationDB = await tx.educations.createMany({
                data: educations.map(({ text }) => ({
                    employeesId: employeeDB.id, text
                }))
            })
            return { employeeDB, skillDB, languageDB, educationDB };
        })
    }

    async updateUserRepo({ skills, languages, educations, ...employees }: EmployeeCreate, id: string) {
        return prisma.$transaction(async (tx) => {

            const foundEmployee = await tx.employees.findFirst({
                where: { userId: employees.userId }
            });
            if (!foundEmployee) {
                throw new ErrorPrisma("Is Not Found", 404);
            }
            const employeeDB = await tx.employees.update({
                where: { id }, data: { ...employees }
            });
            await tx.skills.deleteMany({ where: { employeesId: id } })
            const skillDB = await tx.skills.createMany({
                data: skills.map(({ text }) => ({
                    employeesId: employeeDB.id, text
                }))
            })
            await tx.languages.deleteMany({ where: { employeesId: id } })
            const languageDB = await tx.languages.createMany({
                data: languages.map(({ text }) => ({
                    employeesId: employeeDB.id, text,
                }))
            })
            await tx.educations.deleteMany({ where: { employeesId: id } })
            const educationDB = await tx.educations.createMany({
                data: educations.map(({ text }) => ({
                    employeesId: employeeDB.id, text
                }))
            })
            return { employeeDB, skillDB, languageDB, educationDB };
        })
    }
}



