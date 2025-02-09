import React, { ReactNode } from "react";
import { NavbarTransactionLayoutClientUser } from "@/app/components/Layout/user.client";
import { TrolleyCheckoutCaseUser } from "@/app/components/trolley/trolley.client";

export default async function Layout({ children }: { children: ReactNode }) {
    // await getUser()

    return ( <>
            <NavbarTransactionLayoutClientUser>
                <TrolleyCheckoutCaseUser />
            </NavbarTransactionLayoutClientUser>
            <div className="container pt-20 px-2 space-y-2 pb-4">
                { children }
            </div>
        </>

    )
}
