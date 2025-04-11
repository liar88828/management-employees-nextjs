import React from 'react';
import EmployeeIDCardInterview from "@/app/components/employee/client/IDCard";
import Link from "next/link";
import { EmployeeCV } from "@/app/components/employee/client/cv";
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
            <h1 className={ 'text-xl font-bold' }>Interview</h1>
            <p>please print this for interview</p>

            <div className="">

                { !employee ? (
                        <div>
                            <h1>
                                please Registration First
                            </h1>
                            <Link href={ '/registration' }/>
                        </div>
                    ) :
                    <div className="flex gap-2">
                        <EmployeeIDCardInterview employee={ employee }/>
                        <EmployeeCV employee={ employee }/>
                        <textarea disabled={ true } className={ 'textarea textarea-md' }>is note for employee, please cut your hair</textarea>
                    </div>

                }
            </div>

        </div>
    )
        ;
}

export default Page;