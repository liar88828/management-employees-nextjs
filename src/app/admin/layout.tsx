import { BaseLayoutAdmin } from "@/app/components/Layout/admin.client";
import { Metadata } from "next";
import React, { ReactNode } from "react";
import { getSession } from "@/server/lib/db";
import { StatusIncomingCount } from "@/app/components/Layout/admin.server";
import { STATUS } from "@/app/components/toStatus";
import { Ban, BookMarked, LucideClock } from "lucide-react";

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
            children2={
                <div className={ 'flex gap-4' }>
                    <StatusIncomingCount status={ STATUS.PENDING } icon={ <LucideClock /> } />
                    <StatusIncomingCount status={ STATUS.COMPLETE } icon={ <BookMarked /> } />
                    <StatusIncomingCount status={ STATUS.FAIL } icon={ <Ban /> } />
                </div>
            }
        >
            { children }
        </BaseLayoutAdmin>
    )

}
