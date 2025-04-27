import React from 'react';

import { EmployeeFormClientAdmin } from "@/app/admin/employee/create/employeeFormClientAdmin";

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
