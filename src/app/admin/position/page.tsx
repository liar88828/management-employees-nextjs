import React from 'react';
import { PositionDepartment } from "@/app/admin/position/components/positionDepartment";
import { positionEmployeeLoader } from "@/server/action/position.action";

export default async function Page() {
    const positions = await positionEmployeeLoader();
    return (
        <div className="space-y-2">
            <PositionDepartment positions={ positions } />
        </div>
    );
}
