import { EmployeeUserClient } from "@/interface/entity/employee.model";
import { toRupiah } from "@/utils/toRupiah";
import Link from "next/link";
import { toDateIndo } from "@/utils/toDate";

export function EmployeeTableClientAdmin({ employees }: { employees: EmployeeUserClient[] }) {
    return (
        <div>
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
        </div>
    )
}
