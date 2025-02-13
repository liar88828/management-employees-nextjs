import React from 'react';
import { EmployeeFormClientUser } from "@/app/components/employee/employee.client.user";
import { getUser } from "@/server/lib/db";
import { redirect } from "next/navigation";
import { prisma } from "@/config/prisma";
import { Departements } from ".prisma/client";
import { getEmployeeById } from "@/server/controller/employee.controller";

async function Page() {
    const user = await getUser()
    if (!user) {
        redirect('/login');
    }
    const employee = await getEmployeeById({ userId: user.id })
    const departments: Departements[] = await prisma.departements.findMany()
    return (
        <EmployeeFormClientUser
            user={user}
            employee={employee}
            departments={ departments }
            method={ employee ? "PUT" : 'POST' }
        />
    );
}

export default Page;