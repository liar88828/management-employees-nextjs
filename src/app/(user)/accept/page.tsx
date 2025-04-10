import React from 'react';
import { validSession } from "@/secure/db";
import { getEmployeeByUserIdForIDCard } from "@/server/action/employee.client";
import { RegistrationFirst } from "@/app/components/error/registrationFirst";

async function Page() {
    const { userId } = await validSession()
    const employee = await getEmployeeByUserIdForIDCard(userId)
    if (!employee) {
        return <RegistrationFirst/>
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