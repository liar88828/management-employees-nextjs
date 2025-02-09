import Link from "next/link";
import React, { ReactNode } from "react";
import { LoadingSpin } from "@/app/components/LoadingData";
import { STATUS } from "@/app/components/toStatus";

export async function StatusIncomingCount({ status, icon }: { status: STATUS, icon: ReactNode }) {
    const count = { data: 1 }
    if (!count) return <LoadingSpin />
    return (
        <Link
            href={ `/admin/order/incoming/${ status.toLowerCase() }` }
            className={ `flex items-center p-2 rounded ` }
        >
            <div className="indicator">
                <span className="indicator-item indicator-start indicator-top badge-neutral badge">{ count.data }
                </span>
                { icon }
                <span className="flex-1 ms-3 whitespace-nowrap sm:block hidden">{ status }</span>
            </div>
        </Link>

    );
}
