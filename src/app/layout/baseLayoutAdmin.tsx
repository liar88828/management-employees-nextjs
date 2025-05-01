'use client'
import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollVisibility } from "@/hook/UseScrollVisibility";
import { BackButton } from "@/app/components/backButton";
import { LogOut, Menu } from "lucide-react";
import { logout } from "@/secure/cookies";
import { linkAdmin, TMenuList, } from "@/assets/MenuList";

export function BaseLayoutAdmin({ children, isLogin }: {
    children: ReactNode,
    notification?: ReactNode,
    isLogin: boolean
}) {
    const path = usePathname()
    const [ sideMenuIsExpand, setSideMenuIsExpand ] = useState(true);

    // Use custom hook for visibility
    const showNavbar = useScrollVisibility(true);
    const showBottomNav = useScrollVisibility(true);

    return ( <>
            <NavbarAdmin
                isLogin={ isLogin }
                sideMenuIsExpandAction={ () => setSideMenuIsExpand(prevState => !prevState) }
                showNavbar={ showNavbar }
            />

            <div className=" container max-w-full px-2 ">
                <SidebarAdmin
                    sideMenuIsExpandAction={ () => setSideMenuIsExpand(prevState => !prevState) }
                    sideMenuIsExpand={ sideMenuIsExpand }
                    path={ path }

                />
                <div
                    className={ `${ sideMenuIsExpand ? 'sm:ml-52' : 'ml-0' } transition-transform sm:px-2 pt-20 mb-10` }
                >
                    { children }
                </div>
            </div>
            <DockAdmin path={ path } showBottomNav={ showBottomNav } />
        </>
    )
}

export function DockAdmin({ showBottomNav, path }: {
    showBottomNav: boolean,
    path: string
}) {
    // console.log(path.includes("create"));

    if (path.includes("create")) {
        return null
    }
    return ( <div
            className={ `btm-nav z-50 sm:hidden bg-base-200/50 fixed bottom-0 w-full transition-transform duration-300 ${
                showBottomNav ? 'translate-y-0' : 'translate-y-full'
            }` }
        >
            { linkAdmin.map((item) => (
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
    );
}

export function SidebarAdmin(
    {
        sideMenuIsExpandAction,
        sideMenuIsExpand,
        path
    }: {
        sideMenuIsExpand: boolean,
        sideMenuIsExpandAction: () => void
        path: string

    }) {
    return (
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
                        onClick={ sideMenuIsExpandAction }
                    >
                        <Menu />
                    </button>
                </div>

                <div className="divider"></div>

                <ul className="space-y-2 font-medium">
                    {/*------------SideBar------------*/ }
                    { linkAdmin.map(item => (
                        <LinkListLayoutAdmin key={ item.label } item={ item } path={ path } />
                    )) }
                </ul>
            </div>
        </aside>
    );
}

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

export function NavbarAdmin(
    {
        showNavbar,
        isLogin,
        sideMenuIsExpandAction,
    }: {
        isLogin: boolean;
        showNavbar: boolean,
        sideMenuIsExpandAction: () => any
    }) {
    return (
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
                    onClick={ sideMenuIsExpandAction }
                >
                    <Menu />
                </button>
            </div>
            <div className="flex-none ">
                { isLogin && (
                    <button
                        className="btn btn-square btn-ghost"
                        onClick={ async () => await logout() }
                    >
                        <LogOut />
                    </button>
                ) }
            </div>
        </div>

    );
}
