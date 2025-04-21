import { Metadata } from "next";
import { ReactNode } from "react";
import { getSession } from "@/secure/db";
import { redirect } from "next/navigation";
import { AuthLayout } from "@/app/layout/authLayout";

export const metadata: Metadata = {
    title: 'Auth',
    description: 'Authenticated create next ',
}

export default async function Layout({ children }: { children: ReactNode }) {
    const session = await getSession()

    if (session) {
        redirect('/admin')
    }

    return <>
        <AuthLayout />
        <div className={ `container pt-20  justify-center w-full flex` }>
            { children }
        </div>
    </>
}
