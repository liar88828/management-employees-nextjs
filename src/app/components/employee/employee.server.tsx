import React from "react";
import { EmployeeCV, EmployeePhotoAdmin } from "@/app/components/employee/employee.page";
import { EmptyData } from "@/app/components/PageErrorData";
import { PrintComponent } from "@/app/components/employee/employee.client.admin";
import { getEmployeeById } from "@/server/controller/employee.controller";

export async function EmployeeDetailServerAdmin({ employeeId }: { employeeId: string }) {
    const employee = await getEmployeeById({ employeeId: employeeId })

    if (!employee) {
        return <EmptyData page={ `Employee Detail ${ employeeId }` }/>
    }
    return (
        <div className="pb-20 space-y-5">
            <PrintComponent href={ `/${ employee.id }/edit` }>
                <EmployeeCV employee={ employee }/>
            </PrintComponent>
            <EmployeePhotoAdmin employee={ employee }/>
        </div>
    );
}

