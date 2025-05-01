import React from "react";
import { TContext } from "@/interface/server/param";
import { getContextQuery } from "@/utils/requestHelper";
import { STATUS_EMPLOYEE } from "@/interface/enum";
import { employeePaginationLoader } from "@/server/action/employee-admin.action";
import { prisma } from "@/config/prisma";
import { PaginationComponent } from "@/app/components/PaginationComponent";
import { InterviewTable } from "@/app/admin/interview/components/interviewTable";
import InterviewSearch from "@/app/admin/interview/components/interviewSearch";

async function Page(context: TContext) {
    const search = await getContextQuery(context, 'search')
    const status = await getContextQuery(context, 'status')
    const position = await getContextQuery(context, 'position')
    const page = Number(await getContextQuery(context, 'page')) || 1;
    const positions = await prisma.positions.findMany()
    const { totalPages, employees } = await employeePaginationLoader(search, STATUS_EMPLOYEE.Interview, page)
    // console.log(employees);

    return (
        <div className="space-y-2">
            <InterviewSearch
                search={ search }
                positions={ positions }
                position={ position }
            />
            <InterviewTable employees={ employees } />
            <PaginationComponent
                page={ page }
                totalPages={ totalPages }
                search={ search }
                status={ status }
                title={ 'interview' }
            />
        </div>
    );
}

export default Page;
