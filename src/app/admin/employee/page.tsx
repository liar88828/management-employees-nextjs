import React from 'react';
import { TContext } from "@/interface/server/param";
import { EmployeeSearchClientAdmin, EmployeeTableClientAdmin } from "@/app/components/employee/employee.client.admin";
import { prisma } from "@/config/prisma";
import { getContextQuery, getContextQueryNum } from "@/utils/requestHelper";
import { Pagination } from "@/app/admin/inbox/inbox.client";

export default async function page(context: TContext,) {
    const search = await getContextQuery(context, 'search')
    const status = await getContextQuery(context, 'status')
    const page = await getContextQueryNum(context, 'page')
    // const limit = await getContextQuery(context, 'limit')
    const pageSize = 3; // You can adjust the page size
    const totalEmployees = await prisma.employees.count({
        where: {
            name: { contains: search },
            status: { contains: status }
        }
    });

    const employees = await prisma.employees.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: {
            name: { contains: search },
            status: { contains: status }
        }
    })
    const totalPages = Math.ceil(totalEmployees / pageSize);

    return (
        <>
            <EmployeeSearchClientAdmin search={ search } status={ status }/>
            <EmployeeTableClientAdmin employees={ employees }/>
            <Pagination page={ page } totalPages={ totalPages } search={ search } status={ status }/>
        </>
    );
}
