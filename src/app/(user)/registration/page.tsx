import React from 'react';
import { redirect } from "next/navigation";
import { employeeFindById } from "@/server/controller/employee.controller";
import { prisma } from "@/config/prisma";
import { Departements } from ".prisma/client";
import { EmployeeFormClientUser } from "@/app/(user)/registration/components/registration.client";
import { getUserPage } from "@/secure/db";
import { getContextQuery } from "@/utils/requestHelper";
import { TContext } from "@/interface/server/param";
import { RegistrationError } from "@/app/components/error/registrationFirst";
import { EmployeeImageForm } from "@/app/(user)/registration/components/employeeImageForm";
import { registrationFinishedAction } from "@/server/action/employee.client";

export default async function Page(context: TContext) {
    const error = await getContextQuery(context, 'error')
    const type = await getContextQuery(context, 'type')
    const user = await getUserPage()

    const departments: Departements[] = await prisma.departements.findMany()
    const employee = await employeeFindById({ userId: user.id })

    if (employee && employee.registration === true) {
        redirect('/home');
    }

    const actionRegistrationFinished = registrationFinishedAction.bind(null, { userId: user.id })
    return (
        <div className="flex flex-col gap-5">
            { error && type === 'form' && <RegistrationError error={ error } /> }
            <EmployeeFormClientUser
                employee={ employee }
                // departments={ departments }
                method={ employee ? "PUT" : 'POST' }
                user={ user }
            />
            <EmployeeImageForm
                employee={ employee }
                error={ error }
                type={ type }
            />
            <form action={ actionRegistrationFinished }>
                <button className={ 'btn btn-success btn-block' }>
                    Finish
                </button>
            </form>
        </div>

    );
}
