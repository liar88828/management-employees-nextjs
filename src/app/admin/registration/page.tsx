import React from 'react';
import { TContext } from "@/interface/server/param";
import { getContextQuery } from "@/utils/toRequest";
import { EmployeeCompletePhotoType, STATUS_EMPLOYEE } from "@/interface/enum";
import { PaginationComponent } from "@/app/components/PaginationComponent";
import { RegistrationTable } from "@/app/admin/registration/components/RegistrationTable";
import RegistrationSearch from "@/app/admin/registration/components/registrationSearch";
import { employeeRegistrationPaginationLoader } from "@/server/action/register.action";

async function Page(context: TContext) {
    const search = await getContextQuery(context, 'search')
    const status = await getContextQuery(context, 'status') as EmployeeCompletePhotoType
    const page = Number(await getContextQuery(context, 'page')) || 1;
    const {
        totalPages,
        employees
    } = await employeeRegistrationPaginationLoader(search,
        [
            STATUS_EMPLOYEE.Registration,
            STATUS_EMPLOYEE.Registration_Reject,
            STATUS_EMPLOYEE.Interview,
            STATUS_EMPLOYEE.Interview_Reject,
        ],
        page, status)
    // const globalPageSize = 3; // You can adjust the currentPage size
    // const totalEmployees = await prisma.employees.count({
    //     where: {
    //         User: { userName: { contains: search } },
    //         status: STATUS_EMPLOYEE.Registration
    //     }
    // });
    //
    // const employees = await prisma.employees.findMany({
    //     where: {
    //         User: { userName: { contains: search } },
    //         status: STATUS_EMPLOYEE.Registration
    //     },
    //     skip: ( currentPage - 1 ) * globalPageSize,
    //     take: globalPageSize
    // });
    //
    // const totalPages = Math.ceil(totalEmployees / globalPageSize);
    return (
        <div className="space-y-2">
            <RegistrationSearch search={ search } status={ status } />
            {/*{JSON.stringify(employees)}*/ }
            <RegistrationTable employees={ employees } />
            <PaginationComponent
                currentPage={ page }
                totalPages={ totalPages }
                search={ search }
                status={ status }
                title={ 'registration' }
            />
        </div>
    );
}

export default Page;
