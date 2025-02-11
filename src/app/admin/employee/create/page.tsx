import React from 'react';
import { prisma } from "@/config/prisma";
import { EmployeeFormClientAdmin } from "@/app/components/employee/employee.client.admin";

export default async function PageEmployeeFormAdmin() {
    const departments = await prisma.departements.findMany()
    return (
        <EmployeeFormClientAdmin method={ 'POST' } departments={ departments }/>
    );
}
