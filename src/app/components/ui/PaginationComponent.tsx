import Link from "next/link";
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function newURL(base: string, params: Record<string, any>) {
    const query = new URLSearchParams();

    for (const key in params) {
        if (params[key] !== undefined && params[key] !== null) {
            query.append(key, String(params[key]));
        }
    }

    return `${ base }?${ query.toString() }`;
}
export function getPaginationPages(currentPage: number, totalPages: number): ( number | string )[] {
    const pageNumbers: ( number | string )[] = [];
    // console.log(totalPages)

    for (let i = 1; i <= totalPages; i++) {

        if (i >= currentPage && i < currentPage + 4) {
            pageNumbers.push(i);
        } else if (i < currentPage && i > currentPage - 4) {
            pageNumbers.push(i);
        }

    }
    // console.log(pageNumbers, 'pageNumbers')
    return pageNumbers;
}

export function PaginationComponent(
    {
        totalPages,
        search,
        status,
        currentPage,
        title,
        position
    }: {
        totalPages: number,
        search: string,
        currentPage: number,
        title: string,
        status?: string,
        position?: string
    }) {

    // const createPageLink = (pageNow: number) => `${ newURL }/admin?page=${ pageNow }`;
    const pageNumbers = getPaginationPages(currentPage, totalPages);
    return (
        <div className="flex justify-center mt-4 space-x-2">
            <Link
                href={
                    newURL(`/admin/${ title }`, {
                        search,
                        status,
                        page: Math.max(currentPage - 1, 1),
                        position
                    })
                }
                className="join-item btn"
            >
                <ChevronLeftIcon />
            </Link>
            { pageNumbers.map((page, idx) => (
                <span key={ idx }>
          { page === '...' ? (
              <button className="join-item btn btn-disabled">...</button>
          ) : (
              <Link
                  href={ newURL(`/admin/${ title }`, {
                      search,
                      status,
                      page: page,
                      position
                  }) }
                  className={ `join-item btn ${ page === currentPage ? 'btn-disabled' : '' }` }
              >
                  { page }
              </Link>
          ) }
        </span>
            )) }

            <Link
                href={
                    newURL(`/admin/${ title }`, {
                        search,
                        status,
                        page: Math.min(currentPage + 1, totalPages),
                        position
                    })
                }

                className="join-item btn"
            >
                <ChevronRightIcon />

            </Link>
        </div>

    );
}
