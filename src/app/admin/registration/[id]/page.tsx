import React from 'react';
import { TContext } from "@/interface/server/param";
import { getContextParam } from "@/utils/toRequest";
import { EmptyData } from "@/app/components/PageErrorData";
import { InterviewShowCVGlobal } from "@/app/admin/interview/components/interviewShowCVGlobal";
import { InterviewShowDocument } from "@/app/admin/interview/components/interviewShowDocument";
import { RegistrationForm } from "@/app/admin/registration/components/RegistrationForm";
import { employeeFindById } from "@/server/action/employee-admin.action";

export default async function Page(context: TContext) {
    const employeeId = await getContextParam(context, 'id')
    const employee = await employeeFindById({ employeeId })
    // const positions: Positions[] = await prisma.positions.findMany()

    if (!employee) {
        return <EmptyData page={ `Employee Detail ${ employeeId }` } />
    }

    return (
        <div className={ 'space-y-4' }>
            <RegistrationForm employee={ employee }
                // positions={ positions }
            />
            <div className="space-x-4">
                <InterviewShowCVGlobal employee={ employee } />
                <InterviewShowDocument employee={ employee } />
            </div>
        </div>
    );
}
