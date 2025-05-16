import { EmployeeUserClient } from "@/interface/entity/employee.model";
import { toDateIndo } from "@/utils/toDate";
import Link from "next/link";

export function RegistrationTable({ employees }: {
    employees: EmployeeUserClient[],
    // title: string,
    // valid?: boolean
}) {
    return (
        <div className="overflow-x-auto w-full">

            <table
                className="my-table"
            >

                <thead>
                <tr className="text-left">
                    <th>No</th>
                    <th>Name</th>
                    <th>Contact</th>
                    {/*<th>Phone</th>*/ }
                    {/*<th >Gender</th>*/ }
                    {/*<th >Job Title</th>*/ }
                    {/*<th >Position</th>*/ }
                    {/*<th >Work Time</th>*/ }
                    <th>Status Register</th>
                    {/*<th>Hire Date</th>*/ }
                    {/*<th>Complete</th>*/ }
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
                        <td>
                            <p>{ employee.User.email }</p>
                            <p>{ employee.User.phone }</p>
                        </td>
                        {/*<td >{ employee.gender }</td>*/ }
                        {/*<td >{ employee.jobTitle }</td>*/ }
                        {/*<td >{ employee.positions }</td>*/ }
                        {/*<td >{ employee.workTime }</td>*/ }
                        <td>
                            <p>{ toDateIndo(employee.hireDate) }</p>
                            <p className={ ' badge badge-info  text-nowrap' }>

                                {
                                    // employee.photo3x4 === null ||
                                    employee.photoKtp === null ||
                                    employee.photoIjazah === null ? 'Not Complete' : 'Complete'
                                }
                            </p>
                        </td>
                        {/*<td >{ employee.salary }</td>*/ }
                        {/*<td >{ employee.status }</td>*/ }
                        <td>
                            <div>
                                <Link
                                    className={ 'btn btn-info' }
                                    href={ `/admin/registration/${ employee.id }` }
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
