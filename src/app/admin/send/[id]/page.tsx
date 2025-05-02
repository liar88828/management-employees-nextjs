import React from 'react';
import { TContext } from "@/interface/server/param";
import { getContextParam } from "@/utils/toRequest";
import { sendDetailByIdLoader } from "@/server/action/send.action";
import { exampleCompany } from "@/assets/company";
import { SendTableEmployee } from "@/app/admin/send/components/sendTableEmployee";
import { SendHeaderDetail } from "@/app/admin/send/components/sendHeader";

export default async function Page(context: TContext) {
    const letterId = await getContextParam(context, 'id')
    const { letter, employees } = await sendDetailByIdLoader(letterId)
    // console.log(letter)
    return (
        <div className="space-y-4 ">
            <SendHeaderDetail letter={ letter } employees={ employees } />
            <SendTableEmployee employees={ employees } letter={ letter } company={ exampleCompany } />
            {/*<div className="grid 2xl:grid-cols-2 grid-cols-1 gap-5">*/ }
            {/*    /!*<LetterInterview employee={ employees[0] } company={ company } form={ letter } />*/ }
            {/*    /!*<SuratPanggilanDiterimaKerja employee={ employees[0] } company={ company } form={ letter } />*/ }
            {/*</div>*/ }
        </div>
    );
}
