'use client'
import { DepartmentPosition } from "@/server/action/department.action";
import Link from "next/link";
import {
    DepartmentModalDelete,
    PositionModalCreate,
    PositionModalUpdate
} from "@/app/admin/position/components/PositionModal";
import React from "react";

export function PositionDepatment({ departments }: { departments: DepartmentPosition[] }) {
    return (
        < >
            <div className="flex justify-between ">
                <h1 className={ 'my-title ' }>Employee Position</h1>
                <PositionModalCreate />
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
                    { departments.map(item => (
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

                                    <PositionModalUpdate department={ item } />
                                    { item.count === 0 && <DepartmentModalDelete department={ item } /> }

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
        </ >
    );
}
