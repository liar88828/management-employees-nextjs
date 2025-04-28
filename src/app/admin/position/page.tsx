import React from 'react';
import { PositionDepatment } from "@/app/admin/position/components/positionDepatment";
import { departmentEmployeeLoader } from "@/server/action/department.action";

export default async function Page() {
    const departments = await departmentEmployeeLoader();
    return (
        <div className="space-y-2">
            <PositionDepatment departments={ departments } />
        </div>
    );
}
