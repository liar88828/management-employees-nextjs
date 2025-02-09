import React, {useEffect, useRef} from "react";
import toast from "react-hot-toast";
import {PRODUCT, ResponseProductType, TProductCreate, TProductDB} from "@/interface/entity/product.model";
import {PaginatedResponse, ResponseAll} from "@/interface/server/param";
import {ProductStore} from "@/store/product";
import {productAll, productCreate, productDelete, productUpdate, productUpdateStock} from "@/server/network/product";
import {toFetch} from "@/hook/toFetch";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {useRouter} from "next/navigation";

export const useProduct = () => {
    const router = useRouter()

    const onUpsert = async ({data, method, id}: {
        data: TProductCreate, method: string, id?: string
    }) => {
        const idToast = toast.loading("Send Data to API");
        try {
            if (method === 'POST') {
                await productCreate(data)
                toast.success('Success Create Data');
            } else if (method === 'PUT' && id) {
                await productUpdate(data, id)
                toast.success('Success Update Data');
            }
            router.push('/admin/product')
        } catch (e: unknown) {
            if (e instanceof Error) {
                consoleError('useProduct onUpSert', e.message)
                toast(e.message);
            }
            toast.error('something error');
        } finally {
            toast.dismiss(idToast);
        }

    }

    const onDelete = async (id: string) => {
        const idToast = toast.loading('Delete Data API')
        try {
            await productDelete(id)
            toast.success('Success Delete Data');
            router.refresh()
        } catch (e) {
            if (e instanceof Error) {
                // console.error(e.message)
                consoleError('useProduct onDelete', e.message)

                toast.error(e.message);
            }
            toast.error('something error');

        } finally {
            toast.dismiss(idToast)
        }
    }

    const onUpdateStock = async (id: string, data: number) => {
        const idToast = toast.loading('Update Data API')
        try {
            await productUpdateStock({qty: data}, id)
            toast.success('Success Update Data');
            router.refresh()
        } catch (e) {
            if (e instanceof Error) {
                consoleError('useProduct onUpdateStock', e.message)
                toast.error(e.message);
            }
            toast.error('something error');

        } finally {
            toast.dismiss(idToast)
        }
    }

    function getProductUser(search: string, debouncedSearch: string) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useInfiniteQuery<PaginatedResponse<TProductDB>, Error>({
            initialPageParam: 1,
            enabled: !!debouncedSearch || search === '',
            queryKey: [PRODUCT.KEY, debouncedSearch],

            queryFn: async (context): Promise<PaginatedResponse<TProductDB>> => {
                const url = `/product?page=${context.pageParam}&name=${debouncedSearch}`
                consoleLog('useProduct getProductUser', url)
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const {data} = await toFetch<ResponseAll<TProductDB>>('GET', {url});
                return {
                    data: data.data,
                    nextCursor: data.page
                }
            },

            getNextPageParam: (lastPage, pages) => {
                if (lastPage.data.length !== 0) {
                    if (lastPage.nextCursor === 0) {
                        return undefined;
                    } else {
                        return lastPage.nextCursor + 1
                    }
                }
            },

            getPreviousPageParam: (firstPage, pages) => {
                // console.log(firstPage, 'firstPage', pages)

                if (firstPage.nextCursor <= 1) {
                    return undefined
                }
                return firstPage.nextCursor //- 1
            },
        });
    }

    const useProductInfiniteQuery = (
        debouncedSearch: string,
        {name, ...filter}: ProductStore['filter'],
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
        } = useInfiniteQuery<PaginatedResponse<TProductDB>, Error>({
            initialPageParam: 1,
            // refetchOnMount: 'always',
            // retryDelay: 5000,
            staleTime: 1000 * 10,
            gcTime: 1000 * 10,
            enabled: debouncedSearch === name,
            queryKey: [PRODUCT.KEY, debouncedSearch, ...Object.values(filter)],
            queryFn: async ({pageParam}): Promise<PaginatedResponse<TProductDB>> => {
                // const url = `/product?page=${ pageParam }&name=${ debouncedSearch }`;
                // console.log(url);
                const {data} = await productAll({
                    pagination: {
                        page: pageParam as number,
                        limit: 20,
                    },
                    filter: {
                        name: debouncedSearch,
                        new: filter.new,
                        price: filter.price,
                        type: filter.type,
                        // related: filter.related,
                        popular: filter.popular,

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
                ([entry]) => {
                    if (entry.isIntersecting) { // noinspection JSIgnoredPromiseFromCall
                        fetchNextPage()
                    }
                },
                {rootMargin: '200px'}
            );

            const observerRefCurrent = observerRef.current

            if (observerRefCurrent) observer.observe(observerRefCurrent);

            return () => {
                if (observerRefCurrent) observer.unobserve(observerRefCurrent);
            };
        }, [hasNextPage, fetchNextPage, observerRef]);

        const targetTrigger = <>
            {/* Observer Target for Infinite Scroll */}
            <div ref={observerRef} className="text-center py-4 text-gray-500">
                {isFetchingNextPage
                    ? 'Loading more...'
                    : hasNextPage
                        ? 'Scroll down to load more'
                        : 'No more data to load'}
            </div>
            {isFetching && !isFetchingNextPage && <div>Fetching...</div>}
        </>

        return {
            targetTrigger,
            data, status, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage,
            isLoading,
            isError,
        };
    };

    const GetProductType = () => useQuery({
        // initialData: [ { type: "" } ],
        gcTime: 1000 * 60 * 60,
        staleTime: 1000 * 60 * 60,
        select: (response) => response.data.map(d => ({
            title: d.type
        })),
        queryKey: [PRODUCT.KEY, PRODUCT.TYPE],
        queryFn: () => toFetch<ResponseProductType[]>("GET", {
            url: 'product/type',
            cacheData: {
                next: {
                    revalidate: 24 * 60
                }
            }
        }),
    })

    const useProductInfiniteQueryAdmin = (
        debouncedSearch: string,
        {name, ...filter}: ProductStore['filter'],
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
        } = useInfiniteQuery<PaginatedResponse<TProductDB>, Error>({
            initialPageParam: 1,
            // refetchOnMount: 'always',
            // retryDelay: 5000,
            staleTime: 1000 * 10,
            gcTime: 1000 * 10,
            enabled: debouncedSearch === name,
            queryKey: [PRODUCT.KEY, debouncedSearch],
            queryFn: async ({pageParam}): Promise<PaginatedResponse<TProductDB>> => {
                // const url = `/product?page=${ pageParam }&name=${ debouncedSearch }`;
                // console.log(url);
                const {data} = await productAll({
                    pagination: {
                        page: pageParam as number,
                        limit: 20,
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
                ([entry]) => {
                    if (entry.isIntersecting) { // noinspection JSIgnoredPromiseFromCall
                        fetchNextPage()
                    }
                },
                {rootMargin: '200px'}
            );

            const observerRefCurrent = observerRef.current

            if (observerRefCurrent) observer.observe(observerRefCurrent);

            return () => {
                if (observerRefCurrent) observer.unobserve(observerRefCurrent);
            };
        }, [hasNextPage, fetchNextPage, observerRef]);

        const targetTrigger = <>
            {/* Observer Target for Infinite Scroll */}
            <div ref={observerRef} className="text-center py-4 text-gray-500">
                {isFetchingNextPage
                    ? 'Loading more...'
                    : hasNextPage
                        ? 'Scroll down to load more'
                        : 'No more data to load'}
            </div>
            {isFetching && !isFetchingNextPage && <div>Fetching...</div>}
        </>

        return {
            targetTrigger,
            data, status, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage,
            isLoading,
            isError,
        };
    };


    return {
        onUpdateStock, getProductType: GetProductType,
        getProductUser, onDelete, onUpsert, useProductInfiniteQuery,
        useProductInfiniteQueryAdmin

    }
}
