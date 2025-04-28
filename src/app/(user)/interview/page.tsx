import React from 'react';
import IDCardEmployeeGlobal from "@/app/components/employee/client/IDCardEmployeeGlobal";
import { validSession } from "@/secure/db";
import { EmployeeNotFound } from "@/app/components/error/registrationFirst";
import { employeeFindById } from "@/server/controller/employee.controller";
import { STATUS_EMPLOYEE } from "@/interface/enum";
import { redirect } from "next/navigation";
import { exampleCompany } from "@/assets/company";
import EmployeeInterviewCVUser from "@/app/(user)/interview/components/employeeInterviewCVUser";

async function Page() {
    const { userId } = await validSession()
    const employee = await employeeFindById({ userId })
    if (!employee) return <EmployeeNotFound />
    if (employee.status === STATUS_EMPLOYEE.Registration) redirect('/home')
    return (
        <div>
            <h1 className={ 'text-xl font-bold' }>Interview</h1>
            <p>please print this for interview</p>
            <div>
                {/*bg-base-200/50*/ }
                <div className="flex flex-col md:flex-row gap-2    ">
                    <IDCardEmployeeGlobal employee={ employee } company={ exampleCompany } />
                    <EmployeeInterviewCVUser employee={ employee } />
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
