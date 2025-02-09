import React, { ReactNode } from "react";
import { NavbarMarketLayoutClientUser, NavButtonMarketLayoutClientUser } from "@/app/components/Layout/user.client";
import { TrolleyCase } from "@/app/components/trolley/trolley.client";
import { checkGuest } from "@/server/lib/db";
import { PageErrorDataTrolley } from "@/app/components/PageErrorData";

export default async function Layout({ children }: { children: ReactNode }) {
    const isLogin = await checkGuest()
    // console.log(isLogin)
    return (
        <>
            <NavbarMarketLayoutClientUser isLogin={ isLogin }>
                {
                    isLogin
                        ? <TrolleyCase />
                        : <PageErrorDataTrolley />
                }
            </NavbarMarketLayoutClientUser>
            <div className="container pt-20 ">
                { children }
            </div>
            <NavButtonMarketLayoutClientUser />
        </>
    )
}
