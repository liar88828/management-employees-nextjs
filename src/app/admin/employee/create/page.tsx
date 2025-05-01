import React from 'react';

import { EmployeeFormClientAdmin } from "@/app/admin/employee/create/employeeFormClientAdmin";

export default async function PageEmployeeFormAdmin() {
    // const positions = await positionGetAllPage()

    return (
        <EmployeeFormClientAdmin
            // positions={ positions }
            method={ 'POST' }
            userId={ '' }
        />
    );
}
