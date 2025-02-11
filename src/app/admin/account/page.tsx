import { prisma } from "@/config/prisma";
import { toDateIndo } from "@/utils/toDate";
import React from "react";
import { Employees } from "@prisma/client";
import { Users } from ".prisma/client";
import { ModalUserConnectEmployee, RemoveUserEmployeeButton } from "@/app/admin/account/modalUserConnectEmployee";

export default async function page() {

    const employeesValid = await prisma.employees.findMany({
        where: {
            userId: { not: null },
            User: { role: "USER" },
        }
    })

    const employeesNull = await prisma.employees.findMany({
        where: {
            userId: null,
            // User: { role: "USER" }
        }
    })

    const userAvailable = await prisma.users.findMany({
        where: {
            id: {
                notIn: employeesValid
                .map(employee => employee.userId)
                .filter((id): id is string => id !== undefined) // Ensures no `undefined`
            },
            role: "USER",
            // Employees: {
            //     userId: null
            // },
        }
    })

    console.log(userAvailable)

    return (

        <div className={ 'space-y-5' }>
            <h1 className={ 'text-xl font-bold' }>Connect Account Between User And Employee</h1>
            <UserAvailable users={ userAvailable } employees={ employeesNull }/>
            <TableEmployees employees={ employeesNull } title={ 'Employee Not Connect Account' }/>
            <TableEmployees employees={ employeesValid } title={ 'Employee Is Connect Account' } valid={ true }/>
        </div>
    )
}

export function TableEmployees({ employees, title, valid }: {
    title: string,
    employees: Employees[],
    valid?: boolean
}) {
    return (
        <section className="space-y-2">
            <h1 className={ `${ valid ? 'text-success' : 'text-error' }` }>{ title }</h1>
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
                    { employees.map((employee) => (
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

export function UserAvailable({ users, employees }: { users: Users[], employees: Employees[] }) {
    return (
        <section>
            <h1 className="">User Available List</h1>

            <div className="overflow-x-auto">
                <table className="table bg-base-200">
                    <thead>
                    <tr className="">
                        <th className="">Name</th>
                        <th className="">Phone</th>
                        <th className="">Email</th>
                        {/*<th className="">Role</th>*/ }
                        <th className="">OTP</th>
                        {/*<th className="">OTP Count</th>*/ }
                        {/*<th className="">OTP Regenerate</th>*/ }
                        {/*<th className="">OTP Expired</th>*/ }
                        <th className="">Status</th>
                        <th className="">Action</th>

                    </tr>
                    </thead>
                    <tbody>
                    { users.map((user) => (
                        <tr key={ user.id } className="hover:bg-gray-100/20">
                            <td className="">{ user.name }</td>
                            <td className="">{ user.phone }</td>
                            <td className="">{ user.email }</td>
                            {/*<td className="">{ user.role }</td>*/ }
                            <td className="">{ user.otp ?? 'N/A' }</td>
                            {/*<td className="">{ user.otpCount }</td>*/ }
                            {/*<td className="">{ new Date(user.otpRegenerate).toLocaleString() }</td>*/ }
                            {/*<td className="">{ new Date(user.otpExpired).toLocaleString() }</td>*/ }
                            <td className="">{ user.status }</td>
                            <td className="">
                                <div className="">
                                    <ModalUserConnectEmployee user={ user } employees={ employees }/>
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


