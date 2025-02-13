import React from 'react';
import { TContext } from "@/interface/server/param";
import { getContextParam } from "@/utils/requestHelper";
import { getLetterMyId } from "@/server/action/letter.action";
import { LetterInterview } from "@/app/components/Letter/Interview";
import { SendTableEmployee } from "@/app/admin/send/send.client";
import SuratPanggilanDiterimaKerja from "@/app/components/Letter/Accept";

export default async function Page(context: TContext) {
    const letterId = await getContextParam(context, 'id')
    const { letter, employees, company } = await getLetterMyId(letterId)
    return (
        <div>
            <h1 className={ 'text-lg font-bold' }>letter : { letter.id } Example Paper</h1>
            <SendTableEmployee letter={ letter } employees={ employees }/>
            <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-5">
                <LetterInterview employee={ employees[0] } company={ company } form={ letter }/>
                <SuratPanggilanDiterimaKerja employee={ employees[0] } company={ company } form={ letter }/>
            </div>
        </div>
    );
}
