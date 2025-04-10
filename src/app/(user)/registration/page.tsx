import React from 'react';
import { redirect } from "next/navigation";
import { getEmployeeById } from "@/server/controller/employee.controller";
import { prisma } from "@/config/prisma";
import { Departements } from ".prisma/client";
import { EmployeeFormClientUser } from "@/app/components/registration/registration.client";
import { getUser } from "@/secure/db";

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