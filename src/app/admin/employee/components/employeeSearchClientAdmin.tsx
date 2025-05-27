import Form from "next/form";
import { StatusEmployeeList } from "@/interface/enum";
import { Search } from "lucide-react";
import React from "react";
import Link from "next/link";

export function EmployeeSearchClientAdmin({ name, status }: {
    name: string,
    status: string,
}) {
    return (
        <div className="flex gap-2 items-center">
            <Form action={ '/admin/employee' } className="join ">
                <input
                    type="text"
                    className={ 'input input-bordered join-item ' }
                    name={ 'name' }
                    defaultValue={ name }
                    placeholder={ 'Employee Name .....' }
                />

                <input type="hidden"
                       defaultValue={ status }
                       name={ 'status' }
                />
                <button className={ 'btn join-item ' }><Search /></button>
            </Form>

            <details className="dropdown">
                <summary className="btn m-1">Select Status</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] p-2 shadow  overflow-y-auto ">
                    <li>
                        <Link href={ `/admin/employee?name=${ name }&status=` }>
                            Select All
                        </Link>
                    </li>
                    { StatusEmployeeList.map((item) => (
                        <li key={ item }>
                            <Link href={ `/admin/employee?name=${ name }&status=${ item }` }>
                                { item }
                            </Link>
                        </li>
                    )) }
                </ul>
            </details>

            {/*<Link href={ '/admin/employee/create' } className={ 'btn btn-square' }>*/ }
            {/*    <Plus />*/ }
            {/*</Link>*/ }
        </div>
    );
}
