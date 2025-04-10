import React from 'react';
import {validSession} from "@/server/lib/db";
import {getEmployeeByUserId} from "@/server/controller/employee.controller";
import EmployeeIDCardInterview from "@/app/components/employee/IDCard";
import Link from "next/link";
import {EmployeeCV} from "@/app/components/employee/cv";

async function Page() {
    const {userId} = await validSession()

    const employee = await getEmployeeByUserId(userId)
    if (!employee) {
        return <div>
            <h1>
                please Registration First
            </h1>
        </div>
    }
    return (
        <div className="">
            <h1 className={'text-xl font-bold'}>Interview</h1>
            <p>please print this for interview</p>

            <div className="">

                {!employee ? (
                        <div>
                            <h1>
                                please Registration First
                            </h1>
                            <Link href={'/registration'}/>
                        </div>
                    ) :
                    <div className="flex gap-2">
                        <EmployeeIDCardInterview employee={employee}/>
                        <EmployeeCV employee={employee}/>
                        <textarea disabled={true} className={'textarea textarea-md'}>is note for employee, please cut your hair</textarea>
                    </div>

                }
            </div>

        </div>
    )
        ;
}

export default Page;