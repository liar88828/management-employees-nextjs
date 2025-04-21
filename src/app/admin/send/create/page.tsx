import React from 'react';
import { EmployeesSendTable, SendFormStore } from "@/app/admin/send/send.client";
import { prisma } from "@/config/prisma";
import { getContextQuery } from "@/utils/requestHelper";
import { TContext } from "@/interface/server/param";
import { Departements } from ".prisma/client";
import { employeeFindLatter } from "@/server/action/employee.client";
import { EmployeeCompletePhotoType } from "@/interface/enum";

async function Page(context: TContext) {
    const name = await getContextQuery(context, 'name')
    const department = await getContextQuery(context, 'department')
    const complete = await getContextQuery(context, 'complete') as EmployeeCompletePhotoType

    const departments: Departements[] = await prisma.departements.findMany()
    const employees = await employeeFindLatter(name, department, complete)

    return ( <>
            <SendFormStore />
            <EmployeesSendTable
                employees={ employees }
                departments={ departments }
            />
        </>
    );
}

export default Page;
