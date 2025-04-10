import React from 'react';
import { EmployeeFormClientAdmin, } from "@/app/components/employee/employee.client";
import { departmentGetAllPage } from "@/server/action/department";

export default async function PageEmployeeFormAdmin() {
    const departments = await departmentGetAllPage()

    return (
        <EmployeeFormClientAdmin
            method={ 'POST' }
            departments={ departments }
            userId={ '' }
        />
    );
}
