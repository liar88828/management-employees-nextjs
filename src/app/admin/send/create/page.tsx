import React from 'react';
import { SendForm } from "@/app/admin/send/send.client";
import { prisma } from "@/config/prisma";

async function Page() {
    const employees = await prisma.employees.findMany({})
    return (
        <SendForm employees={ employees }/>
    );
}

export default Page;