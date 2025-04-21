import React from 'react';
import { BaseLayoutUser } from "@/app/layout/baseLayoutUser";
import { validSession } from "@/secure/db";
import { prisma } from "@/config/prisma";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const { isLogin, userId } = await validSession()
    const imageEmployee = await prisma.employees.findUnique({
        where: { userId },
        select: { img: true }
    })
    return (
        <BaseLayoutUser isLogin={ isLogin } imageEmployee={ imageEmployee?.img }>
            { children }
        </BaseLayoutUser> );
}
