import React from 'react';
import { departmentEmployeeLoader } from "@/server/action/department.action";
import { PositionDepatment } from "@/app/admin/position/components/positionDepatment";

export default async function Page() {
    const department = await departmentEmployeeLoader();

    return <PositionDepatment departments={ department } />
}
