import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { ORDER, OrderFilter, OrderParams } from "@/interface/entity/order.model";
import { OrderCreateAdmin, OrderCreateClient } from "@/validation/order.valid";
import { PaginatedResponse } from "@/interface/server/param";
import { TMethod, TStatusOrder } from "@/interface/Utils";
import { TOrderTransactionDB } from "@/interface/entity/transaction.model";
import { orderAll, orderCreate, orderDelete, orderId, orderUpdate } from "@/server/network/order";
import { orderTransactionSanitize } from "@/sanitize/order.sanitize";
import { toFetch } from "@/hook/toFetch";
import { useDeliveryStore } from "@/store/delivery";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { usePaymentStore } from "@/store/payment";
import { useProductStore } from "@/store/product";
import { useReceiverStore } from "@/store/receiver";
import { useRouter } from "next/navigation";
import { revalidateTag } from "next/cache";
import { STATUS } from "@/app/components/toStatus";

export function useOrder() {
    const router = useRouter();
    const product = useProductStore();
    const delivery = useDeliveryStore()
    const receiver = useReceiverStore()
    const payment = usePaymentStore()

    const onUpsertAdmin = useMutation({
        onMutate: () => {
            return { toastId: toast.loading('Loading...') }
        },
        onSettled: (_, __, ___, context) => {
            if (context) {
                toast.dismiss(context.toastId)
            }
        },
        mutationFn: ({ data, method, id }: {
            method: TMethod,
            data: OrderCreateAdmin,
            id?: string,
        }) => {

            const sanitize = orderTransactionSanitize({
                product: product.productStore,
                payment: payment.payment,
                delivery: delivery.delivery,
                receiver: {
                    address: data.addressCs,
                    name: data.nameCs,
                    phone: data.phoneCs,
                    id: data.id_customer
                },
                order: data,
            })
            // console.log(sanitize)
            if (method === 'PUT' && id) {
                return orderUpdate(sanitize, id)
            } else {
                return orderCreate(sanitize)
            }
        },
        onError: (data, _variables, _context) => {
            if (data instanceof Error) {
                toast.error(data.message)
            }
        },
        onSuccess: (data, variables, _context) => {
            toast.success(data.msg)
            product.reset()
            delivery.reset()
            payment.reset()
            if (variables.method === 'PUT') {
                router.push(`/admin/order/${ variables.id }`)
            } else {
                router.push('/admin/order')
            }
        },
    })

    const onUpsertUser = useMutation({
        onMutate: () => {
            return { toastId: toast.loading('Loading...') }
        },
        onSettled: (_, __, ___, context) => {
            if (context) {
                toast.dismiss(context.toastId)
            }
        },

        mutationFn: ({ data }: {
            method: TMethod,
            data: OrderCreateClient,
        }) => {

            if (!payment.payment) {
                throw new Error('Payment is not complete');
            }
            if (!delivery.delivery) {
                throw new Error('Delivery is not complete');
            }
            if (product.productStore.length === 0) {
                throw new Error('product is Empty');
            }

            const sanitize = orderTransactionSanitize({
                product: product.productStore,
                payment: payment.payment,
                delivery: delivery.delivery,
                receiver: receiver.receiver,
                order: data,
            })
            return orderCreate(sanitize)
        },

        onError: (data) => {
            if (data instanceof Error) {
                toast.error(data.message)
            }
        },
        onSuccess: (data) => {
            toast.success(data.msg)
            product.reset()
            delivery.reset()
            receiver.reset()
            payment.reset()
            revalidateTag('incoming')
            revalidateTag(STATUS.PENDING)
            router.push(`/invoice/${ data.data.order.id }?redirect=/home`)
        },
    })

    const GetAll = ({ filter, pagination }: OrderParams, debounce: OrderParams['filter']) => {
        return useQuery({
            enabled: filter?.status === debounce?.status && filter?.name === debounce?.name,
            select: (orders) => orders.data.data,
            queryFn: () => orderAll({ filter, pagination }),
            queryKey: [ ORDER.KEY,
                filter?.name ?? '',
                filter?.status ?? ''
            ],

        })
    }
    const GetId = (id: string) => {
        return useQuery({
            queryKey: [ ORDER, id ],
            queryFn: () => orderId(id),
            select: (response) => response.data
        })
    }
    const onDelete = useMutation({
        mutationFn: orderDelete,
        onSuccess: () => {
            toast.success('Success Delete Order')
            router.push('/admin/order')
        },
        onError: () => {
            toast.error('Fail Delete Order')
        }
    })
    //
    const GetOrderStatus = (status: TStatusOrder) => useQuery({
        queryKey: [ ORDER.KEY, status ],
        queryFn: () => {
            return toFetch<number>('GET', {
                url: `/order/count?status=${ status }`,
                cacheData: {
                    // cache: 'default',
                    next: {
                        revalidate: 60,
                        // tags: [ 'cached',status ]
                    }
                }
            })
        },
        select: (response) => response.data,
        gcTime: 5 * 60 * 1000,
        refetchOnMount: false,
        // initialData:()=> ({
        //     data:0
        // })
    })
    //

    // const GetOrderStatus =  (status: TStatusOrder) => {
    //     return toFetch<number>('GET', {
    //         url: `/order/count?status=${ status }`,
    //         cacheData: {
    //             // cache: 'default',
    //             next: {
    //                 revalidate: 60,
    //                 // tags: [ 'cached',status ]
    //             }
    //         }
    //     }).then(response => {
    //         // console.log(response)
    //         return response.data
    //     })
    //
    //     // initialData:()=> ({
    //     //     data:0
    //     // })
    // }

    const useOrderInfiniteQuery = (
        debouncedSearch: OrderFilter,
        filter: OrderFilter,
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
        } = useInfiniteQuery<PaginatedResponse<TOrderTransactionDB>, Error>({
            initialPageParam: 1,
            // refetchOnMount: 'always',
            // retryDelay: 5000,
            staleTime: 1000 * 10,
            gcTime: 1000 * 10,
            enabled: debouncedSearch.name === filter.name && debouncedSearch.status === filter.status,
            queryKey: [ ORDER.KEY, debouncedSearch.name, debouncedSearch.status ],
            queryFn: async ({ pageParam }): Promise<PaginatedResponse<TOrderTransactionDB>> => {
                // const url = `/product?page=${ pageParam }&name=${ debouncedSearch }`;
                // console.log(url);
                const { data } = await orderAll({
                    pagination: {
                        page: pageParam as number,
                        limit: 20,
                    },
                    filter: {
                        name: debouncedSearch.name,
                        status: debouncedSearch.status,
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
        getOrderStatus: GetOrderStatus,
        onUpsertUser,
        onUpsertAdmin,
        getAll: GetAll,
        getId: GetId,
        onDelete,
        useOrderInfiniteQuery
    }
}
