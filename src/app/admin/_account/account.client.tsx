'use client'
import React, { useState } from "react";
import { Users } from ".prisma/client";
import { toDateIndo } from "@/utils/toDate";
import { Plus } from "lucide-react";
import { EmployeeUserClient } from "@/interface/entity/employee.model";

export function AccountModal({ user, employees }: { user: Users, employees: EmployeeUserClient[] }) {
    const [ search, setSearch ] = useState('')
    return (<>
            <button className="btn btn-info" onClick={ () => {
                // @ts-ignore
                document.getElementById(`modal-user-${ user.id }`).showModal()
            } }>
                Connect
            </button>
            <dialog id={ `modal-user-${ user.id }` } className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Please Select And Connect the Employee</h3>
                    <section className="space-y-2">
                        <h1>Employee List</h1>
                        <input type="search" className={ 'input input-bordered' }
                               onChange={ (e) => setSearch(e.target.value) }/>
                        <div className="overflow-x-auto">
                            <table className="table bg-base-200 ">
                                <thead>
                                <tr className="text-left">
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    {/*<th >Gender</th>*/ }
                                    {/*<th >Job Title</th>*/ }
                                    <th>Department</th>
                                    {/*<th >Employment Type</th>*/ }
                                    <th>Hire Date</th>
                                    {/*<th >Salary</th>*/ }
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                { employees
                                .filter(employee => employee.User.name.toLowerCase().includes(search.toLowerCase()))
                                .map((employee) => (
                                    <tr key={ employee.id } className="hover:bg-gray-100/20">
                                        <td>{ employee.id }</td>
                                        <td>{ employee.User.name }</td>
                                        <td>{ employee.User.email }</td>
                                        <td>{ employee.User.phone }</td>
                                        {/*<td >{ employee.gender }</td>*/ }
                                        {/*<td >{ employee.jobTitle }</td>*/ }
                                        <td>{ employee.department }</td>
                                        {/*<td >{ employee.employmentType }</td>*/ }
                                        <td>{ toDateIndo(employee.hireDate) }</td>
                                        {/*<td >{ employee.salary }</td>*/ }
                                        <td>{ employee.status }</td>
                                        <td>
                                            <div>
                                                <button
                                                    className={ 'btn btn-success btn-square' }
                                                    // onClick={ () => employeeOnConnectUser(user.id, employee.id) }
                                                >
                                                    <Plus/>
                                                </button>
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
                    </section>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */ }
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export function RemoveUserEmployeeButton({ employeeId }: { employeeId: string }) {
    return (
        <button className={ 'btn btn-error' }
            // onClick={ async () => removeUserEmployee(employeeId) }
        >
            Remove User
        </button>
    );
}

export function UserAvailable({ users, employees }: { users: Users[], employees: EmployeeUserClient[] }) {
    return (
        <section>
            <h1>User Available List</h1>

            <div className="overflow-x-auto">
                <table className="table bg-base-200">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        {/*<th >Role</th>*/ }
                        <th>OTP</th>
                        {/*<th >OTP Count</th>*/ }
                        {/*<th >OTP Regenerate</th>*/ }
                        {/*<th >OTP Expired</th>*/ }
                        <th>Status</th>
                        <th>Action</th>

                    </tr>
                    </thead>
                    <tbody>
                    { users.map((user) => (
                        <tr key={ user.id } className="hover:bg-gray-100/20">
                            <td>{ user.name }</td>
                            <td>{ user.phone }</td>
                            <td>{ user.email }</td>
                            {/*<td >{ user.role }</td>*/ }
                            <td>{ user.otp ?? 'N/A' }</td>
                            {/*<td >{ user.otpCount }</td>*/ }
                            {/*<td >{ new Date(user.otpRegenerate).toLocaleString() }</td>*/ }
                            {/*<td >{ new Date(user.otpExpired).toLocaleString() }</td>*/ }
                            <td>{ user.status }</td>
                            <td>
                                <div>
                                    <AccountModal user={ user } employees={ employees }/>
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
        </section>

    );
}

export function TableEmployees({ employees, title, valid }: {
    employees: EmployeeUserClient[],
    title: string,
    valid?: boolean
}) {
    return (
        <section className="space-y-2">
            <h1 className={ `${ valid ? 'text-success' : 'text-errors' }` }>{ title }</h1>
            <div className="overflow-x-auto">
                <table className="table bg-base-200 ">
                    <thead>
                    <tr className="text-left">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        {/*<th >Gender</th>*/ }
                        {/*<th >Job Title</th>*/ }
                        <th>Department</th>
                        {/*<th >Employment Type</th>*/ }
                        <th>Hire Date</th>
                        {/*<th >Salary</th>*/ }
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    { employees.map((employee) => (
                        <tr key={ employee.id } className="hover:bg-gray-100/20">
                            <td>{ employee.id }</td>
                            <td>{ employee.User.name }</td>
                            <td>{ employee.User.email }</td>
                            <td>{ employee.User.phone }</td>
                            {/*<td >{ employee.gender }</td>*/ }
                            {/*<td >{ employee.jobTitle }</td>*/ }
                            <td>{ employee.department }</td>
                            {/*<td >{ employee.employmentType }</td>*/ }
                            <td>{ toDateIndo(employee.hireDate) }</td>
                            {/*<td >{ employee.salary }</td>*/ }
                            <td>{ employee.status }</td>
                            <td>
                                { valid
                                    ? <RemoveUserEmployeeButton employeeId={ employee.id }/>
                                    : <button></button>
                                }
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
        </section>
    );
}
