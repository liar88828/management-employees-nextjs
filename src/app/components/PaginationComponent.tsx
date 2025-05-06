import Link from "next/link";
import React from 'react';
import { prisma } from "@/config/prisma";
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

export function _getPaginationPages(currentPage: number, totalPages: number): ( number | string )[] {
    const pageNumbers: ( number | string )[] = [];

    for (let i = 1; i <= totalPages; i++) {
        if (
            i <= 2 || // always show first 2 pages
            i > totalPages - 2 || // always show last 2 pages
            ( i >= currentPage - 1 && i <= currentPage + 1 ) // show near current currentPage
        ) {
            pageNumbers.push(i);
        } else if (pageNumbers[pageNumbers.length - 1] !== '...') {
            pageNumbers.push('...');
        }
    }

    return pageNumbers;
}

export function __getPaginationPages(currentPage: number, totalPages: number): ( number | string )[] {
    const pageNumbers: ( number | string )[] = [];
    console.log(totalPages)
    for (let i = 1; i <= totalPages; i++) {
        if (
            i <= 3 || // always show first 3
            i > totalPages - 3 // always show last 3
        ) {
            pageNumbers.push(i);
        } else if (pageNumbers[pageNumbers.length - 1] !== '...') {
            pageNumbers.push('...');
        }
    }

    return pageNumbers;
}
export function getPaginationPages(currentPage: number, totalPages: number): ( number | string )[] {
    const pageNumbers: ( number | string )[] = [];
    console.log(totalPages)

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
            {/*{ Array.from({ length: totalPages }, (_, i) => (*/ }
            {/*    <Link*/ }
            {/*        key={ i + 1 }*/ }
            {/*        href={*/ }
            {/*            newURL(`/admin/${ title }`, {*/ }
            {/*                search,*/ }
            {/*                status,*/ }
            {/*                page: i + 1,*/ }
            {/*                position*/ }
            {/*            })*/ }
            {/*        }*/ }
            {/*        className={ `btn ${ currentPage === i + 1 ? 'btn-primary' : 'btn-outline' }` }*/ }
            {/*    >*/ }
            {/*        { i + 1 }*/ }
            {/*    </Link>*/ }
            {/*)) }*/ }

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

async function PaginationComponentx() {
    const data = await prisma.employees.findMany()
    return (
        <div>
            <div className="join">
                <button className="join-item btn">«</button>
                <button className="join-item btn">1</button>
                <button className="join-item btn">2</button>
                <button className="join-item btn btn-disabled">...</button>
                <button className="join-item btn">99</button>
                <button className="join-item btn">100</button>
                <button className="join-item btn">»</button>
            </div>
        </div>
    );
}
