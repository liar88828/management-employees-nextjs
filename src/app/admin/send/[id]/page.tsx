import React from 'react';
import { TContext } from "@/interface/server/param";
import { getContextParam } from "@/utils/requestHelper";
import { getLatterMyId } from "@/server/action/latter.action";
import { LatterInterview } from "@/app/admin/send/[id]/Interview";
import { SendTableEmployee } from "@/app/admin/send/send.client";

export default async function Page(context: TContext) {
    const latterId = await getContextParam(context, 'id')
    const { latter, employees, company } = await getLatterMyId(latterId)
    return (
        <div>
            <h1>latter : { latter.id } Example Paper</h1>
            <SendTableEmployee latter={ latter } employees={ employees }/>
            <LatterInterview
                employee={ employees[0] }
                company={ company }
                form={ latter }/>
        </div>
    );
}
