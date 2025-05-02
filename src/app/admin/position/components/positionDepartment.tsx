'use client'
import { PositionPosition } from "@/server/action/position.action";
import Link from "next/link";
import {
    PositionModalCreate,
    PositionModalDelete,
    PositionModalUpdate
} from "@/app/admin/position/components/PositionModal";
import React from "react";

export function PositionDepartment({ positions }: { positions: PositionPosition[] }) {
    return (
        < >
            <div className="flex justify-between ">
                <h1 className={ 'my-title ' }>Employee Position</h1>
                <PositionModalCreate />
            </div>

            <div className="overflow-x-auto mt-3">
                <table className="my-table ">

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
                    { positions.map(item => (
                        <tr key={ item.id }>
                            <th></th>
                            <td>{ item.id }</td>
                            <td>{ item.position }</td>
                            <td>{ item.count }</td>
                            <td>
                                <div className="flex gap-2">
                                    <Link
                                        className={ 'btn btn-info' }
                                        href={ `/admin/position/${ item.position }?position=${ item.position }` }
                                    >
                                        Detail
                                    </Link>

                                    <PositionModalUpdate positionProps={ item } />
                                    { item.count === 0 && <PositionModalDelete position={ item } /> }

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
