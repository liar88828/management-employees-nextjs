import React, { Suspense } from "react";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { ProfileChangeServerUser } from "@/app/components/profile/profile.server";

export default function Page() {

    return (
        <Suspense fallback={ <PageLoadingSpin /> }>
            <ProfileChangeServerUser />
        </Suspense>
    );
}
