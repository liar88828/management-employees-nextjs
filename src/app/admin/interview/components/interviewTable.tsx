import { EmployeeUserClient } from "@/interface/entity/employee.model";
import { toDateIndo } from "@/utils/toDate";
import Link from "next/link";
import React from "react";

export function InterviewTable({ employees }: {
    employees: EmployeeUserClient[],
    // title: string,
    // valid?: boolean
}) {
    return (
        <div className="overflow-x-auto">
            <table className="my-table">
                <thead>
                <tr className="text-left">
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    {/*<th >Gender</th>*/ }
                    {/*<th >Job Title</th>*/ }
                    {/*<th >Department</th>*/ }
                    {/*<th >Employment Type</th>*/ }
                    <th>Hire Date</th>
                    {/*<th >Salary</th>*/ }
                    {/*<th >Status</th>*/ }
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                { employees.map((employee, index) => (
                    <tr key={ employee.id } className="hover:bg-gray-100/20">
                        <td>{ index + 1 }</td>
                        <td>{ employee.User.name }</td>
                        <td>{ employee.User.email }</td>
                        <td className="text-nowrap">{ employee.User.phone }</td>
                        {/*<td >{ employee.gender }</td>*/ }
                        {/*<td >{ employee.jobTitle }</td>*/ }
                        {/*<td >{ employee.department }</td>*/ }
                        {/*<td >{ employee.employmentType }</td>*/ }
                        <td>{ toDateIndo(employee.hireDate) }</td>
                        {/*<td >{ employee.salary }</td>*/ }
                        {/*<td >{ employee.status }</td>*/ }
                        <td>
                            <div>
                                <Link
                                    className={ 'btn btn-info' }
                                    href={ `/admin/interview/${ employee.id }` }
                                >
                                    Detail
                                </Link>
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
    );
}
