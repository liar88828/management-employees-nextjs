'use client'
import Link from "next/link";
import React from "react";
import { TMenuList } from "@/assets/MenuList";

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
