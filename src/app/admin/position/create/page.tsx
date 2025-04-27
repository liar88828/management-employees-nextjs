import React from 'react';
import { prisma } from "@/config/prisma";
import Link from "next/link";
import { PositionModalUpdate } from "@/app/admin/position/components/PositionModalUpdate";

async function Page() {
    const dataDepartment = await prisma.$transaction(async (tx) => {
        const departments = await tx.departements.findMany()
        const employee = await tx.employees.groupBy({
            by: [ 'department' ],
            _count: true,
        })
        return departments.map(dept => ( {
            id: dept.id,
            position: dept.position,
            count: employee.find(emp => emp.department === dept.position)?._count ?? 0
        } ));
    });

    return (
        <div>
            <div className="flex justify-between ">
                <h1 className={ 'my-title ' }>Employee Position</h1>
                {/*<PositionModalCreate />*/ }
            </div>
            <div className="overflow-x-auto mt-3">
                <table className="my-table">

                    {/* head */ }
                    <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    { dataDepartment.map(item => (
                        <tr key={ item.id }>
                            <th></th>
                            <td>{ item.id }</td>
                            <td>{ item.position }</td>
                            <td>{ item.count }</td>
                            <td>
                                <div className="flex gap-2">
                                    <Link
                                        className={ 'btn btn-info' }
                                        href={ `/admin/position/${ item.position }?department=${ item.position }` }
                                    >
                                        Detail
                                    </Link>

                                    {/*<DepartmentModalDelete department={ item }/>*/ }
                                    <PositionModalUpdate department={ item } />

                                </div>
                            </td>
                        </tr>
                    )) }
                    </tbody>
                    <tfoot>
                    <tr>
                        <th></th>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}

export default Page;
