import React from "react";
import InterviewSearch from "@/app/admin/interview/components/interviewSearch";
import { TContext } from "@/interface/server/param";
import { getContextQuery } from "@/utils/toRequest";
import { STATUS_EMPLOYEE } from "@/interface/enum";
import { PaginationComponent } from "@/app/components/PaginationComponent";
import { InterviewTable } from "@/app/admin/interview/components/interviewTable";
import { employeeInterviewLoader } from "@/server/action/interview.action";

async function Page(context: TContext) {
    const search = await getContextQuery(context, 'search')
    const statusEmployee = await getContextQuery(context, 'status')
    // const positionEmployee = await getContextQuery(context, 'position')
    const page = Number(await getContextQuery(context, 'page')) || 1;
    // const positions = await prisma.positions.findMany()
    const {
        totalPages,
        employees
    } = await employeeInterviewLoader(
        search,
        STATUS_EMPLOYEE.Interview,
        page,
        // positionEmployee
    )
    // console.log(employees);

    return (
        <div className="space-y-2">
            <InterviewSearch
                search={ search }
                // positions={ positions }
                // position={ positionEmployee }
            />
            <InterviewTable employees={ employees } />
            <PaginationComponent
                currentPage={ page }
                totalPages={ totalPages }
                search={ search }
                status={ statusEmployee }
                title={ 'interview' }
            />
        </div>
    );
}

export default Page;
