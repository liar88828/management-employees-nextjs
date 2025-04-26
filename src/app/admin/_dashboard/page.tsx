import React from 'react'
import {
    DashboardEarningServerServerAdmin,
    DashboardGridDataServerAdmin,
    DashboardRecentProductServerAdmin,
    DashboardTopCustomersServerAdmin,
    DashboardTopOrderServerAdmin
} from "@/app/components/dashboard/dashboard.server";
import { redirect } from "next/navigation";

export default async function Page() {
    redirect('/admin/employee')
    return (
        <div className="grid md:grid-cols-8 lg:grid-cols-4 grid-cols-1 gap-2 md:gap-5 w-full px-3  mb-32">
            <div className="md:col-span-5 lg:col-span-3 md:space-y-5 space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5">
                    <DashboardGridDataServerAdmin text={ 'Pending' } color={ 'bg-warning/10' }
                                                  title={ 'Total Pending' }
                    />
                    <DashboardGridDataServerAdmin text={ 'Complete' } color={ 'bg-success/10' }
                                                  title={ 'Total Complete' }
                    />
                    <DashboardGridDataServerAdmin text={ 'Fail' } color={ 'bg-errors/10' } title={ 'Total Fail' } />
                </div>
                <DashboardEarningServerServerAdmin />
                <DashboardTopOrderServerAdmin />
            </div>
            <div className="md:col-span-3 lg:col-span-1 md:space-y-5 space-y-2 ">
                <DashboardTopCustomersServerAdmin />
                <DashboardRecentProductServerAdmin />
            </div>
        </div>
    )
}
