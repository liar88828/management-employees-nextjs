import React from 'react';
import { EmployeeFormClientAdmin, } from "@/app/components/employee/employee.client";

export default async function PageEmployeeFormAdmin() {
    // const departments = await departmentGetAllPage()

    return (
        <EmployeeFormClientAdmin
            // departments={ departments }
            method={ 'POST' }
            userId={ '' }
        />
    );
}
