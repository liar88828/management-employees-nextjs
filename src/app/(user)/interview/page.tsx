import React from 'react';
import { validSession } from "@/secure/db";
import { EmployeeNotFound } from "@/app/components/error/registrationFirst";
import { STATUS_EMPLOYEE } from "@/interface/enum";
import { redirect } from "next/navigation";
import { employeeFindById } from "@/server/action/employee-admin.action";
import { InterviewPage } from "@/app/(user)/interview/components/interviewPage";

export default async function Page() {
    const { userId } = await validSession()
    const employee = await employeeFindById({ userId })
    if (!employee) return <EmployeeNotFound />
    if (employee.status === STATUS_EMPLOYEE.Registration) redirect('/home?message=Please Complete Registration');
    return ( <InterviewPage employee={ employee } /> )
}
