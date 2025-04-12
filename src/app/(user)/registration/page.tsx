import React from 'react';
import { redirect } from "next/navigation";
import { getEmployeeById } from "@/server/controller/employee.controller";
import { prisma } from "@/config/prisma";
import { Departements } from ".prisma/client";
import { EmployeeFormClientUser } from "@/app/components/registration/registration.client";
import { getUser } from "@/secure/db";
import { UploadDocument } from "@/app/components/employee/client/upload-document";
import { revalidatePath } from "next/cache";
import { getContextQuery } from "@/utils/requestHelper";
import { TContext } from "@/interface/server/param";
import { RegistrationError } from "@/app/components/error/registrationFirst";

async function Page(context: TContext) {
    const error = await getContextQuery(context, 'error')
    const type = await getContextQuery(context, 'type')
    const user = await getUser()
    if (!user) {
        redirect('/login');
    }

    const employee = await getEmployeeById({ userId: user.id })
    // console.log(employee)
    if (employee && employee.registration === true) {
        redirect('/home');
    }

    const departments: Departements[] = await prisma.departements.findMany()

    async function registrationFinished({ userId }: { userId: string }) {
        'use server'
        const employeeDB = await prisma.employees.findUnique({
            where: { userId },
            select: {
                photoKtp: true,
                photoIjasah: true,
                photo3x4: true,
            }
        })
        if (!employeeDB) {
            redirect('/registration?error=Please complete the employee&type=form')
        }
        if (!employeeDB.photoKtp) {
            redirect('/registration?error=Please complete the photo Ktp&type=ktp')
        }
        if (!employeeDB.photoIjasah) {
            redirect('/registration?error=Please complete the photo Ijazah&type=ijazah')
        }
        if (!employeeDB.photo3x4) {
            redirect('/registration?error=Please complete the photo 3x4&type=3x4')
        }
        await prisma.employees.update({
            where: { userId },
            data: { registration: true }
        })
        revalidatePath("/");

    }

    const actionRegistrationFinished = registrationFinished.bind(null, { userId: user.id })
    return (
        <div className="flex flex-col gap-5">
            { error && type === 'form' && <RegistrationError error={ error }/> }
        <EmployeeFormClientUser
            user={user}
            employee={employee}
            departments={ departments }
            method={ employee ? "PUT" : 'POST' }
        />
            { employee && (
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                    <div className="">
                        { error && type === 'ktp' && <RegistrationError error={ error }/> }
                        <UploadDocument
                            employee={ employee }
                            type={ 'KTP' }
                        />
                    </div>
                    <div className="">
                        { error && type === '3x4' && <RegistrationError error={ error }/> }
                        <UploadDocument
                            employee={ employee }
                            type={ '3x4' }
                        />
                    </div>
                    <div className="">
                        { error && type === 'ijazah' && <RegistrationError error={ error }/> }
                        <UploadDocument
                            employee={ employee }
                            type={ 'ijazah' }
                        />
                    </div>
                </div>
            ) }
            <form action={ actionRegistrationFinished }>
                <button
                    className={ 'btn btn-success btn-block' }>Finish
                </button>
            </form>
        </div>

    );
}

export default Page;