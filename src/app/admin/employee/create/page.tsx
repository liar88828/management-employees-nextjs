import React from 'react';
import { EmployeeFormClientAdmin } from "@/app/components/employee/employee.client";

export default function PageEmployeeFormAdmin() {
    return (
        <EmployeeFormClientAdmin method={ 'POST' } />
    );
}
