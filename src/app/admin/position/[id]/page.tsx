import React from 'react';
import Form from "next/form";
import { TContext } from "@/interface/server/param";
import { getContextQuery, getContextQueryNum } from "@/utils/requestHelper";
import { SearchIcon } from "lucide-react";
import { employeePositions } from "@/server/action/employee.admin";
import { PaginationComponent } from "@/app/components/PaginationComponent";

import { PositionEmployeeTable } from "@/app/admin/position/components/positionEmployeeTable";

export default async function Page(context: TContext) {
    const search = await getContextQuery(context, 'search')
    const status = await getContextQuery(context, 'status')
    const department = await getContextQuery(context, 'department')
    const page = await getContextQueryNum(context, 'page')
    // const departments = await prisma.departements.findMany({})
    const { totalPages, employees } = await employeePositions({ department, search, page })

    return (
        <div className="space-y-2">
            <div className="flex justify-between gap-4">
                <h1 className={ 'my-title' }>Detail { department }</h1>
                <div className="flex gap-4">
                    <Form action={ '/admin/position' }
                          className={ 'join ' }
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
                        <button
                            className={ 'btn join-item' }
                            type="submit"
                        >
                            <SearchIcon />
                        </button>
                    </Form>

                    {/*<details className="dropdown">*/ }
                    {/*    <summary className="btn m-1">Select Department</summary>*/ }
                    {/*    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">*/ }
                    {/*        <li>*/ }
                    {/*            <Link href={ `/admin/position?search=${ search }&department=` }*/ }
                    {/*            >Select Department</Link>*/ }
                    {/*        </li>*/ }
                    {/*        { departments.map((item) => (*/ }
                    {/*            <li key={ item.id }>*/ }
                    {/*                <Link href={ `/admin/position?search=${ search }&department=${ item.position }` }*/ }
                    {/*                >{ item.position }</Link>*/ }
                    {/*            </li>*/ }
                    {/*        )) }*/ }
                    {/*    </ul>*/ }
                    {/*</details>*/ }

                </div>

                {/*<Link href={ '/admin/position/create' } className={ 'btn btn-info ' }>*/ }
                {/*    Add Position <PlusIcon />*/ }
                {/*</Link>*/ }
            </div>

            <PositionEmployeeTable employees={ employees } />
            <PaginationComponent
                page={ page }
                totalPages={ totalPages }
                search={ search }
                status={ status }
                department={ department }
                title={ 'position' }
            />
        </div>
    );
}
