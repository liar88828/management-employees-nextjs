import React from "react";
import { FilterDialog, OrderSearch, OrderTableClientAdmin } from "@/app/components/order/OrderTable.client";
import { ORDER } from "@/interface/entity/order.model";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { orderAll } from "@/server/network/order";

export default async function Page() {
    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery({
        initialPageParam: 1,
        queryKey: [ ORDER.KEY, '', '' ],
        queryFn: async (context) => {
            const { data } = await orderAll({
                pagination: {
                    page: context.pageParam,
                    limit: 20,
                },
                filter: {
                    name: '',
                    status: '',
                    // type: filter.type
                }
            })

            return {
                data: data.data,
                nextCursor: data.page,
            };
        },
    });

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <OrderSearch>
                <FilterDialog />
                <OrderTableClientAdmin />
            </OrderSearch>
        </HydrationBoundary>
    );
}
