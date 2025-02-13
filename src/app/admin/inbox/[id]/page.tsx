import React from 'react';
import { TContext } from "@/interface/server/param";
import { getContextParam } from "@/utils/requestHelper";
import { employeeRepository } from "@/server/controller";
import { EmptyData } from "@/app/components/PageErrorData";
import Form from "next/form";
import { listStatusEmployee } from "@/assets/MenuList";
import { EmployeeCVPageAdmin } from "@/app/admin/inbox/inbox.client";

export default async function Page(context: TContext) {
    const employeeId = await getContextParam(context, 'id')
    const employee = await employeeRepository.findById({ employeeId })
    if (!employee) {
        return <EmptyData page={ `Employee Detail ${ employeeId }` }/>
    }

    return (
        <div>
            <Form action="" className={ 'flex gap-2 my-2' }>
                <select className="select select-bordered join-item">
                    <option disabled value={ '' }>Select Status</option>
                    { listStatusEmployee.map((item) => (
                        <option key={ item } value={ item }>{ item }</option>
                    )) }
                </select>
                <button className={ 'btn btn-info' }>Apply</button>
            </Form>
            <EmployeeCVPageAdmin employee={ employee }/>
        </div>
    );
}
