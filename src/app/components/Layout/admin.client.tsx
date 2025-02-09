'use client'
import Link from "next/link";
import { ChevronLeftIcon, LogOut, Menu, } from 'lucide-react';
import React, { ReactNode, useState } from "react";
import { linkPrimary, linkSecondary, TMenuList } from "@/assets/MenuList";
import { logout } from "@/server/lib/state";
import { usePathname } from "next/navigation";
import { useScrollVisibility } from "@/hook/UseScrollVisibility";
import { BackButton } from "@/app/components/backButton";

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

export function BaseLayoutAdmin({ children2, children, isLogin }: {
    children2: ReactNode,
    children: ReactNode,
    isLogin: boolean
}) {
    const path = usePathname()
    const [ sideMenuIsExpand, setSideMenuIsExpand ] = useState(true);

    // Use custom hook for visibility
    const showNavbar = useScrollVisibility(true);
    const showBottomNav = useScrollVisibility(true);

    return ( <>
            <div
                className={ `navbar bg-base-200/50 fixed top-0 start-0 z-20 w-full transition-transform duration-300 ${
                    showNavbar ? 'translate-y-0' : '-translate-y-full'
                }` }
            >
                {/*<div className="navbar bg-base-200/50  fixed w-full z-20 top-0 start-0 ">*/ }

                <div className="flex-1">
                    <BackButton />
                    <button
                        className="btn btn-ghost text-xl invisible  sm:visible  btn-square"
                        onClick={ () => setSideMenuIsExpand(prevState => !prevState) }
                    >
                        <Menu />
                    </button>
                </div>
                <div className="flex-none ">

                    { children2 }

                    { isLogin && (
                        <button
                            className="btn btn-square btn-ghost"
                            onClick={ async () => {
                                await logout()
                            } }
                        >
                            <LogOut />
                        </button>
                    ) }
                </div>
            </div>

            <div className=" container max-w-full px-2 ">
                <aside
                    className={ `fixed top-0 left-0 z-40 ${ sideMenuIsExpand ? ' w-52 -translate-x-full sm:translate-x-0 ' : ' -translate-x-full' } h-screen transition-transform  bg-base-200` }
                    aria-label="Sidebar"
                >
                    <div className="h-full px-3 py-4 overflow-y-auto ">
                        <div className="flex items-center justify-between">
                            <div className="avatar">
                                <div className="w-24 rounded-full">
                                    {/* eslint-disable-next-line @next/next/no-img-element */ }
                                    <img
                                        alt={ 'avatar' }
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                    />
                                </div>
                            </div>
                            <button
                                className="btn btn-ghost text-xl btn-square"
                                onClick={ () => setSideMenuIsExpand(prevState => !prevState) }
                            >
                                <Menu />
                            </button>

                        </div>

                        <div className="divider"></div>

                        <ul className="space-y-2 font-medium">
                            {/*------------SideBar------------*/ }
                            { linkPrimary.map(item => (
                                <LinkListLayoutAdmin key={ item.label } item={ item } path={ path } />
                            )) }

                            {/*<LinkListLayoutAdmin*/ }
                            {/*    item={ {*/ }
                            {/*        href: '/admin/order/incoming',*/ }
                            {/*        icon: <Inbox />,*/ }
                            {/*        label: "Incoming",*/ }
                            {/*        add: 1*/ }
                            {/*    } }*/ }
                            {/*    path={ '/admin/order/incoming' }*/ }
                            {/*/>*/ }
                        </ul>

                        <div className="divider"></div>
                        <ul className="pt-4 mt-4 space-y-2 font-medium ">
                            { linkSecondary.map(item => (
                                <LinkListLayoutAdmin key={ item.label } item={ item } path={ path } />
                            )) }
                        </ul>
                    </div>
                </aside>

                <div
                    className={ `${ sideMenuIsExpand ? 'sm:ml-52' : 'ml-0' }  transition-transform  sm:px-2   pt-20 ` }
                >
                    { children }
                </div>

            </div>
            {
                !path.includes("create")
                && (
                    <div
                        className={ `btm-nav z-50 sm:hidden bg-base-200/50 fixed bottom-0 w-full transition-transform duration-300 ${
                            showBottomNav ? 'translate-y-0' : 'translate-y-full'
                        }` }
                    >
                        { [ ...linkPrimary, ...linkSecondary ].map((item) => (
                            <Link
                                key={ item.href }
                                href={ item.href }
                                className={ path.includes(item.href) ? "active" : "" }
                            >
                                { item.icon }
                                <span className="btm-nav-label text-xs">{ item.label }</span>
                            </Link>
                        )) }

                    </div>
                )
            }
        </>

    )
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
