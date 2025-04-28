import React from "react";
import { employeesFindValidLoader, userFindAvailableLoader } from "@/server/action/employee-admin.action";
import { TableEmployees } from "@/app/admin/_account/account.client";

export default async function page() {

    const employeesValid = await employeesFindValidLoader()
    // const employeesNull = await employeesFindNull()
    const userAvailable = await userFindAvailableLoader(employeesValid)

    return (

        <div className={ 'space-y-5' }>
            <h1 className={ 'text-xl font-bold' }>Connect Account Between User And Employee</h1>
            {/*<UserAvailable employees={ employeesNull } users={ userAvailable } />*/ }
            {/*<TableEmployees employees={ employeesNull } title={ 'Employee Not Connect Account' } />*/ }
            <TableEmployees employees={ employeesValid } title={ 'Employee Is Connect Account' } valid={ true } />
        </div>
    )
}
