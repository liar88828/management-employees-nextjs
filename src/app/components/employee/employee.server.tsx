import React from "react";
import { EmployeePhotoAdmin } from "@/app/components/employee/employee.page";
import { employeeFindByUserId, employeeId } from "@/server/network/employee";
import { EmptyData } from "@/app/components/PageErrorData";
import { validSession } from "@/secure/db";
import { getEmployeeByUserIdForIDCard } from "@/server/action/employee.client";
import { departmentGetAllPage } from "@/server/action/department";
import { TEmployeeDB } from "@/interface/entity/employee.model";
import { EmployeeFormClientAdmin } from "@/app/admin/employee/create/employeeFormClientAdmin";
import { EmployeeCVAdmin } from "@/app/components/employee/client/employeeCVAdmin";

export async function EmployeeDetailServerAdmin({ idEmployee }: { idEmployee: string }) {
    const employee = await employeeFindByUserId(idEmployee)

    if (!employee) {
        return <EmptyData page={ `Employee Detail ${ idEmployee }` }/>
    }

    return (
        <div className="pb-20 space-y-5">
            <EmployeeCVAdmin employee={ employee.data } />
            <EmployeePhotoAdmin employee={ employee.data }/>
        </div>
    );
}

export async function EmployeeDetailServerAdminNew({ employee }: { employee: TEmployeeDB }) {
    return (
        <div className="pb-20 space-y-5">
            <EmployeeCVAdmin employee={ employee } />
            {/*<EmployeePhotoAdmin employee={ employee}/>*/ }
            {/*<InterviewShowDocument employee={ employee } />*/ }
            {/*<EmployeePhotos employee={ employee } />*/ }

        </div>
    );
}


export async function EmployeeDetailServerClient() {
    const { userId } = await validSession()

    const employee = await getEmployeeByUserIdForIDCard(userId);

    if (!employee) {
        return <EmptyData page={ `Employee Detail ${ userId }` }/>
    }
    return (
        <div className="pb-20 space-y-5">
            {/*<EmployeeCVAdmin employee={ employee }/>*/ }
            {/*<EmployeePhotoAdmin employee={ employee }/>*/ }
        </div>
    );
}

export async function EmployeeFormServerAdmin({ idEmployee }: { idEmployee: string }) {
    const employee = await employeeId(idEmployee)
    const departments = await departmentGetAllPage()

    if (!employee) {
        return <EmptyData page={ `Employee Detail ${ idEmployee }` }/>
    }
    return (
        <EmployeeFormClientAdmin
            employee={ employee.data }
            method={ 'POST' }
            userId={ "" }
            // departments={ departments }

        />
    );
}
