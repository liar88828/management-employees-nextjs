import React, { useEffect, useRef } from "react";
import { UseInfiniteQueryResult } from "@tanstack/react-query";

interface UseInfinityScrollProps {
    queryResult: UseInfiniteQueryResult<any, unknown>; // React Query's result type
}

export function useInfinityScroll({ queryResult }: UseInfinityScrollProps) {
    const { fetchNextPage, hasNextPage, isFetchingNextPage } = queryResult;
    const loadMoreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    // noinspection JSIgnoredPromiseFromCall
                    fetchNextPage()
                }
            },
            { threshold: 1.0 }
        );
        // Capture the current ref value
        const currentRef = loadMoreRef.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ fetchNextPage, hasNextPage ]);

    const targetTrigger = <>
        {/* Loading Indicator */ }
        <div ref={ loadMoreRef } className="text-center p-4">
            { isFetchingNextPage && <p>Loading more...</p> }
        </div>

        {/* No More Data */ }
        { !hasNextPage && <p className="text-center mt-4">No more employees to load.</p> }
    </>

    return { loadMoreRef, isFetchingNextPage, hasNextPage, targetTrigger };
}
