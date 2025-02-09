import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { EMPLOYEE, TEmployeeDB, TEmployeeSearch } from "@/interface/entity/employee.model";
import { EmployeeCreateZodClient } from "@/validation/employee.valid";
import { PaginatedResponse } from "@/interface/server/param";
import { employeeAll, onUpsertData } from "@/server/network/employee";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useEmployee() {
    const router = useRouter();

    const onUpsert = async (data: EmployeeCreateZodClient, method: "POST" | 'PUT', id?: string) => {
        const idToast = toast.loading('Loading...');
        const response = await onUpsertData(method, data, id);
        if (response) {
            toast.success("Employee created");
            router.replace('/admin/employee');
        } else {
            toast.error("Employee Fail Crate");
        }
        toast.dismiss(idToast)
    };

    const GetAll = ({ search, status }: { search: string, status: string }) => {
        return useInfiniteQuery({
            queryKey: [ EMPLOYEE.KEY, search, status ],
            queryFn: ({ pageParam }) => employeeAll({
                filter: { name: search, status },
                pagination: { page: pageParam }
            }),
            initialPageParam: 1, // Starting page number
            getNextPageParam: (lastPage, allPages) => {
                // Determine the next page number
                // console.log(lastPage)
                if (lastPage.data.data.length === 0 || !lastPage.data) {
                    return undefined
                }
                if (typeof lastPage.data.page === "number") {
                    return lastPage.data.page + 1
                }
                return undefined // `nextPage` returned by the backend
            },
        })
    }

    const useEmployeeInfiniteQuery = (
        debouncedSearch: Omit<TEmployeeSearch, 'page'>,
        filter: Omit<TEmployeeSearch, 'page'>,
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
        } = useInfiniteQuery<PaginatedResponse<TEmployeeDB>, Error>({
            initialPageParam: 1,
            // refetchOnMount: 'always',
            // retryDelay: 5000,
            staleTime: 1000 * 10,
            gcTime: 1000 * 10,
            enabled: debouncedSearch.name === filter.name && debouncedSearch.status === filter.status,
            queryKey: [ EMPLOYEE.KEY, debouncedSearch.name, debouncedSearch.status ],
            queryFn: async ({ pageParam }): Promise<PaginatedResponse<TEmployeeDB>> => {
                // const url = `/product?page=${ pageParam }&name=${ debouncedSearch }`;
                // console.log(url);
                const { data } = await employeeAll({
                    pagination: {
                        page: pageParam as number,
                        limit: 20,
                    },
                    filter: {
                        name: debouncedSearch.name,
                        status: debouncedSearch.status,
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
        onUpsert,
        getAll: GetAll,
        useEmployeeInfiniteQuery
    }
}
