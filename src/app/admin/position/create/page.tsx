import React from 'react';
import { positionEmployeeLoader } from "@/server/action/position.action";
import { PositionDepartment } from "@/app/admin/position/components/positionDepartment";

export default async function Page() {
    const position = await positionEmployeeLoader();

    return <PositionDepartment positions={ position } />
}
