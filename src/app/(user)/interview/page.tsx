import React from 'react';
import EmployeeIDCardInterview from "@/app/components/employee/client/IDCard";
import { EmployeeCVUser } from "@/app/components/employee/client/cv";
import { validSession } from "@/secure/db";
import { EmployeeNotFound } from "@/app/components/error/registrationFirst";
import { employeeFindById } from "@/server/controller/employee.controller";
import { EMPLOYEE_STATUS } from "@/interface/enum";
import { redirect } from "next/navigation";
import { exampleCompany } from "@/assets/company";

async function Page() {
    const { userId } = await validSession()
    const employee = await employeeFindById({ userId })
    if (!employee) return <EmployeeNotFound />
    if (employee.status === EMPLOYEE_STATUS.Registration) redirect('/home')
    return (
        <div className="">
            <h1 className={ 'text-xl font-bold' }>Interview</h1>
            <p>please print this for interview</p>
            <div className="">
                {/*bg-base-200/50*/ }
                <div className="flex flex-col md:flex-row gap-2    ">
                    <EmployeeIDCardInterview employee={ employee } company={ exampleCompany } />
                    <EmployeeCVUser employee={ employee } />
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
