import { EmployeeUserClient } from "@/interface/entity/employee.model";
import { toDateIndo } from "@/utils/toDate";
import React from "react";
import { ErrorComponent } from "@/app/components/error/ErrorComponent";

export async function PositionEmployeeTable({ employees }: { employees: EmployeeUserClient[] }) {
    if (employees.length === 0) {
        return <ErrorComponent title={ 'EmptyData' } description={ 'Maybe Data is Server is Busy' } />

    }
    // <section>
    // <h1 className="card-title">Empty Data</h1>
    // </section>

    return (
        <section>
            <div className="overflow-x-auto ">
                <table className="my-table">
                    <thead>
                    <tr className=" text-left">
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Hire Date</th>
                        <th>Position</th>
                    </tr>
                    </thead>
                    <tbody>
                    { employees.map((employee, i) => (
                        <tr key={ employee.id } className="hover:bg-gray-100/20">
                            <td>{ i + 1 }</td>
                            <td>{ employee.User?.name }</td>
                            <td>{ employee.User?.email }</td>
                            <td className="text-nowrap">{ employee.User?.phone }</td>
                            <td>{ toDateIndo(employee.hireDate) }</td>
                            <td>{ employee.position }</td>
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
        </section>
    )
        ;
}
