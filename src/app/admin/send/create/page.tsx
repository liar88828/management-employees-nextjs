import React from 'react';
import { prisma } from "@/config/prisma";
import { getContextQuery } from "@/utils/requestHelper";
import { TContext } from "@/interface/server/param";
import { Departements } from ".prisma/client";
import { employeeFindLatter } from "@/server/action/employee.client";
import { EmployeeCompletePhotoType } from "@/interface/enum";
import { SendTableEmployees } from "@/app/admin/send/components/sendTableEmployees";
import { SendFormStore } from "@/app/admin/send/components/sendFormStore";

async function Page(context: TContext) {
    const name = await getContextQuery(context, 'name')
    const department = await getContextQuery(context, 'department')
    const complete = await getContextQuery(context, 'complete') as EmployeeCompletePhotoType

    const departments: Departements[] = await prisma.departements.findMany()
    const employees = await employeeFindLatter(name, department, complete)

    return ( <>
            <SendFormStore />
            <SendTableEmployees
                employees={ employees }
                departments={ departments }
            />
        </>
    );
}

export default Page;
