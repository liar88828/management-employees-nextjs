import React from 'react';
import {EmployeeFormClientAdmin, EmployeeFormClientUser} from "@/app/components/employee/employee.client";
import {getUser, validSession} from "@/server/lib/db";
import {redirect} from "next/navigation";

export default async function PageEmployeeFormAdmin() {
    const user = await getUser()
    if (!user) {
        redirect('/login');
    }
    return (
        <EmployeeFormClientUser method={'POST'} user={user}/>
    );
}
