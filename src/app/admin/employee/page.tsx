import React from 'react';
import { EmployeeSearchClientAdmin, EmployeeTableClientAdmin } from "@/app/components/employee/employee.client";
import { TContext } from "@/interface/server/param";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { employeeAll } from "@/server/network/employee";
import { getSearchName } from "@/utils/requestHelper";
import { EMPLOYEE } from "@/interface/entity/employee.model";

// export const dynamic = 'force-dynamic';

export default async function page(context: TContext) {
    const name = await getSearchName(context, 'search') ?? ''
    const status = await getSearchName(context, 'status') ?? ''

    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery({
        initialPageParam: 1,
        queryKey: [ EMPLOYEE.KEY, name, status ],
        queryFn: async (context) => {
            const { data } = await employeeAll({
                filter: { name, status },
                pagination: {
                    limit: 20,
                    page: context.pageParam,
                }
            })

            return {
                data: data.data,
                nextCursor: data.page,
            };
        },
    })

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <EmployeeSearchClientAdmin>
                <EmployeeTableClientAdmin />
            </EmployeeSearchClientAdmin>
        </HydrationBoundary>
    );
}
