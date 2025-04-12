import React from 'react';
import { validSession } from "@/secure/db";
import { RegistrationFirst } from "@/app/components/error/registrationFirst";
import { getEmployeeById } from "@/server/controller/employee.controller";
import { EMPLOYEE_STATUS } from "@/interface/enum";
import { redirect } from "next/navigation";

async function Page() {
    const { userId } = await validSession()
    const employee = await getEmployeeById({ userId })
    if (!employee) {
        return <RegistrationFirst/>
    }

    if (employee.status !== EMPLOYEE_STATUS.Interview) {
        redirect('/home')
    }

    return (
        <div className="">
            <h1 className={ 'text-xl font-bold' }>Accept</h1>
            <p>please print this</p>
            <div className="">
            </div>

        </div>
    );
}

export default Page;