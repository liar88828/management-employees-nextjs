import React from 'react';
import { BaseLayoutUser } from "@/app/layout/baseLayoutUser";
import { validSession } from "@/secure/db";
import { prisma } from "@/config/prisma";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const { isLogin, userId, session } = await validSession()
    console.log(session)
    if (session.role === 'ADMIN') {
        redirect('/admin');

    }
    // await checkSession(session)

    const imageEmployee = await prisma.employees.findUnique({
        where: { userId },
        select: { img: true }
    })
    return (
        <BaseLayoutUser isLogin={ isLogin } imageEmployee={ imageEmployee?.img }>
            { children }
        </BaseLayoutUser> );
}
