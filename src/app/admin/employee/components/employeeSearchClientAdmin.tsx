import Form from "next/form";
import { StatusEmployeeList } from "@/interface/enum";
import { Search } from "lucide-react";
import React from "react";
import Link from "next/link";
import { toDateIndo } from "@/utils/toDate";
import { toRupiah } from "@/utils/toRupiah";
import { EmployeeUserClient } from "@/interface/entity/employee.model";

export function EmployeeSearchClientAdmin({ name, status, employees }: {
    name: string,
    status: string,
    employees: EmployeeUserClient[]
}) {
    return ( <>
            <div className="flex gap-2 items-center">
                <Form action={ '/admin/employee' } className="join ">

                    <input type="text"
                           className={ 'input input-bordered join-item ' }
                           name={ 'name' }
                           defaultValue={ name }
                           placeholder={ 'Employee Name .....' }
                    />

                    <input type="hidden"
                           defaultValue={ status }
                           name={ 'status' }
                    />

                    <button className={ 'btn join-item ' }><Search /></button>
                </Form>

                <details className="dropdown">
                    <summary className="btn ">Select Status</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] p-2 shadow  overflow-y-auto ">
                        <li>
                            <Link href={ `/admin/employee?name=${ name }&status=` }>
                                Select All
                            </Link>
                        </li>
                        { StatusEmployeeList.map((item) => (
                            <li key={ item }>
                                <Link href={ `/admin/employee?name=${ name }&status=${ item }` }>
                                    { item }
                                </Link>
                            </li>
                        )) }
                    </ul>
                </details>

                {/*<Link href={ '/admin/employee/create' } className={ 'btn btn-square' }>*/ }
                {/*    <Plus />*/ }
                {/*</Link>*/ }
            </div>
            <div className="overflow-x-auto w-full">
                <table
                    // prevData-theme={ 'light' }
                    className="my-table"
                >
                    {/* Table Head */ }
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Contact</th>
                        {/*<th>Email</th>*/ }
                        {/*<th className={ 'text-nowrap' }>Phone</th>*/ }
                        {/*<th>Gender</th>*/ }
                        <th>Status Registered</th>
                        <th>Job Title</th>
                        <th>Salary</th>
                        <th>Work Time</th>
                        {/*<th>Status</th>*/ }
                        <th>Action</th>
                    </tr>
                    </thead>

                    {/* Table Body */ }
                    <tbody className={ 'overflow-y-auto ' }>
                    { employees.map((employee, i) => (
                        <tr key={ employee.id }>
                            {/*<td>{ employee.id }</td>*/ }
                            <td>{ i + 1 }</td>
                            <td>{ employee.User.name }</td>
                            <td>
                                <p>{ employee.User.email }</p>
                                <p>{ employee.User.phone || "-" }</p>
                            </td>
                            {/*<td>{ employee.gender || "-" }</td>*/ }
                            <td>
                                <p>{ toDateIndo(employee.hireDate) }</p>
                                <p className={ 'badge badge-info' }>{ employee.status }</p>
                            </td>
                            <td>{ employee.jobTitle }</td>
                            <td>{ toRupiah(employee.salary) }</td>
                            <td>{ employee.workTime }</td>

                            <td>
                                <Link
                                    href={ `/admin/employee/${ employee.id }` }
                                    className={ 'btn  btn-info ' }
                                >
                                    Detail
                                </Link>
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
        </>
    );
}
