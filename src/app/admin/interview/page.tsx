import { prisma } from "@/config/prisma";
import { Search } from "lucide-react";
import Form from "next/form";
import { TContext } from "@/interface/server/param";
import { getContextQuery } from "@/utils/requestHelper";
import { EMPLOYEE_STATUS } from "@/interface/enum";
import { Pagination, TableEmployees } from "@/app/admin/interview/interview.client";

async function Page(context: TContext) {
    const search = await getContextQuery(context, 'search')
    const status = await getContextQuery(context, 'status')
    const page = Number(await getContextQuery(context, 'page')) || 1;
    const pageSize = 3; // You can adjust the page size

    const totalEmployees = await prisma.employees.count({
        where: {
            name: { contains: search },
            status: EMPLOYEE_STATUS.Interview
        }
    });

    const employees = await prisma.employees.findMany({
        where: {
            name: { contains: search },
            status: EMPLOYEE_STATUS.Interview
        },
        skip: (page - 1) * pageSize,
        take: pageSize
    });

    const totalPages = Math.ceil(totalEmployees / pageSize);
    // console.log(employees);
    return (
        <div className="space-y-2">
            <div className="flex gap-2 items-center">

                <Form
                    action={ `/admin/interview` }
                    className="join">
                    <input type="search"
                           className={ 'input input-bordered join-item ' }
                           defaultValue={ search }
                           name={ 'search' }
                    />
                    <input type="hidden"
                           defaultValue={ status }
                           name={ 'status' }
                    />
                    <button className={ 'btn join-item ' }><Search/></button>
                </Form>

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

            <TableEmployees employees={ employees }/>
            <Pagination
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
