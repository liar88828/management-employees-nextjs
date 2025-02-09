import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { DELIVERY, DeliveryParams, TDeliveryCreate, TDeliveryDB } from "@/interface/entity/delivery.model";
import { PaginatedResponse } from "@/interface/server/param";
import { deliveryAll, deliveryCreate, deliveryDelete, deliveryUpdate } from "@/server/network/delivery";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useDelivery = () => {
    const router = useRouter()
    const onDelete = async (id: string) => {
        const idToast = toast.loading('Delete Data API')
        try {
            await deliveryDelete(id)
            toast.success('Success Delete Data');
            router.refresh()
        } catch (e) {
            if (e instanceof Error) {
                // console.error(e.message)
                toast.error(e.message);
            }
            toast.error('something error');

        } finally {
            toast.dismiss(idToast)
        }
    }

    const GetAll = (option: DeliveryParams, enabled: boolean) => useQuery({
        enabled,
        queryKey: [ DELIVERY.KEY, option?.filter?.name ?? '' ],
        queryFn: () => deliveryAll(option),
        select: (deliverys) => {
            return deliverys.data.data
        }
    })

    const onUpsert = async ({ data, method, id }: {
        data: TDeliveryCreate, method: string, id?: string
    }) => {
        // console.log(data)
        const idToast = toast.loading("Send Data to API");
        try {
            if (method === 'POST') {
                await deliveryCreate(data)
                toast.success('Success Create Data');
            } else if (method === 'PUT' && id) {
                // console.log(data)
                await deliveryUpdate(data, id)
                toast.success('Success Create Data');
            }
            router.push('/admin/delivery')
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.error(e.message)
                toast(e.message);
            }
            toast.error('something error');
        } finally {
            toast.dismiss(idToast);
        }
    }

    const useDeliveryInfiniteQuery = (
        debouncedSearch: string,
        { search }: { search: string },
    ) => {
        const observerRef = useRef<HTMLDivElement | null>(null);

        const {
            data,
            status,
            error,
            fetchNextPage,
            hasNextPage,
            isFetching,
            isFetchingNextPage,
            isLoading,
            isError,
        } = useInfiniteQuery<PaginatedResponse<TDeliveryDB>, Error>({
            initialPageParam: 1,
            // refetchOnMount: 'always',
            // retryDelay: 5000,
            staleTime: 1000 * 10,
            gcTime: 1000 * 10,
            enabled: debouncedSearch === search,
            queryKey: [ DELIVERY.KEY, debouncedSearch ],
            queryFn: async ({ pageParam }): Promise<PaginatedResponse<TDeliveryDB>> => {
                // const url = `/product?page=${ pageParam }&name=${ debouncedSearch }`;
                // console.log(url);
                const { data } = await deliveryAll({
                    filter: {
                        name: debouncedSearch,
                        // type: filter.type
                    },
                    pagination: {
                        page: pageParam as number,
                        limit: 10,
                    },

                })

                return {
                    data: data.data,
                    nextCursor: data.page,
                };
            },

            getNextPageParam: (lastPage) => {
                if (lastPage.data.length === 0 || lastPage.nextCursor === 0) return undefined;
                // console.log(lastPage.nextCursor)
                return lastPage.nextCursor + 1;
            },

            getPreviousPageParam: (firstPage) => {
                if (firstPage.nextCursor <= 1) return undefined;
                return firstPage.nextCursor - 1;
            },

        });

        useEffect(() => {
            if (!hasNextPage) return;

            const observer = new IntersectionObserver(
                ([ entry ]) => {
                    if (entry.isIntersecting) { // noinspection JSIgnoredPromiseFromCall
                        fetchNextPage()
                    }
                },
                { rootMargin: '200px' }
            );

            const observerRefCurrent = observerRef.current

            if (observerRefCurrent) observer.observe(observerRefCurrent);

            return () => {
                if (observerRefCurrent) observer.unobserve(observerRefCurrent);
            };
        }, [ hasNextPage, fetchNextPage, observerRef ]);

        const targetTrigger = <>
            {/* Observer Target for Infinite Scroll */ }
            <div ref={ observerRef } className="text-center py-4 text-gray-500">
                { isFetchingNextPage
                    ? 'Loading more...'
                    : hasNextPage
                        ? 'Scroll down to load more'
                        : 'No more data to load' }
            </div>
            { isFetching && !isFetchingNextPage && <div>Fetching...</div> }
        </>

        return {
            targetTrigger,
            data, status, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage,
            isLoading,
            isError,
        };
    };

    return {
        onDelete, getAll: GetAll, onUpsert,
        useDeliveryInfiniteQuery
    }
}
