import React from 'react';
import { TContext } from "@/interface/server/param";
import { getContextParam } from "@/utils/requestHelper";
import { employeeRepository } from "@/server/controller";
import { EmptyData } from "@/app/components/PageErrorData";
import { FormInbox } from "@/app/admin/inbox/inbox.client";
import { EmployeeCV, EmployeePhotos } from "@/app/components/employee/employee.page";

export default async function Page(context: TContext) {
    const employeeId = await getContextParam(context, 'id')
    const employee = await employeeRepository.findById({ employeeId })
    if (!employee) {
        return <EmptyData page={ `Employee Detail ${ employeeId }` }/>
    }
    return (
        <div className={ 'space-y-10' }>
            <FormInbox employee={ employee }/>
            <EmployeeCV employee={ employee }/>
            <EmployeePhotos employee={ employee }/>
        </div>
    );
}
