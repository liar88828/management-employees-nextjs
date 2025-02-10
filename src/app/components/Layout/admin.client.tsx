'use client'
import Link from "next/link";
import {ChevronLeftIcon,} from 'lucide-react';
import React from "react";
import {TMenuList} from "@/assets/MenuList";

export function LinkListLayoutAdmin({ item, path }: {
    item: TMenuList,
    path: string
}) {

    // console.log( path)
    return (
        <li>
            <Link
                href={ item.href }
                className={ `flex items-center p-2 rounded  ${ path.includes(item.href) ? "btn-active" : "" }` }
            >
                { item.icon }
                <span className="flex-1 ms-3 whitespace-nowrap">{ item.label }</span>
                { item.add && <span className=" badge-neutral badge">{ item.add }</span> }
            </Link>
        </li>
    );
}

export function AuthLayoutAdmin() {
    return (
        <div className="navbar bg-base-200/50 fixed ">
            <div className="flex-1">
                <Link
                    href={ "/" }
                    className="btn btn-ghost text-xl btn-square "
                >
                    <ChevronLeftIcon />
                </Link>

            </div>
            <div className="flex-none">
            </div>
        </div>
    );
}
