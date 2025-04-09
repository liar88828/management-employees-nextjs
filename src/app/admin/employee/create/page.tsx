import React from 'react';
import {getUser} from "@/server/lib/db";
import {redirect} from "next/navigation";
import {EmployeeFormClientUser} from "@/app/components/registration/registration.client";

export default async function PageEmployeeFormAdmin() {
    const user = await getUser()
    if (!user) {
        redirect('/login');
    }
    return (
        <EmployeeFormClientUser method={'POST'} user={user}/>
    );
}
