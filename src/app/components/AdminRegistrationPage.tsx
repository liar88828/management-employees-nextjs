import { PaginationComponent } from "@/app/components/ui/PaginationComponent";
import React from "react";
import Form from "next/form";
import { Search } from "lucide-react";
import Link from "next/link";
import { EmployeeCompletePhoto } from "@/interface/enum";
import { toDateIndo } from "@/utils/toDate";
import { EmployeeUserClient } from "@/interface/model";

export function AdminRegistrationPage({ employees, name, status, page, totalPages }: {
    name: string,
    status: string,
    employees: EmployeeUserClient[],
    page: number,
    totalPages: number
}) {
    return (
        <div className="space-y-2">
            <div className="flex gap-2 items-center flex-wrap">
                <Form action={ `/admin/registration` } className="join">

                    <input type="text"
                           className={ 'input input-bordered join-item ' }
                           defaultValue={ name }
                           name={ 'search' }
                           placeholder={ 'Employee Name .....' }
                    />

                    <input type="hidden"
                           defaultValue={ status }
                           name={ 'status' }
                    />

                    <button className={ 'btn join-item ' }><Search /></button>
                </Form>

                <details className="dropdown">
                    <summary className="btn">Select Status</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><Link
                            href={ `/admin/registration?name=${ name }&status=` }
                        >{ EmployeeCompletePhoto["Select All"] }</Link></li>
                        <li><Link
                            href={ `/admin/registration?name=${ name }&status=${ EmployeeCompletePhoto.Complete }` }
                        >{ EmployeeCompletePhoto.Complete }</Link></li>
                        <li><Link
                            href={ `/admin/registration?name=${ name }&status=${ EmployeeCompletePhoto["Not Completed"] }` }
                        >{ EmployeeCompletePhoto["Not Completed"] }</Link></li>
                        {/*{ StatusEmployeeList.map((item) => (*/ }
                        {/*    <li key={ item }>*/ }
                        {/*        <Link href={ `/admin/registration?name=${ name }&statusEmployee=${ item }` }>{ item }</Link>*/ }
                        {/*    </li>*/ }
                        {/*)) }*/ }
                    </ul>
                </details>
            </div>
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
                        <th>Document</th>
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
                            {/*<td >{ employee.statusEmployee }</td>*/ }
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
            <PaginationComponent currentPage={ page }
                                 totalPages={ totalPages }
                                 search={ name }
                                 status={ status }
                                 title={ 'registration' }
            />
        </div>
    );
}
