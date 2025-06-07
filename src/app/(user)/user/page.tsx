import React from 'react';
import { getUserPage } from "@/secure/db";
import { TContext } from "@/interface/server/param";
import { getContextQuery } from "@/utils/toRequest";
import { UserHomePage } from "@/app/components/UserHomePage";
import { userEmployeeDetailLoader } from "@/action/user-registration-action";

export default async function Page(context: TContext) {
    const message = await getContextQuery(context, 'message')
    const user = await getUserPage()
    const employee = await userEmployeeDetailLoader({ userId: user.id })

    return <UserHomePage employee={ employee } message={ message } user={ user } />
}
