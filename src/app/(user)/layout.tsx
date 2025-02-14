import React from 'react';
import { BaseLayoutUser } from "@/app/layout/baseLayoutUser";
import { validSession } from "@/secure/db";

export default async function Layout({children}: { children: React.ReactNode }) {
    const {isLogin} = await validSession()
    return (
        <BaseLayoutUser isLogin={isLogin}>
            {children}
        </BaseLayoutUser>);
}


