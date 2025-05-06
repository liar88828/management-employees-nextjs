import React from 'react';
import { PositionDepartment } from "@/app/admin/position/components/positionDepartment";
import { positionEmployeeLoader } from "@/server/action/position.action";
import { PaginationComponent } from "@/app/components/PaginationComponent";
import { getContextQuery, getContextQueryNum } from "@/utils/toRequest";
import { TContext } from "@/interface/server/param";

export default async function Page(context: TContext) {
    const search = await getContextQuery(context, 'search')
    const status = await getContextQuery(context, 'status')
    const page = await getContextQueryNum(context, 'page')
    const { data, totalPages } = await positionEmployeeLoader(page);
    return (
        <div className="space-y-2">
            <PositionDepartment positions={ data } />
            <PaginationComponent
                currentPage={ page }
                totalPages={ totalPages }
                search={ search }
                status={ status }
                title={ 'position' }
            />
        </div>
    );
}
