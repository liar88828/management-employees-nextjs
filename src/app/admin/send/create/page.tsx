import React from 'react';
import { prisma } from "@/config/prisma";
import { getContextQuery } from "@/utils/toRequest";
import { TContext } from "@/interface/server/param";
import { Positions } from ".prisma/client";
import { EmployeeCompletePhotoType } from "@/interface/enum";
import { SendFormTableEmployees } from "@/app/admin/send/components/sendFormTableEmployees";
import { SendFormStore } from "@/app/admin/send/components/sendFormStore";
import { sendEmployeeFindLoader } from "@/server/action/send.action";

async function Page(context: TContext) {
    const name = await getContextQuery(context, 'name')
    const position = await getContextQuery(context, 'position')
    const complete = await getContextQuery(context, 'complete') as EmployeeCompletePhotoType
    const positions: Positions[] = await prisma.positions.findMany()
    const employees = await sendEmployeeFindLoader(name, position, complete)
    // console.log(employees)
    return ( <>
            <SendFormStore>
                <SendFormTableEmployees
                    employees={ employees }
                    positions={ positions }
                />
            </SendFormStore>


        </>
    );
}

export default Page;
