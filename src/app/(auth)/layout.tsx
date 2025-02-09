import { AuthLayoutAdmin } from "@/app/components/Layout/admin.client";
import { Metadata } from "next";
import { ReactNode } from "react";
import { getSession } from "@/server/lib/db";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'Auth',
    description: 'Authenticated create next ',
}

export default async function Layout({ children, }: { children: ReactNode }) {
    const session = await getSession()

    if (session) {
        redirect('/admin')
    }

    return <>
        <AuthLayoutAdmin />
        <div className={ `container pt-20  justify-center w-full flex` }>
            { children }
        </div>
    </>
}
