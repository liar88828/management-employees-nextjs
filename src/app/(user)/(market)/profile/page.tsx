import React, { Suspense } from 'react'
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { ProfilePageServerUser } from "@/app/components/profile/profile.server";
import {
    ProfileOrderHistoryUser,
    ProfileStatusClient,
    ProfileTrolleyCountClientUser
} from "@/app/components/profile/profile.client";
import { Ban, BookMarked, LucideClock } from "lucide-react";

export default async function page() {
    return (
        <div className="px-5 space-y-5 mb-28">
            <Suspense fallback={ <PageLoadingSpin /> }>
                <ProfilePageServerUser>
                    {/*is crash at fetching data ???*/ }
                    <ProfileTrolleyCountClientUser />
                    <ProfileStatusClient statusOrder={ 'Pending' }>
                        <LucideClock />
                    </ProfileStatusClient>
                    <ProfileStatusClient statusOrder={ 'Complete' }>
                        <BookMarked />
                    </ProfileStatusClient>
                    <ProfileStatusClient statusOrder={ 'Fail' }>
                        <Ban />
                    </ProfileStatusClient>
                </ProfilePageServerUser>
                <Suspense fallback={ <PageLoadingSpin /> }>
                    <ProfileOrderHistoryUser />
                </Suspense>
            </Suspense>
        </div>
    )
}
