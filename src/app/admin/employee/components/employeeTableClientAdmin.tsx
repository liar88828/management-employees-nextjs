import { EmployeeUserClient } from "@/interface/entity/employee.model";
import { toRupiah } from "@/utils/toRupiah";
import Link from "next/link";
import { BookUser } from "lucide-react";

export function EmployeeTableClientAdmin({ employees }: { employees: EmployeeUserClient[] }) {
    return (
        <div>
            <div className="overflow-x-auto w-full">
                <table
                    // data-theme={ 'light' }
                    className="my-table"
                >
                    {/* Table Head */ }
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th className={ 'text-nowrap' }>Phone</th>
                        {/*<th>Gender</th>*/ }
                        <th>Hire Date</th>
                        <th>Job Title</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>Employment Type</th>
                        <th>Status</th>
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
                            <td>{ employee.User.email }</td>
                            <td className={ 'text-nowrap' }>{ employee.User.phone || "-" }</td>
                            {/*<td>{ employee.gender || "-" }</td>*/ }
                            <td>{ new Date(employee.hireDate).toLocaleDateString() }</td>
                            <td>{ employee.jobTitle }</td>
                            <td>{ employee.department || "-" }</td>
                            <td>{ toRupiah(employee.salary) }</td>
                            <td>{ employee.employmentType }</td>
                            <td>
                                <p className={ 'badge badge-info' }
                                    // className={ `badge ${
                                    //     employee.status === "Active" ? "badge-success" : "badge-error"
                                    // }` }
                                >
                                    { employee.status }
                                </p></td>
                            <td>
                                <Link
                                    href={ `/admin/employee/${ employee.id }` }
                                    className={ 'btn btn-sm btn-info btn-square' }
                                >
                                    <BookUser />
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
