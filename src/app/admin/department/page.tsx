import React from 'react';
import { prisma } from "@/config/prisma";
import {
    DepartmentModalCreate,
    DepartmentModalDelete,
    DepartmentModalUpdate
} from "@/app/admin/department/DepartmentModal";

async function Page() {
    const departments = await prisma.departements.findMany()
    return (
        <div>
            <div className="flex justify-between ">
                <h1 className={ 'text-xl font-bold ' }>Employee Position</h1>
                <DepartmentModalCreate/>
            </div>
            <div className="overflow-x-auto mt-3">
                <table className="table bg-base-200 table-auto">
                    {/* head */ }
                    <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    { departments.map(item => (
                        <tr key={ item.id }>
                            <th></th>
                            <td>{ item.id }</td>
                            <td>{ item.position }</td>
                            <td>
                                <div className="flex gap-2">
                                    <DepartmentModalDelete department={ item }/>
                                    <DepartmentModalUpdate department={ item }/>
                                </div>
                            </td>
                        </tr>
                    )) }
                    </tbody>
                    <tfoot><tr><th></th></tr></tfoot>
                </table>
            </div>
        </div>
    );
}

export default Page;

