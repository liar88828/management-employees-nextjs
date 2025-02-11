'use client'
import React, { useState } from "react";
import { Users } from ".prisma/client";
import { Employees } from "@prisma/client";
import { toDateIndo } from "@/utils/toDate";
import { Plus } from "lucide-react";
import { onConnectUserEmployee, removeUserEmployee } from "@/server/action/employee.admin";

export function ModalUserConnectEmployee({ user, employees }: { user: Users, employees: Employees[] }) {
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
                                    <th className="">ID</th>
                                    <th className="">Name</th>
                                    <th className="">Email</th>
                                    <th className="">Phone</th>
                                    {/*<th className="">Gender</th>*/ }
                                    {/*<th className="">Job Title</th>*/ }
                                    <th className="">Department</th>
                                    {/*<th className="">Employment Type</th>*/ }
                                    <th className="">Hire Date</th>
                                    {/*<th className="">Salary</th>*/ }
                                    <th className="">Status</th>
                                    <th className="">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                { employees
                                .filter(employee => employee.name.toLowerCase().includes(search.toLowerCase()))
                                .map((employee) => (
                                    <tr key={ employee.id } className="hover:bg-gray-100/20">
                                        <td className="">{ employee.id }</td>
                                        <td className="">{ employee.name }</td>
                                        <td className="">{ employee.email }</td>
                                        <td className="">{ employee.phone }</td>
                                        {/*<td className="">{ employee.gender }</td>*/ }
                                        {/*<td className="">{ employee.jobTitle }</td>*/ }
                                        <td className="">{ employee.department }</td>
                                        {/*<td className="">{ employee.employmentType }</td>*/ }
                                        <td className="">{ toDateIndo(employee.hireDate) }</td>
                                        {/*<td className="">{ employee.salary }</td>*/ }
                                        <td className="">{ employee.status }</td>
                                        <td className="">
                                            <div>
                                                <button
                                                    className={ 'btn btn-success btn-square' }
                                                    onClick={ () => onConnectUserEmployee(user.id, employee.id) }>
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
        <button className={ 'btn btn-error' } onClick={ async () => removeUserEmployee(employeeId) }>
            Remove User
        </button>
    );
}

