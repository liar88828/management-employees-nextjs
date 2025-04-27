import { EmployeeUserClient } from "@/interface/entity/employee.model";
import { toDateIndo } from "@/utils/toDate";
import React from "react";

export async function PositionEmployeeTable({ employees }: { employees: EmployeeUserClient[] }) {

    return (
        <section>
            { employees.length === 0 ? (
                <h1 className="card-title">Empty Data</h1>
            ) : (
                <div className="overflow-x-auto ">
                    <table className="my-table">
                        <thead>
                        <tr className=" text-left">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Hire Date</th>
                            <th>Position</th>
                        </tr>
                        </thead>
                        <tbody>
                        { employees.map((employee) => (
                            <tr key={ employee.id } className="hover:bg-gray-100/20">
                                <td>{ employee.User?.name }</td>
                                <td>{ employee.User?.email }</td>
                                <td className="text-nowrap">{ employee.User?.phone }</td>
                                <td>{ toDateIndo(employee.hireDate) }</td>
                                <td>{ employee.department }</td>
                            </tr>
                        )) }
                        </tbody>
                        <tfoot>
                        <tr>
                            <td></td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            ) }
        </section>
    );
}
