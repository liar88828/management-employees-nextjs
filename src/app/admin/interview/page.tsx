import Link from "next/link";
import React from "react";
import Form from "next/form";
import { Search } from "lucide-react";
import { TContext } from "@/interface/server/param";
import { getContextQuery } from "@/utils/requestHelper";
import { EMPLOYEE_STATUS } from "@/interface/enum";
import { employeePagination } from "@/server/action/employee.admin";
import { prisma } from "@/config/prisma";
import { PaginationComponent } from "@/app/components/PaginationComponent";
import { InterviewTable } from "@/app/admin/interview/components/interviewTable";

async function Page(context: TContext) {
    const search = await getContextQuery(context, 'search')
    const status = await getContextQuery(context, 'status')
    const department = await getContextQuery(context, 'department')
    const page = Number(await getContextQuery(context, 'page')) || 1;
    const departments = await prisma.departements.findMany()

    const { totalPages, employees } = await employeePagination(search, EMPLOYEE_STATUS.Interview, page)
    // console.log(employees);

    return (
        <div className="space-y-2">
            <div className="flex gap-2 items-center">

                <Form
                    action={ `/admin/interview` }
                    className="join"
                >
                    <input type="search"
                           className={ 'input input-bordered join-item ' }
                           defaultValue={ search }
                           name={ 'search' }
                    />
                    <input type="hidden"
                           defaultValue={ department }
                           name={ 'department' }
                    />
                    <button className={ 'btn join-item ' }><Search /></button>
                </Form>

                <details className="dropdown">
                    <summary className="btn m-1">Select Department</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">

                        { departments.map((item) => (
                            <li key={ item.id }>
                                <Link href={ `/admin/registration?search=${ search }&department=${ item }` }
                                >{ item.position }</Link>
                            </li>
                        )) }
                    </ul>
                </details>

                {/*<details className="dropdown">*/ }
                {/*    <summary className="btn m-1">Select Status</summary>*/ }
                {/*    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">*/ }
                {/*        <li>*/ }
                {/*            <Link href={ `/admin/interview?search=${ search }&status=` }>Select All</Link>*/ }
                {/*        </li>*/ }
                {/*        { employeeListStatus.map((item) => (*/ }
                {/*            <li key={ item }>*/ }
                {/*                <Link href={ `/admin/interview?search=${ search }&status=${ item }` }>{ item }</Link>*/ }
                {/*            </li>*/ }
                {/*        )) }*/ }
                {/*    </ul>*/ }
                {/*</details>*/ }
            </div>

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
