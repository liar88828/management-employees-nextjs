import React from 'react'
import { PRODUCT } from "@/interface/entity/product.model";
import { ProductListClientAdmin, ProductSearchClientAdmin } from "@/app/components/product/product.client";
import { TContext } from "@/interface/server/param";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/app/components/Layout/ReactQueryProvider.server";
import { getSearchName } from "@/utils/requestHelper";
import { productAll } from "@/server/network/product";

// export const revalidate = 0

export default async function page(context: TContext) {
    const search = await getSearchName(context, 'search') ?? ''
    const queryClient = getQueryClient()
    // console.log(isKey, 'is server')
    await queryClient.prefetchInfiniteQuery({
        initialPageParam: 1,
        queryKey: [ PRODUCT.KEY, search ],
        queryFn: async (context) => {
            const { data } = await productAll({
                pagination: {
                    page: context.pageParam as number,
                    limit: 20,
                },
                filter: {
                    name: search,
                }
            })

            return {
                data: data.data,
                nextCursor: data.page,
            };
        }
    })

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <ProductSearchClientAdmin>
                <ProductListClientAdmin />
            </ProductSearchClientAdmin>
        </HydrationBoundary>
    )
}
