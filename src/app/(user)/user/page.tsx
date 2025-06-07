import React from 'react';
import { toDateIndo } from "@/utils/toDate";
import { validSession } from "@/secure/db";
import { InterviewShowCVGlobal } from "@/app/components/Letter/interviewShowCVGlobal";
import { EmployeeShowDocument } from "@/app/components/Letter/employeeShowDocument";
import { employeeFindById } from "@/app/admin/employee/employee-admin.action";
import Link from "next/link";
import { TContext } from "@/interface/server/param";
import { getContextQuery } from "@/utils/toRequest";
import { statusEmployee } from "@/utils/statusEmployee";

async function Page(context: TContext) {
    const message = await getContextQuery(context, 'message');
    const { userId } = await validSession();
    const employee = await employeeFindById({ userId });

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
                    <h1 className="card-title">
                        ID # { employee?.id || 'Empty' }
                    </h1>
                    <p>Register At: { employee ? toDateIndo(employee.createdAt) : 'Empty' }</p>
                    <p>Status: { employeeStatus }</p>

                    <div>
                        <p className="font-bold">Note:</p>
                        {
                            !employee?.status.includes('Accept') &&
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

                        <InterviewShowCVGlobal employee={ employee } />
                        <EmployeeShowDocument employee={ employee } />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
