import React from 'react';
import { toDateIndo } from "@/utils/toDate";
import { statusEmployee } from "@/utils/statusEmployee";
import Link from "next/link";
import { CVEmployeeModal } from "@/app/components/Letter/cv/EmployeeCVGlobal";
import { EmployeeShowDocument } from "@/app/components/AdminEmployeeDetailPage";
import { TEmployeeDB, UserDB } from "@/interface/model";

export function UserHomePage({ employee, message, user }: {
    employee: TEmployeeDB | null,
    message?: string,
    user: UserDB
}) {
    const hasEmployee = Boolean(employee);
    const employeeStatus = statusEmployee(employee);

    const errorArray: { message: string }[] = [
        { message: message || '' },
        { message: employeeStatus || '' },
        { message: !hasEmployee ? 'Please Complete Register will Show' : '' }
    ].filter(e => e.message); // remove empty messages

    return (
        <div>
            <div className="card bg-base-200">
                <div className="card-body">
                    <div className="">
                        <h1 className="card-title">{ user?.name }</h1>
                        <p className="text-sm">ID # { employee?.id || 'Empty' }</p>
                        <p>Register At: { employee ? toDateIndo(employee.createdAt) : 'Empty' }</p>
                        <p>Status: { employeeStatus }</p>
                    </div>

                    <div>
                        <p className="font-bold">Note:</p>
                        {
                            !employee?.statusEmployee.includes('Accept') &&
                            errorArray.map((err, index) => (
                                <p key={ index } className="text-error text-xs  italic">
                                    - { err.message }
                                </p>
                            )) }
                    </div>

                    <div className="card-actions">
                        <Link
                            href="/registration"
                            className={ `btn btn-primary ${ hasEmployee ? 'btn-disabled' : '' }` }
                        >
                            Registration
                        </Link>

                        <CVEmployeeModal employee={ employee } />
                        <EmployeeShowDocument employee={ employee } />
                    </div>
                </div>
            </div>
        </div>
    );
}
