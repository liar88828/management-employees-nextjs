import React from 'react';
import { prisma } from "@/config/prisma";
import { ModalCreateDepartment, ModalDeleteDepartment } from "@/app/admin/department/modalCreateDepartment";

async function Page() {
    const departments = await prisma.departements.findMany()
    return (
        <div>
            <div className="flex justify-between ">
                <h1 className={ 'text-xl font-bold ' }>Employee Position</h1>
                <ModalCreateDepartment/>
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
                                <div>
                                    <ModalDeleteDepartment department={ item }/>
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

