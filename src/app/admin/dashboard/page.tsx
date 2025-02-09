import React, { Suspense } from 'react'
import { PageLoadingSpin } from "@/app/components/LoadingData";
import {
    DashboardEarningServerServerAdmin,
    DashboardGridDataServerAdmin,
    DashboardRecentProductServerAdmin,
    DashboardTopCustomersServerAdmin,
    DashboardTopOrderServerAdmin
} from "@/app/components/dashboard/dashboard.server";

export default async function Page() {
    return (
        <div className="grid md:grid-cols-8 lg:grid-cols-4 grid-cols-1 gap-2 md:gap-5 w-full px-3  mb-32">
            <div className="md:col-span-5 lg:col-span-3 md:space-y-5 space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5">
                    <Suspense fallback={ <PageLoadingSpin /> }>
                        <DashboardGridDataServerAdmin text={ 'Pending' } color={ 'bg-warning/10' }
                                                      title={ 'Total Pending' }
                        />
                        {/**/ }
                        <Suspense fallback={ <PageLoadingSpin /> }>
                            <DashboardGridDataServerAdmin text={ 'Complete' } color={ 'bg-success/10' }
                                                          title={ 'Total Complete' }
                            />
                            {/**/ }
                            <Suspense fallback={ <PageLoadingSpin /> }>
                                <DashboardGridDataServerAdmin text={ 'Fail' } color={ 'bg-error/10' }
                                                              title={ 'Total Fail' }
                                />
                            </Suspense>
                        </Suspense>
                    </Suspense>
                </div>
                <Suspense fallback={ <PageLoadingSpin /> }>
                    <DashboardEarningServerServerAdmin />
                    {/**/ }
                    <Suspense fallback={ <PageLoadingSpin /> }>
                        <DashboardTopOrderServerAdmin />
                    </Suspense>
                </Suspense>
            </div>
            <div className="md:col-span-3 lg:col-span-1 md:space-y-5 space-y-2 ">
                <Suspense fallback={ <PageLoadingSpin /> }>
                    <DashboardTopCustomersServerAdmin />
                    {/**/ }
                    <Suspense fallback={ <PageLoadingSpin /> }>
                        <DashboardRecentProductServerAdmin />
                    </Suspense>
                </Suspense>
            </div>
        </div>
    )
}
