import React from "react";
import { EmployeeCVClientAdmin, EmployeeFormClientAdmin } from "@/app/components/employee/employee.client";
import { EmployeePhotoAdmin } from "@/app/components/employee/employee.page";
import { employeeId } from "@/server/network/employee";
import { EmptyData } from "@/app/components/PageErrorData";

export async function EmployeeDetailServerAdmin({ idEmployee }: { idEmployee: string }) {
    const employee = await employeeId(idEmployee)

    if (!employee) {
        return <EmptyData page={ `Employee Detail ${ idEmployee }` } />
    }
    return (
        <>
            <EmployeeCVClientAdmin employee={ employee.data } />
            <EmployeePhotoAdmin employee={ employee.data } />
        </>
    );
}

export async function EmployeeFormServerAdmin({ idEmployee }: { idEmployee: string }) {
    const employee = await employeeId(idEmployee)

    if (!employee) {
        return <EmptyData page={ `Employee Detail ${ idEmployee }` } />
    }
    return (
        <EmployeeFormClientAdmin employee={ employee.data } method={ 'POST' } />
    );
}
