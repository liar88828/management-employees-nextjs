import React from 'react';
import EmployeeIDCardInterview from "@/app/components/employee/client/IDCard";
import { EmployeeCV } from "@/app/components/employee/client/cv";
import { validSession } from "@/secure/db";
import { RegistrationFirst } from "@/app/components/error/registrationFirst";
import { getEmployeeById } from "@/server/controller/employee.controller";
import { EMPLOYEE_STATUS } from "@/interface/enum";
import { redirect } from "next/navigation";
import { prisma } from "@/config/prisma";

async function Page() {
    const { userId } = await validSession()
    const employee = await getEmployeeById({ userId })
    const company = await prisma.companys.findFirst()
    if (!employee) {
        return <RegistrationFirst/>
    }
    if (!company) {
        return <h1>Error</h1>
    }
    if (employee.status !== EMPLOYEE_STATUS.Interview) {
        redirect('/home')
    }
    return (
        <div className="">
            <h1 className={ 'text-xl font-bold' }>Interview</h1>
            <p>please print this for interview</p>
            <div className="">
                <div className="flex gap-2 flex-col sm:flex-row">
                    <EmployeeIDCardInterview employee={ employee } company={ company }/>
                    <EmployeeCV employee={ employee }/>
                </div>
                <div>
                    <div className="divider"></div>
                    <h1>Notes</h1>
                    <p>{ employee.notes }</p>
                </div>
            </div>
        </div>
    )
}

export default Page;