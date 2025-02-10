import React from "react";
import {EmployeeCVClientAdmin, EmployeeFormClientAdmin} from "@/app/components/employee/employee.client";
import {EmployeePhotoAdmin} from "@/app/components/employee/employee.page";
import {employeeFindByUserId, employeeId} from "@/server/network/employee";
import {EmptyData} from "@/app/components/PageErrorData";
import {getEmployeeByUserId} from "@/server/controller/employee.controller";

export async function EmployeeDetailServerAdmin({idEmployee}: { idEmployee: string }) {
    const employee = await employeeFindByUserId(idEmployee)

    if (!employee) {
        return <EmptyData page={`Employee Detail ${idEmployee}`}/>
    }

    return (
        <div className="pb-20 space-y-5">
            <EmployeeCVClientAdmin employee={employee.data}/>
            <EmployeePhotoAdmin employee={employee.data}/>
        </div>
    );
}

export async function EmployeeDetailServerClient({userId}: { userId: string }) {
    const employee = await getEmployeeByUserId(userId);

    if (!employee) {
        return <EmptyData page={`Employee Detail ${userId}`}/>
    }
    return (
        <div className="pb-20 space-y-5">
            <EmployeeCVClientAdmin employee={employee}/>
            <EmployeePhotoAdmin employee={employee}/>
        </div>
    );
}

export async function EmployeeFormServerAdmin({idEmployee}: { idEmployee: string }) {
    const employee = await employeeId(idEmployee)

    if (!employee) {
        return <EmptyData page={`Employee Detail ${idEmployee}`}/>
    }
    return (
        <EmployeeFormClientAdmin employee={employee.data} method={'POST'} userId={""}/>
    );
}
