import { NextResponse } from "next/server";
import { prisma } from "@/config/prisma";
import { faker } from '@faker-js/faker/locale/id_ID';
import { ROLE, StatusEmployeeList } from "@/interface/enum";
import { constantGender, constantWorkTime } from "@/assets/constant";
import { toArrayRange } from "@/utils/toArray";

export async function GET() {
    return NextResponse.json({ message: 'test success' })
}
export async function POST() {
    console.log('Seeding test response...');

    try {
        for (let _ of toArrayRange(100)) {
            await prisma.$transaction(async (tx) => {
                const userDB = await tx.users.create({
                    data: {
                        password: faker.internet.password({ length: 10 }),
                        email: faker.internet.email(),
                        name: faker.person.fullName(),
                        phone: faker.phone.number(),
                        status: 'COMPLETED',
                        role: ROLE.USER,
                    },
                });
                console.log(userDB, 'userDB');
                // const position: string[] = await tx.positions.findMany({}).then(response => response.map(item => item.position))
                const employeeDB = await tx.employees.create({
                    data: {
                        address: faker.location.streetAddress(),
                        status: faker.helpers.arrayElement(StatusEmployeeList),
                        img: faker.image.avatar(),
                        city: faker.location.city(),
                        jobTitle: faker.person.jobTitle(),
                        gender: faker.helpers.arrayElement(constantGender),
                        notes: faker.person.jobDescriptor(),
                        postalCode: faker.location.zipCode(),
                        hireDate: faker.date.past({ years: 5 }),
                        dateOfBirth: faker.date.birthdate(),
                        salary: faker.number.int({ max: 1_000_000 }),
                        registration: faker.datatype.boolean(),
                        sendEmail: faker.number.int({ max: 1_000_000 }),
                        userId: userDB.id,
                        // photo3x4: null,
                        photoKtp: null,
                        photoIjazah: null,
                        workTime: faker.helpers.arrayElement(constantWorkTime),
                        // position: faker.helpers.arrayElement(position),
                    },
                });
                console.log(employeeDB, 'employeeDB')
                await tx.skills.create({
                    data: {
                        text: faker.person.jobType(),
                        employeesId: employeeDB.id,
                    },
                });

                await tx.educations.create({
                    data: {
                        text: faker.company.name(),
                        employeesId: employeeDB.id,
                    },
                });

            });
        }

        return NextResponse.json({ message: 'Test response seeded successfully' });

    } catch (error) {
        console.log('Error seeding response:', error);
        return NextResponse.json({
            message: 'Failed to seed response',
            error: error instanceof Error ? error.stack : String(error),
        }, { status: 500 });
    }
}
