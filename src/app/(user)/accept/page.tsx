import React from 'react';
import { validSession } from "@/secure/db";
import { EmployeeNotFound } from "@/app/components/error/registrationFirst";
import { employeeFindById } from "@/server/controller/employee.controller";
import { STATUS_EMPLOYEE } from "@/interface/enum";
import { redirect } from "next/navigation";

async function Page() {
    const { userId } = await validSession()
    const employee = await employeeFindById({ userId })
    if (!employee) {
        return <EmployeeNotFound />
    }

    if (employee.status !== STATUS_EMPLOYEE.Interview_Accept) {
        redirect('/home')
    }

    return (
        <div>
            <h1 className={ 'text-xl font-bold' }>Accept</h1>
            <p>please print this</p>
            <div>
            </div>

        </div>
    );
}

export default Page;
