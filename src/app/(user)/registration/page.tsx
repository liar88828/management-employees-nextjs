import React from 'react';
import { redirect } from "next/navigation";
import { RegistrationFormClientUser } from "@/app/(user)/registration/registration.client";
import { getUserPage } from "@/secure/db";
import { getContextQuery } from "@/utils/toRequest";
import { TContext } from "@/interface/server/param";
import { employeeFindById } from "@/server/action/employee-admin.action";

export default async function Page(context: TContext) {
    const error = await getContextQuery(context, 'error')
    const type = await getContextQuery(context, 'type')
    const user = await getUserPage()

    // const position: Position[] = await prisma.positions.findMany()
    const employee = await employeeFindById({ userId: user.id })

    if (employee && employee.registration === true) {
        redirect('/home');
    }

    return ( <RegistrationFormClientUser
            employee={ employee }
            method={ employee ? "PUT" : 'POST' }
            user={ user }
            type={ type }
            error={ error }
        />
    );
}
