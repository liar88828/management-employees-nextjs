import Form from "next/form";
import { Search } from "lucide-react";
import Link from "next/link";
import { EmployeeCompletePhoto } from "@/interface/enum";
import React from "react";
export default function RegistrationSearch(
    { name, status }: { name: string, status: string }
) {
    return (
        <div className="flex gap-2 items-center flex-wrap">
            <Form
                action={ `/admin/registration` }
                className="join"
            >
                <input type="name"
                       className={ 'input input-bordered join-item ' }
                       defaultValue={ name }
                       name={ 'search' }
                       placeholder={ 'Employee Name .....' }
                />
                <input type="hidden"
                       defaultValue={ status }
                       name={ 'status' }
                />

                <button className={ 'btn join-item ' }><Search /></button>
            </Form>

            <details className="dropdown">
                <summary className="btn">Select Status</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li><Link
                        href={ `/admin/registration?name=${ name }&status=` }
                    >{ EmployeeCompletePhoto["Select All"] }</Link></li>
                    <li><Link
                        href={ `/admin/registration?name=${ name }&status=${ EmployeeCompletePhoto.Complete }` }
                    >{ EmployeeCompletePhoto.Complete }</Link></li>
                    <li><Link
                        href={ `/admin/registration?name=${ name }&status=${ EmployeeCompletePhoto["Not Completed"] }` }
                    >{ EmployeeCompletePhoto["Not Completed"] }</Link></li>
                    {/*{ StatusEmployeeList.map((item) => (*/ }
                    {/*    <li key={ item }>*/ }
                    {/*        <Link href={ `/admin/registration?name=${ name }&status=${ item }` }>{ item }</Link>*/ }
                    {/*    </li>*/ }
                    {/*)) }*/ }
                </ul>
            </details>
        </div>
    );
}
