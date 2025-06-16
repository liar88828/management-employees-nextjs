'use client'
import { useRouter } from "next/navigation";
import { STATUS_EMPLOYEE } from "@/interface/enum";
import toast from "react-hot-toast";
import { CVEmployeeUser } from "@/app/components/Letter/cv/EmployeeCVGlobal";
import React from "react";
import { TEmployeeDB } from "@/interface/model";


export function UserInterviewPage({ employee }: {
    employee: TEmployeeDB,
}) {
    const router = useRouter();

    if (employee.statusEmployee === STATUS_EMPLOYEE.Registration) {
        toast.error('Please Complete Registration');
        router.push('/user')
    }

    return (
        <>
            <h1 className={ 'text-xl font-bold' }>Interview</h1>
            <p>please print this for interview</p>
            <div>
                {/*bg-base-200/50*/ }
                <div className="flex flex-col md:flex-row gap-2    ">
	                {/*<EmployeeIDCardGlobal employee={ employee } />*/ }
	                <CVEmployeeUser employee={ employee } />
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
