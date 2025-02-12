import { prisma } from "@/config/prisma";
import React from "react";
import { TableEmployees, UserAvailable } from "@/app/admin/account/account.client";

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

    // console.log(userAvailable)

    return (

        <div className={ 'space-y-5' }>
            <h1 className={ 'text-xl font-bold' }>Connect Account Between User And Employee</h1>
            <UserAvailable users={ userAvailable } employees={ employeesNull }/>
            <TableEmployees employees={ employeesNull } title={ 'Employee Not Connect Account' }/>
            <TableEmployees employees={ employeesValid } title={ 'Employee Is Connect Account' } valid={ true }/>
        </div>
    )
}
