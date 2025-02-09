import React, { ReactNode } from "react";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { ProfileChangeUser, } from "@/app/components/profile/profile.client";
import { ProfileUserPage } from "@/app/components/profile/profile.page";
import { getUser } from "@/server/lib/db";

export async function ProfilePageServerUser({ children }: { children: ReactNode }) {
    const user = await getUser()
    if (!user) return <PageLoadingSpin />
    return (
        <ProfileUserPage user={ user }>
            { children }
        </ProfileUserPage>
    )
}

export async function ProfileChangeServerUser() {
    const user = await getUser()
    if (!user) return <PageLoadingSpin />
    return (
        <ProfileChangeUser user={ user } />
    );
}
