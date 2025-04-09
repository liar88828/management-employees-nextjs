import React from 'react';
import {validSession} from "@/server/lib/db";
import {getEmployeeByUserId} from "@/server/controller/employee.controller";

async function Page() {
    const {userId} = await validSession()

    const employee = await getEmployeeByUserId(userId)

    return (
        <div className="">
            <h1 className={'text-xl font-bold'}>Accept</h1>
            <p>please print this</p>
            <div className="">
            </div>

        </div>
    );
}

export default Page;