import React from 'react';
import { TContext } from "@/interface/server/param";
import { getContextQuery } from "@/utils/toRequest";
import { EmployeeCompletePhotoType, STATUS_EMPLOYEES } from "@/interface/enum";
import { adminRegistrationPageLoader } from "@/action/admin-registration-action";
import { AdminRegistrationPage } from "@/app/components/AdminRegistrationPage";

export default async function Page(context: TContext) {
    const name = await getContextQuery(context, 'search')
    const status = await getContextQuery(context, 'status') as EmployeeCompletePhotoType
    const page = Number(await getContextQuery(context, 'page')) || 1;
    const {
        totalPages,
        employees
    } = await adminRegistrationPageLoader(name,
        [
            STATUS_EMPLOYEES.Registration,
            STATUS_EMPLOYEES.Reject,
            // STATUS_EMPLOYEE.Interview,
            // STATUS_EMPLOYEE.Interview_Reject,
        ],
        page, status)

    return ( <AdminRegistrationPage name={ name }
                                    page={ page }
                                    status={ status }
                                    employees={ employees }
                                    totalPages={ totalPages }

        />

    );
}
