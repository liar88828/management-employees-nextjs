import React from 'react';
import { EmployeeIDCard } from "@/app/(user)/employee/card/card.client";
import { validSession } from "@/secure/db";
import { getEmployeeByUserIdForIDCard } from "@/server/action/employee.client";
import { exampleCompany } from "@/assets/company";
import { findCompanyForUser } from "@/server/action/company";
import Link from "next/link";
import { PrintComponent } from "@/app/components/employee/employee.client.admin";

async function Page() {
    const { userId } = await validSession()
    const employee = await getEmployeeByUserIdForIDCard(userId)
    const company = await findCompanyForUser()
    console.log(employee)

    if (!employee) {
        return (
            <div className="card card-body bg-base-200">
                <h1 className={ 'card-title' }>Status is Pending
                </h1>
                <p>Please What Your Status Is Pending You Must be Interview First</p>
                <p className={ 'text-xs text-base-content/50' }>UserId : { userId }</p>
                <div className="card-actions">
                    <Link className={ 'btn btn-info' } href={ '/home' }>Back </Link>
                </div>
            </div>)
    }

    return (
        <div>


            { !company && (
                <div className="card card-body">
                    <h1 className={ 'card-title' }>System Busy</h1>
                </div>
            ) }
            <PrintComponent>
                <EmployeeIDCard employee={ employee } company={ company ?? exampleCompany }/>
            </PrintComponent>
        </div>
    );
}

export default Page;

