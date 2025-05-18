'use client'
import { TEmployeeDB } from "@/interface/entity/employee.model";
import IDCardEmployeeGlobal from "@/app/components/employee/client/IDCardEmployeeGlobal";
import { exampleCompany } from "@/assets/company";
import EmployeeInterviewCVUser from "@/app/(user)/interview/components/employeeInterviewCVUser";
import React from "react";
import { STATUS_EMPLOYEE } from "@/interface/enum";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function InterviewPage({ employee }: {
    employee: TEmployeeDB,
}) {
    const router = useRouter();

    if (employee.status === STATUS_EMPLOYEE.Registration) {
        toast.error('Please Complete Registration');
        router.push('/user')
        return <h1>

        </h1>
    }
    return (
        < >
            <h1 className={ 'text-xl font-bold' }>Interview</h1>
            <p>please print this for interview</p>
            <div>
                {/*bg-base-200/50*/ }
                <div className="flex flex-col md:flex-row gap-2    ">
                    <IDCardEmployeeGlobal employee={ employee } company={ exampleCompany } />
                    <EmployeeInterviewCVUser employee={ employee } />
                </div>
                <div>
                    <div className="divider"></div>
                    <h1>Notes</h1>

                    <textarea
                        disabled
                        className={ 'textarea textarea-bordered w-full' }
                        defaultValue={ employee.notes }
                    ></textarea>
                </div>
            </div>
        </ >
    );
}
