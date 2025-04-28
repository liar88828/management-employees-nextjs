import Link from "next/link";
import React from "react";
import { nodemailerSendRegister } from "@/server/controller/nodemailer.controller";

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

export function SendHeaderDetail(props: { letter: any, employees: any }) {
    return <div className="flex justify-between items-end">
        <h1 className={ "my-title" }>letter : { props.letter.id } </h1>
        <button
            className="btn btn-primary "
            onClick={ () => nodemailerSendRegister(props.employees) }
        >Send All Email
        </button>
    </div>;
}
