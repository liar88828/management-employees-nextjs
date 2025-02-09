import React from 'react'
import { DeliveryListClientAdmin, DeliverySearchClientAdmin } from "@/app/components/delivery/delivery.client";
import { TContext } from "@/interface/server/param";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { deliveryAll } from "@/server/network/delivery";
import { getSearchName } from "@/utils/requestHelper";
import { DELIVERY } from "@/interface/entity/delivery.model";

export default async function page(context: TContext) {
    const search = await getSearchName(context, 'search') ?? ''
    // const isKey = [  ]
    // console.log('is server', isKey)
    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery({

        queryKey: [ DELIVERY.KEY, search ],
        initialPageParam: 1,
        queryFn: async (context) => {
            const { data } = await deliveryAll({
                filter: { name: search },
                pagination: {
                    page: context.pageParam,
                    limit: 10
                }
            })
            return {
                data: data.data,
                nextCursor: data.page,
            };
        },
    });

    return (
        <HydrationBoundary state={
            dehydrate(queryClient, {
                shouldDehydrateQuery: () => true
            }) }
        >
            <DeliverySearchClientAdmin>
                <DeliveryListClientAdmin />
            </DeliverySearchClientAdmin>
        </HydrationBoundary>
    )
}
