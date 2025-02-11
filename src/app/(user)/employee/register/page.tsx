import React from 'react';
import { EmployeeFormClientUser } from "@/app/components/employee/employee.client.user";
import { getEmployeeByUserId } from "@/server/controller/employee.controller";
import { getUser } from "@/server/lib/db";
import { redirect } from "next/navigation";

async function Page() {
    const user = await getUser()
    if (!user) {
        redirect('/login');
    }
    const employee = await getEmployeeByUserId(user.id)

    return (
        <EmployeeFormClientUser
            method={employee ? "PUT" : 'POST'}
            user={user}
            employee={employee}
        />
    );
}

export default Page;