import React from 'react';
import { SendMailRegister } from "@/app/admin/send/[id]/sendMailRegister";
import { TContext } from "@/interface/server/param";
import { getContextParam } from "@/utils/requestHelper";
import { getLetterMyId } from "@/server/action/letter.action";
import { SendTableEmployee } from "@/app/admin/send/send.client";
import { exampleCompany } from "@/assets/company";

export default async function Page(context: TContext) {
    const letterId = await getContextParam(context, 'id')
    const { letter, employees, } = await getLetterMyId(letterId)

    return (
        <div className="space-y-4 ">
            <h1 className={ 'text-xl font-bold' }>letter : { letter.id } Example Paper</h1>
            <SendMailRegister employees={ employees } />
            <SendTableEmployee employees={ employees } letter={ letter } company={ exampleCompany } />
            <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-5">
                {/*<LetterInterview employee={ employees[0] } company={ company } form={ letter } />*/ }
                {/*<SuratPanggilanDiterimaKerja employee={ employees[0] } company={ company } form={ letter } />*/ }
            </div>
        </div>
    );
}
