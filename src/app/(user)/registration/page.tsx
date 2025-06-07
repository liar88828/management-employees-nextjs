import React from 'react';
import { getUserPage } from "@/secure/db";
import { getContextQuery } from "@/utils/toRequest";
import { TContext } from "@/interface/server/param";
import { UserRegistrationPage } from "@/app/components/UserRegistrationPage";
import { userEmployeeDetailLoader } from "@/action/user-registration-action";

export default async function Page(context: TContext) {
    const error = await getContextQuery(context, 'error')
    const type = await getContextQuery(context, 'type')
    const user = await getUserPage()
    const employee = await userEmployeeDetailLoader({ userId: user.id })
// console.log(employee)
    return ( <UserRegistrationPage
            employee={ employee }
            method={ employee ? "PUT" : 'POST' }
            user={ user }
            type={ type }
            error={ error }
        />
    );
}
