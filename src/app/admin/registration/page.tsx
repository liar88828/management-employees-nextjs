import React from 'react';
import { Search } from "lucide-react";
import Form from "next/form";
import { TContext } from "@/interface/server/param";
import { getContextQuery } from "@/utils/requestHelper";
import { EMPLOYEE_STATUS, EmployeeCompletePhoto, EmployeeCompletePhotoType } from "@/interface/enum";
import Link from "next/link";
import { employeeRegistrationPagination } from "@/server/action/employee.admin";
import { PaginationComponent } from "@/app/components/PaginationComponent";
import { RegistrationTable } from "@/app/admin/registration/components/RegistrationTable";

async function Page(context: TContext) {
    const search = await getContextQuery(context, 'search')
    const status = await getContextQuery(context, 'status') as EmployeeCompletePhotoType
    const page = Number(await getContextQuery(context, 'page')) || 1;
    const {
        totalPages,
        employees
    } = await employeeRegistrationPagination(search,
        [
            EMPLOYEE_STATUS.Registration,
            EMPLOYEE_STATUS.Registration_False,
            EMPLOYEE_STATUS.Interview,
            EMPLOYEE_STATUS.Interview_Reject,
        ],
        page, status)
    // const globalPageSize = 3; // You can adjust the page size
    // const totalEmployees = await prisma.employees.count({
    //     where: {
    //         User: { name: { contains: search } },
    //         status: EMPLOYEE_STATUS.Registration
    //     }
    // });
    //
    // const employees = await prisma.employees.findMany({
    //     where: {
    //         User: { name: { contains: search } },
    //         status: EMPLOYEE_STATUS.Registration
    //     },
    //     skip: ( page - 1 ) * globalPageSize,
    //     take: globalPageSize
    // });
    //
    // const totalPages = Math.ceil(totalEmployees / globalPageSize);
    return (
        <div className="space-y-2">
            <div className="flex gap-2 items-center">
                <Form
                    action={ `/admin/registration` }
                    className="join"
                >
                    <input type="search"
                           className={ 'input input-bordered join-item ' }
                           defaultValue={ search }
                           name={ 'search' }
                    />
                    <input type="hidden"
                           defaultValue={ status }
                           name={ 'status' }
                    />

                    <button className={ 'btn join-item ' }><Search /></button>
                </Form>

                <details className="dropdown">
                    <summary className="btn m-1">Select Status</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><Link
                            href={ `/admin/registration?search=${ search }&status=` }
                        >{ EmployeeCompletePhoto["Select All"] }</Link></li>
                        <li><Link
                            href={ `/admin/registration?search=${ search }&status=${ EmployeeCompletePhoto.Complete }` }
                        >{ EmployeeCompletePhoto.Complete }</Link></li>
                        <li><Link
                            href={ `/admin/registration?search=${ search }&status=${ EmployeeCompletePhoto["Not Completed"] }` }
                        >{ EmployeeCompletePhoto["Not Completed"] }</Link></li>
                        {/*{ employeeListStatus.map((item) => (*/ }
                        {/*    <li key={ item }>*/ }
                        {/*        <Link href={ `/admin/registration?search=${ search }&status=${ item }` }>{ item }</Link>*/ }
                        {/*    </li>*/ }
                        {/*)) }*/ }
                    </ul>
                </details>
            </div>
            {/*{JSON.stringify(employees)}*/ }
            <RegistrationTable employees={ employees } />
            <PaginationComponent
                page={ page }
                totalPages={ totalPages }
                search={ search }
                status={ status }
                title={ 'registration' }
            />
        </div>
    );
}

export default Page;
