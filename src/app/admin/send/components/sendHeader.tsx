'use client'
import Link from "next/link";
import React from "react";
import { nodemailerSendRegister } from "@/server/action/nodemailer.action";
import { sendDetailDeleteAction } from "@/server/action/send.action";
import { EmployeeUserClient } from "@/interface/entity/employee.model";
import { LetterForm } from "@/assets/letter";
import { exampleCompany } from "@/assets/company";

export function SendHeader() {
    return <div className="flex justify-between items-center">
        <h1 className={ "my-title" }>Send Email</h1>
        <div className="flex items-center gap-2">

            {/*<h1 className={ 'text-xl font-bold' }> Letter</h1>*/ }
            {/*<details className="dropdown">*/ }
            {/*    <summary className="btn m-1">Select Status</summary>*/ }
            {/*    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">*/ }
            {/*        <li><Link href={ `/admin/inbox` }>Select All</Link></li>*/ }
            {/*        { [ 'Undangan Interview' ].map((item) => (*/ }
            {/*            <li key={ item }>*/ }
            {/*                <Link href={ `/admin/inbox?search=&status=${ item }` }>{ item }</Link>*/ }
            {/*            </li>*/ }
            {/*        )) }*/ }
            {/*    </ul>*/ }
            {/*</details>*/ }
        </div>

        <div>
            <Link href={ "/admin/send/create" } className={ "btn btn-info" }>Create</Link>
        </div>
    </div>;
}

export function SendHeaderDetail(props: {
    letter: LetterForm,
    employees: EmployeeUserClient[]
}) {

    return <div className="flex justify-between items-end">
        <h1 className={ "my-title" }>letter : { props.letter.id } </h1>
        <div className="space-x-2">
            { props.employees.length === 0
                ? <button
                    className="btn btn-error "
                    onClick={ () => sendDetailDeleteAction(props.letter.id) }
                >
                    Delete
                </button>
                : <button
                    className="btn btn-primary "
                    onClick={ () => nodemailerSendRegister(
                        props.employees,
                        exampleCompany,
                        props.letter
                    ) }
                >
                    Send
                </button>
            }
        </div>
    </div>
}
