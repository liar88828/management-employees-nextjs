import React from 'react';
import { TContext } from "@/interface/server/param";
import { getContextQuery, getContextQueryNum } from '@/utils/toRequest';
import PositionDetailSearch from './components/positionSearch';
import { PaginationComponent } from '@/app/components/PaginationComponent';
import { employeePositionsLoader } from '@/server/action/employee-admin.action';
import { PositionEmployeeTable } from './components/positionEmployeeTable';

export default async function Page(context: TContext) {
    const search = await getContextQuery(context, 'search')
    const status = await getContextQuery(context, 'status')
    const position = await getContextQuery(context, 'position')
    const page = await getContextQueryNum(context, 'page')
    // const positions = await prisma.positions.findMany()
    const { totalPages, employees } = await employeePositionsLoader({ position, search, page })

    return (
        <div className="space-y-2">
            <PositionDetailSearch position={ position } search={ search } />
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
