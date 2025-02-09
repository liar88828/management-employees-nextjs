import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { PAYMENT, TPaymentCreate, TPaymentDB } from "@/interface/entity/payment.model";
import { PaginatedResponse } from "@/interface/server/param";
import { PaymentStore } from "@/store/payment";
import { paymentAll, paymentCreate, paymentDelete, paymentUpdate } from "@/server/network/payment";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function usePayment() {
    function OnGet(searchDebounce: string, search: string) {
        const { data: payments, isError, isFetching } = useQuery(
            {
                select: (payments) => {
                    return payments.data.data
                },
                queryFn: () => paymentAll({
                    filter: { name: searchDebounce },
                    pagination: {}
                }),
                enabled: searchDebounce === search,
                queryKey: [ PAYMENT.KEY, searchDebounce ],
                staleTime: 1000 * 60,

                // gcTime: 1000 * 60,
                // networkMode:'offlineFirst'
            }
        )
        return { payments, isError, isFetching };
    }

    const router = useRouter()
    const onDelete = async (id: string) => {
        const idToast = toast.loading('Delete Data API')
        try {
            await paymentDelete(id)
            toast.success('Success Delete Data');
            router.refresh()
        } catch (e) {
            if (e instanceof Error) {
                console.error(e.message)
                toast.error(e.message);
            }
            toast.error('something error');
        } finally {
            toast.dismiss(idToast)
        }
    }

    const onUpsert = async ({ method, data, id }: {
        method: string, data: TPaymentCreate, id?: string
    }) => {

        const idToast = toast.loading("Send Data to API");
        try {
            if (method === 'POST') {
                await paymentCreate(data)
                toast.success('Success Create Data');
            } else if (method === 'PUT' && id) {
                await paymentUpdate(data, id)
                toast.success('Success Update Data');
            }
            router.push('/admin/payment')
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.error(e)
                toast(e.message);
            }
            toast.error('something error');
        } finally {
            toast.dismiss(idToast);
        }
    }

    const usePaymentInfiniteQuery = (
        debouncedSearch: string,
        { name, ...filter }: PaymentStore['filter'],
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
        } = useInfiniteQuery<PaginatedResponse<TPaymentDB>, Error>({
            initialPageParam: 1,
            // refetchOnMount: 'always',
            // retryDelay: 5000,
            staleTime: 1000 * 10,
            gcTime: 1000 * 10,
            enabled: debouncedSearch === name,
            queryKey: [ PAYMENT.KEY, debouncedSearch ],
            queryFn: async ({ pageParam }): Promise<PaginatedResponse<TPaymentDB>> => {
                // const url = `/product?page=${ pageParam }&name=${ debouncedSearch }`;
                // console.log(url);
                const { data } = await paymentAll({
                    pagination: {
                        page: pageParam as number,
                        limit: 10,
                    },
                    filter: {
                        name: debouncedSearch,
                        // type: filter.type
                    }
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
        onDelete, onUpsert, onGet: OnGet, usePaymentInfiniteQuery
    }
}
