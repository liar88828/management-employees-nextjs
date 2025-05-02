import React from 'react';
import { TContext } from "@/interface/server/param";
import { getContextQuery, getContextQueryNum } from "@/utils/toRequest";
import { employeePositionsLoader } from "@/server/action/employee-admin.action";
import { PaginationComponent } from "@/app/components/PaginationComponent";

import { PositionEmployeeTable } from "@/app/admin/position/components/positionEmployeeTable";
import PositionDetailSearch from "@/app/admin/position/components/positionSearch";

export default async function Page(context: TContext) {
    const search = await getContextQuery(context, 'search')
    const status = await getContextQuery(context, 'status')
    const position = await getContextQuery(context, 'position')
    const page = await getContextQueryNum(context, 'page')
    // const positions = await prisma.positions.findMany({})
    const { totalPages, employees } = await employeePositionsLoader({ position, search, page })

    return (
        <div className="space-y-2">
            <PositionDetailSearch search={ search } position={ position } />
            <PositionEmployeeTable employees={ employees } />
            <PaginationComponent
                page={ page }
                totalPages={ totalPages }
                search={ search }
                status={ status }
                position={ position }
                title={ 'position' }
            />
        </div>
    );
}
