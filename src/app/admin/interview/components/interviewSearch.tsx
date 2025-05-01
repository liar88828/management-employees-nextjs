import Form from "next/form";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Position } from "@/interface/entity/position.model";

export default function InterviewSearch(
    { search, positions, position }: { search: string, position: string, positions: Position[] }
) {
    return (
        <div className="flex gap-2 items-center">
            <Form
                action={ `/admin/interview` }
                className="join"
            >
                <input type="search"
                       className={ 'input input-bordered join-item ' }
                       defaultValue={ search }
                       name={ 'search' }
                />
                <input type="hidden"
                       defaultValue={ position }
                       name={ 'position' }
                />
                <button className={ 'btn join-item ' }><Search /></button>
            </Form>

            <details className="dropdown">
                <summary className="btn m-1">Select Position</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">

                    { positions.map((item) => (
                        <li key={ item.id }>
                            <Link href={ `/admin/registration?search=${ search }&position=${ item }` }
                            >{ item.position }</Link>
                        </li>
                    )) }
                </ul>
            </details>

            {/*<details className="dropdown">*/ }
            {/*    <summary className="btn m-1">Select Status</summary>*/ }
            {/*    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">*/ }
            {/*        <li>*/ }
            {/*            <Link href={ `/admin/interview?search=${ search }&status=` }>Select All</Link>*/ }
            {/*        </li>*/ }
            {/*        { StatusEmployeeList.map((item) => (*/ }
            {/*            <li key={ item }>*/ }
            {/*                <Link href={ `/admin/interview?search=${ search }&status=${ item }` }>{ item }</Link>*/ }
            {/*            </li>*/ }
            {/*        )) }*/ }
            {/*    </ul>*/ }
            {/*</details>*/ }
        </div>

    );
}
