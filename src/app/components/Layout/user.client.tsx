'use client'
import Link from 'next/link';
import React, { ReactNode } from 'react';
import useTrolleyStore from "@/store/trolley";
import { BackButton } from "@/app/components/backButton";
import { DollarSign, ShoppingCart } from "lucide-react";
import { menuUser } from "@/assets/MenuList";
import { usePathname } from "next/navigation";
import { useScrollVisibility } from "@/hook/UseScrollVisibility";
import { useTrolley } from "@/hook/useTrolley";

export function NavbarMarketLayoutClientUser({ children, isLogin }: { isLogin: boolean, children: ReactNode }) {
    const showNavbar = useScrollVisibility(true);

    return (
        <div
            className={ `navbar bg-base-200/50 fixed top-0 start-0 z-20 w-full transition-transform duration-300 
            ${ showNavbar ? 'translate-y-0' : '-translate-y-full' }`
            }
        >
            <div className="flex-1">
                <BackButton />
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={ 0 } role="button" className="btn btn-circle btn-neutral">
                        <div className="indicator">
                            <ShoppingCart />
                            <span className="badge badge-sm indicator-item badge-neutral">
                          { isLogin ? <CountTrolley /> : null }
                            </span>
                        </div>
                    </div>
                    <div
                        tabIndex={ 0 }
                        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
                    >
                        { children }
                    </div>
                </div>
            </div>
        </div>
    )
}

export function CountTrolley() {
    // console.log('is valid')
    const { count } = useTrolley()
    const { data, isLoading } = count()
    return ( isLoading ? 0 : data )
}

export function NavButtonMarketLayoutClientUser() {
    const path = usePathname()
    const showBottomNav = useScrollVisibility(true);

    return (
        <div
            className={ `btm-nav z-50 sm:hidden bg-base-200/50 fixed bottom-0 w-full transition-transform duration-300 
            ${ showBottomNav ? 'translate-y-0' : 'translate-y-full' }` }
        >
            { menuUser.map((item) => (
                <Link
                    href={ item.href }
                    key={ item.title }
                    className={ path === item.href ? "active" : "" }
                >
                    { item.icon }
                    <span className="btm-nav-label">{ item.title }</span>
                </Link>
            )) }
        </div>
    );
}

export function NavbarTransactionLayoutClientUser({ children }: { children: ReactNode }) {
    const path = usePathname()
    const { onSelected } = useTrolleyStore()

    return <div className="navbar bg-base-300 fixed z-50">
        <div className="flex-1 ">
            <BackButton />
        </div>
        <div className="flex-none">
            { path.includes("/trolley") && (
                <div className="dropdown dropdown-end">
                    <div tabIndex={ 0 } role="button" className="btn btn-circle btn-neutral">
                        <div className="indicator">
                            <DollarSign />
                            <span className="badge badge-sm indicator-item">
                                { onSelected.length }
                            </span>
                        </div>
                    </div>
                    <div tabIndex={ 0 }
                         className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
                    >
                        { children }
                    </div>
                </div>
            ) }
        </div>
    </div>;
}
