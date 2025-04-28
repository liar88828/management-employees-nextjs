import React from 'react';
import { TContext } from "@/interface/server/param";
import { getContextQuery, getContextQueryNum } from '@/utils/requestHelper';
import PositionDetailSearch from './components/positionSearch';
import { PaginationComponent } from '@/app/components/PaginationComponent';
import { employeePositionsLoader } from '@/server/action/employee-admin.action';
import { PositionEmployeeTable } from './components/positionEmployeeTable';

export default async function Page(context: TContext) {
    const search = await getContextQuery(context, 'search')
    const status = await getContextQuery(context, 'status')
    const department = await getContextQuery(context, 'department')
    const page = await getContextQueryNum(context, 'page')
    // const departments = await prisma.departements.findMany()
    const { totalPages, employees } = await employeePositionsLoader({ department, search, page })

    return (
        <div className="space-y-2">
            <PositionDetailSearch department={ department } search={ search } />
            <PositionEmployeeTable employees={ employees } />
            <PaginationComponent
                page={ page }
                totalPages={ totalPages }
                search={ search }
                status={ status }
                department={ department }
                title={ 'position' }
            />
        </div>
    );
}
