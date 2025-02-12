import Link from 'next/link';
import React from 'react';
import { getLatterOnlyAll } from "@/server/action/latter.action";
import { SendTableLatter } from "@/app/admin/send/send.client";

async function Page() {
    const latter = await getLatterOnlyAll()
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className={ 'text-lg font-bold' }> Latter</h1>
                <div className="">
                    <Link href={ '/admin/send/create' } className={ 'btn btn-info' }>Create</Link>
                </div>
            </div>
            <SendTableLatter data={ latter }/>
        </div>
    );
}

export default Page;
