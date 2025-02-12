'use client';

import React, { useActionState, useState } from "react";
import { Employees, Latters } from "@prisma/client";
import { MyInput, MyInputDate } from "@/app/components/form";
import { latterEmployeeAction } from "@/server/action/latter.action";
import { LoadingSpin } from "@/app/components/LoadingData";
import { LatterForm } from "@/assets/latter";
import { toDateIndo } from "@/utils/toDate";
import Link from "next/link";

export function SendForm({ employees, latter }: { latter?: Latters, employees: Employees[] }) {
    const [ state, action, pending ] = useActionState(latterEmployeeAction, undefined);
    // console.log(state)
    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-4xl card card-bordered bg-base-200 ">
                <form action={ action } className="card-body">
                    <h2 className="card-title">Create Form latter</h2>

                    { latter?.id && <input type="hidden" value={ latter?.id } name={ 'id' }/> }

                    <MyInput title={ "signerName" }
                             defaultValue={ state?.value.signerName ?? latter?.signerName }
                             error={ state?.errors?.dressCode }/>

                    <MyInputDate title={ "interviewDate" }
                                 defaultValue={ state?.value.interviewDate ?? latter?.interviewDate }
                                 error={ state?.errors?.interviewDate }/>

                    <MyInput title={ "interviewLocation" }
                             defaultValue={ state?.value.interviewLocation ?? latter?.interviewLocation }
                             error={ state?.errors?.interviewLocation }/>

                    <MyInput title={ "dressCode" }
                             defaultValue={ state?.value.dressCode ?? latter?.dressCode }
                             error={ state?.errors?.dressCode }/>

                    <div className="">
                        Select Employee Or Save as Template
                    </div>
                    <div className="">
                        <TableEmployees employees={ employees }/>
                    </div>


                    { state?.message && (
                        <p className={ `${ state.success ? 'text-success' : 'text-error' } text-sm mt-1` }>{ state.message }</p>
                    ) }
                    <div className="card-actions">
                        <button
                            disabled={ pending }
                            type="submit"
                            className={ `btn btn-primary w-full ${ pending ? "btn-disabled" : "" } mt-5` }
                        >
                            { pending && <LoadingSpin/> }Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export function TableEmployees({ employees }: { employees: Employees[] }) {
    const [ selectedEmployees, setSelectedEmployees ] = useState<string[]>([]);
    const [ isAllSelected, setIsAllSelected ] = useState(false);

    const handleSelectAll = () => {
        if (isAllSelected) {
            setSelectedEmployees([]);
        } else {
            setSelectedEmployees(employees.map((employee) => employee.id));
        }
        setIsAllSelected(!isAllSelected);
    };

    const handleCheckboxChange = (id: string) => {
        setSelectedEmployees((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((employeeId) => employeeId !== id)
                : [ ...prevSelected, id ]
        );
    };
    return (
        <section className="space-y-2">
            <h1>Please Select Want To Send Latter</h1>

            {/*<input*/ }
            {/*    type="text"*/ }
            {/*    name={ 'latter Id' }*/ }
            {/*    className="input input-bordered"/>*/ }
            <div className="overflow-x-auto">
                <table className="table bg-base-200 ">
                    <thead>
                    <tr className="text-left">
                        <th className="">
                            <input
                                type="checkbox"
                                className="checkbox"
                                checked={ isAllSelected }
                                onChange={ handleSelectAll }
                            />
                        </th>
                        <th className="">Name</th>
                        <th className="">Email</th>
                        <th className="">Phone</th>
                        <th className="">Department</th>
                        <th className="">Status</th>
                        {/*<th className="">Action</th>*/ }
                    </tr>
                    </thead>
                    <tbody>
                    { employees.map((employee, index) => (
                        <tr key={ employee.id } className="hover:bg-gray-100/20">

                            <td className="">
                                <input
                                    checked={ selectedEmployees.includes(employee.id) }
                                    onChange={ () => handleCheckboxChange(employee.id) }
                                    type="checkbox"
                                    name={ `check[${ index }]` }
                                    className="checkbox"
                                    value={ employee.id }
                                />
                            </td>
                            <td className="">{ employee.name }</td>
                            <td className="">{ employee.email }</td>
                            <td className="">{ employee.phone }</td>
                            <td className="">{ employee.department }</td>
                            <td className="">{ employee.status }</td>
                            {/*<td className="">*/ }
                            {/*    Action*/ }
                            {/*</td>*/ }
                        </tr>
                    )) }
                    </tbody>
                    <tfoot>
                    <tr>
                        <th></th>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </section>
    );
}

export function SendTableEmployee({ employees, latter }: { latter: LatterForm, employees: Employees[] }) {
    return (
        <div className="overflow-x-auto p-4">
            <table className="table  bg-base-200">
                <thead>
                <tr className="">
                    <th className="p-2">Employee Name</th>
                    <th className="p-2">Employee Phone</th>
                    <th className="p-2">Employee Email</th>
                    <th className="p-2">Employee Here</th>
                    <th className="p-2">Employee Birth</th>
                    <th className="p-2">Employee Status</th>
                    <th className="p-2">Interview Date</th>
                    <th className="p-2">Interview Location</th>
                    <th className="p-2">Latter Create</th>
                </tr>
                </thead>
                <tbody>
                { employees.map((item, index) => (
                    <tr key={ index } className="hover:bg-gray-100/50">
                        {/*<td className="p-2 border">*/ }
                        {/*</td>*/ }
                        <td className="">{ item.name }</td>
                        <td className="">{ item.phone }</td>
                        <td className="">{ item.email }</td>
                        <td className="">{ toDateIndo(item.hireDate) }</td>
                        <td className="">{ toDateIndo(item.dateOfBirth) }</td>
                        <td className="">{ item.status }</td>
                        {/**/ }
                        <td className="">{ toDateIndo(latter.interviewDate) }</td>
                        <td className="">{ latter.interviewLocation }</td>
                        <td className="">{ toDateIndo(latter.createdAt) }</td>
                    </tr>
                )) }
                </tbody>
            </table>
        </div>
    );
}

export function SendTableLatter({ data }: { data: Latters[] }) {
    return (
        <div className="overflow-x-auto p-4">
            <table className="table w-full  bg-base-200">
                <thead>
                <tr className="">
                    <th className="">No</th>
                    <th className="">ID</th>
                    <th className="">Interview Date</th>
                    <th className="">Interview Location</th>
                    <th className="">Latter Create</th>
                    <th className="">Action</th>
                </tr>
                </thead>
                <tbody>
                { data.map((item, index) => (
                    <tr key={ index } className="hover:bg-gray-100/50">
                        <td className="">{ index + 1 }</td>
                        <td className="">{ item.id }</td>
                        <td className="">{ toDateIndo(item.interviewDate) }</td>
                        <td className="">{ item.interviewLocation }</td>
                        <td className="">{ toDateIndo(item?.createdAt) }</td>
                        <td className="">
                            <div className="">
                                <Link
                                    className="btn btn-info"
                                    href={ `/admin/send/${ item.id }`
                                    }>Detail</Link>
                            </div>
                        </td>
                    </tr>
                )) }
                </tbody>
            </table>
        </div>
    );
}

