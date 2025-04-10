import React from 'react';
import { validSession } from "@/secure/db";
import { getEmployeeByUserIdForIDCard } from "@/server/action/employee.client";

async function Page() {
    const { userId } = await validSession()
    const employee = await getEmployeeByUserIdForIDCard(userId)

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