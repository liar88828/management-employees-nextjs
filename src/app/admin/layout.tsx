import { Metadata } from "next";
import React, { ReactNode } from "react";
import { getSession } from "@/secure/db";
import { BaseLayoutAdmin } from "@/app/layout/baseLayoutAdmin";

export const metadata: Metadata = {
    title: 'Admin Dashboard',
    description: 'Admin Dashboard',
}

export default async function Layout({ children }: { children: ReactNode }) {
    const session = await getSession()
    const isLogin = !!session

    return (
        <BaseLayoutAdmin
            isLogin={ isLogin }
            notification={ <></> }
        >
            { children }
        </BaseLayoutAdmin>
    )

}
