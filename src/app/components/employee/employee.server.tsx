import React from "react";
import { EmployeePhotoAdmin } from "@/app/components/employee/employee.page";
import { employeeFindByUserId } from "@/server/network/employee";
import { EmptyData } from "@/app/components/PageErrorData";
import { employeeRepository } from "@/server/controller";
import { EmployeeCVClientAdmin } from "@/app/components/employee/employee.client.admin";
import { getEmployeeByUserIdRedirect } from "@/server/action/employee.client";

export async function EmployeeDetailServerAdmin({idEmployee}: { idEmployee: string }) {
    const employee = await employeeRepository.findById(idEmployee)

    if (!employee) {
        return <EmptyData page={ `Employee Detail ${ idEmployee }` }/>
    }

    return (
        <div className="pb-20 space-y-5">
            <EmployeeCVClientAdmin employee={ employee }/>
            <EmployeePhotoAdmin employee={ employee }/>
        </div>
    );
}

export async function EmployeeDetailServerUser({ idEmployee }: { idEmployee: string }) {
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
    const employee = await getEmployeeByUserIdRedirect(userId);
    return (
        <div className="pb-20 space-y-5">
            <EmployeeCVClientAdmin employee={employee}/>
            <EmployeePhotoAdmin employee={employee}/>
        </div>
    );
}

