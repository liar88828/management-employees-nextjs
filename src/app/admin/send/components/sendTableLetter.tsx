import { Letters } from "@prisma/client";
import { toDateIndo } from "@/utils/toDate";
import Link from "next/link";
import React from "react";

export function SendTableLetter({ data }: { data: Letters[] }) {
    return (
        <div className="overflow-x-auto ">
            <table className="my-table">
                <thead>
                <tr>
                    <th>No</th>
                    <th>ID</th>
                    <th>Interview Date</th>
                    <th>Interview Location</th>
                    <th>Letter Create</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                { data.map((item, index) => (
                    <tr key={ index } className="hover:bg-gray-100/50">
                        <td>{ index + 1 }</td>
                        <td>{ item.id }</td>
                        <td>{ toDateIndo(item.interviewDate) }</td>
                        <td>{ item.interviewLocation }</td>
                        <td>{ toDateIndo(item?.createdAt) }</td>
                        <td>
                            <div>
                                <Link
                                    className="btn btn-info"
                                    href={ `/admin/send/${ item.id }`
                                    }
                                >
                                    Detail
                                </Link>
                            </div>
                        </td>
                    </tr>
                )) }
                </tbody>
            </table>
        </div>
    );
}
