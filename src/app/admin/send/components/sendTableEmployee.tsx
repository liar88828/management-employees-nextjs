import React from "react";
import { Companys } from "@/assets/company";
import { LetterForm } from "@/assets/letter";
import { EmployeeUserClient } from "@/interface/entity/employee.model";
import { toDateIndo } from "@/utils/toDate";
import { SendDeleteModal, SendDetailModal } from "@/app/admin/send/components/sendModal";
import { ErrorComponent } from "@/app/components/error/ErrorComponent";

export function SendTableEmployee(
    { employees, letter, company }:
    {
        company: Companys,
        letter: LetterForm,
        employees: EmployeeUserClient[]
    }
) {

    if (employees.length === 0) {
        return <ErrorComponent title={ 'Send Employee Empty ' } description={ 'Please add Employee ' } />
    }

    return (
        <div className="overflow-x-auto  ">
            <table className="my-table">
                <thead>
                <tr>
                    <th>Employee Name</th>
                    {/*<th>Employee Phone</th>*/ }
                    <th>Employee Email</th>
                    {/*<th>Employee Here</th>*/ }
                    {/*<th>Employee Birth</th>*/ }
                    {/*<th>Employee Status</th>*/ }
                    <th>Interview Date</th>
                    <th>Interview Location</th>
                    {/*<th>Letter Create</th>*/ }
                    <th>Action</th>

                </tr>
                </thead>
                <tbody>
                { employees.map((item, index) => (
                    <tr key={ index } className="hover:bg-gray-100/50">
                        {/*<td className="p-2 border">*/ }
                        {/*</td>*/ }
                        <td>{ item.User.name }</td>
                        {/*<td>{ item.User.phone }</td>*/ }
                        <td>{ item.User.email }</td>
                        {/*<td>{ toDateIndo(item.hireDate) }</td>*/ }
                        {/*<td>{ toDateIndo(item.dateOfBirth) }</td>*/ }
                        {/*<td>{ item.status }</td>*/ }
                        {/**/ }
                        <td>{ toDateIndo(letter.interviewDate) }</td>
                        <td>{ letter.interviewLocation }</td>
                        {/*<td>{ toDateIndo(letter.createdAt) }</td>*/ }
                        <td className={ 'flex gap-2' }>
                            <SendDetailModal
                                keys={ item.id }
                                letter={ letter }
                                employee={ item }
                                company={ company }
                            />
                            <SendDeleteModal
                                keys={ item.id }
                                letter={ letter }
                                employee={ item }
                            />
                        </td>
                    </tr>
                )) }
                </tbody>
            </table>
        </div>
    );
}
