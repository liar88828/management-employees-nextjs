'use client'
import React, { useActionState, useEffect } from "react";
import Link from "next/link";
import Form from "next/form";
import { employeeListStatus } from "@/interface/enum";
import { interviewUpdate } from "@/server/action/inbox";
import toast from "react-hot-toast";
import { EmployeeUserClient, TEmployeeDB } from "@/interface/entity/employee.model";
import { XIcon } from "lucide-react";
import { toDateIndo } from "@/utils/toDate";
import { EmployeePhotos } from "@/app/components/employee/employeePhotos";
import { MyInput, MyInputNum, MyInputOption, MyInputTextArea } from "@/app/components/form/action";
import { EmployeeCV } from "@/app/components/print/employeeCV";
import { Departements } from ".prisma/client";

export function Pagination({ totalPages, search, status, page, title }: {
    totalPages: number,
    search: string,
    status: string,
    title: string,
    page: number
}) {
    return (
        <div className="flex justify-center mt-4 space-x-2">
            { Array.from({ length: totalPages }, (_, i) => (
                <Link key={ i + 1 } href={ `/admin/${ title }?search=${ search }&status=${ status }&page=${ i + 1 }` }
                      className={ `btn ${ page === i + 1 ? 'btn-primary' : 'btn-outline' }` }
                >
                    { i + 1 }
                </Link>
            )) }
        </div>
    );
}

export function EmployeesTable({ employees }: {
    employees: EmployeeUserClient[],
    // title: string,
    // valid?: boolean
}) {
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full table-sm">
                <thead>
                <tr className="text-left">
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    {/*<th >Gender</th>*/ }
                    {/*<th >Job Title</th>*/ }
                    {/*<th >Department</th>*/ }
                    {/*<th >Employment Type</th>*/ }
                    <th>Hire Date</th>
                    {/*<th >Salary</th>*/ }
                    {/*<th >Status</th>*/ }
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                { employees.map((employee, index) => (
                    <tr key={ employee.id } className="hover:bg-gray-100/20">
                        <td>{ index + 1 }</td>
                        <td>{ employee.User.name }</td>
                        <td>{ employee.User.email }</td>
                        <td className="text-nowrap">{ employee.User.phone }</td>
                        {/*<td >{ employee.gender }</td>*/ }
                        {/*<td >{ employee.jobTitle }</td>*/ }
                        {/*<td >{ employee.department }</td>*/ }
                        {/*<td >{ employee.employmentType }</td>*/ }
                        <td>{ toDateIndo(employee.hireDate) }</td>
                        {/*<td >{ employee.salary }</td>*/ }
                        {/*<td >{ employee.status }</td>*/ }
                        <td>
                            <div>
                                <Link
                                    className={ 'btn btn-info' }
                                    href={ `/admin/interview/${ employee.id }` }
                                >
                                    Detail
                                </Link>
                            </div>
                        </td>
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
    );
}

export function InboxModalAction({ employees }: { employees: EmployeeUserClient }) {
    return ( <>
            <button className="btn" onClick={ () => {
                // @ts-ignore
                document.getElementById(`InboxModalAction${ employees.id }`).showModal()
            } }
            >open modal
            </button>
            <dialog id={ `InboxModalAction${ employees.id }` } className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    { employees.User.name }
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */ }
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>

    )
}

export function FormInterview({ employee, departments }: { departments: Departements[], employee: TEmployeeDB }) {
    const [ state, action, pending ] = useActionState(interviewUpdate, undefined)
    useEffect(() => {
        if (state) {
            if (state.success) {
                toast.success(state.message)
            } else {
                toast.error(state.message)
            }
        }
    }, [ employee.status, state ]);

    return (
        <Form action={ action } className={ 'card card-body max-w-4xl bg-base-200' }>
            <input type="hidden" value={ employee.id } name={ 'id' } />
            <h1>Form Detail Interview : { employee.User.name }</h1>
            <div className="grid grid-cols-2 gap-5">

                <MyInput
                    title={ "jobTitle" }
                    error={ state?.errors?.jobTitle }
                    defaultValue={ state?.value.jobTitle ?? employee.jobTitle }
                />
                <MyInputNum
                    title={ 'salary' }
                    error={ state?.errors?.salary }
                    defaultValue={ state?.value.salary ?? employee.salary }
                />

                {/*<div className="form-control w-full">*/ }
                {/*    <label htmlFor={ `status` } className="label">*/ }
                {/*        <span className="label-text capitalize"> status </span>*/ }
                {/*    </label>*/ }
                {/*    <select*/ }
                {/*        className="select select-bordered join-item"*/ }
                {/*        name="status"*/ }
                {/*        key={ state?.value.status || employee.status }*/ }
                {/*        defaultValue={ state?.value.status || employee.status }*/ }
                {/*    >*/ }
                {/*        <option disabled value="">Select Status</option>*/ }
                {/*        { employeeListStatus.map((item) => (*/ }
                {/*            <option key={ item }>{ item }</option>*/ }
                {/*        )) }*/ }
                {/*    </select>*/ }
                {/*</div>*/ }
                <MyInputOption
                    title={ 'Status' }
                    name={ 'status' }
                    keys={ state?.value.status || employee.status }
                    lists={ employeeListStatus }
                />

                <MyInputOption
                    title={ 'Department' }
                    name={ 'department' }
                    keys={ state?.value.department || employee.department }
                    lists={ departments.map(item => item.position) }

                />

                {/*<div className="form-control w-full">*/ }
                {/*    <label htmlFor={ `department` } className="label">*/ }
                {/*        <span className="label-text capitalize"> department </span>*/ }
                {/*    </label>*/ }
                {/*    <select*/ }
                {/*        className="select select-bordered join-item"*/ }
                {/*        name="department"*/ }
                {/*        key={ state?.value.department || employee.department }*/ }
                {/*        defaultValue={ state?.value.department || employee.department }*/ }
                {/*    >*/ }
                {/*        <option disabled value="">Select department</option>*/ }
                {/*        { departments.map((item) => (*/ }
                {/*            <option key={ item.id }>{ item.position }</option>*/ }
                {/*        )) }*/ }
                {/*    </select>*/ }
                {/*</div>*/ }

                <MyInputTextArea
                    title={ 'notes' }
                    error={ state?.errors?.notes }
                    defaultValue={ state?.value.notes ?? employee.notes }
                />
            </div>

            <button
                disabled={ pending }
                className={ 'btn btn-info mt-2' }
            >Apply
            </button>
        </Form>
    )
}

export function InterviewShowCV({ employee }: { employee: TEmployeeDB }) {
    return (
        <>
            <button className="btn btn-info" onClick={ () => {
                const modal = document.getElementById('my_modal_cv');
                if (modal instanceof HTMLDialogElement) {
                    modal.showModal();
                }
            } }
            >Show CV
            </button>
            <dialog id="my_modal_cv" className="modal">
                <div className="modal-box w-11/12 max-w-4xl bg-base-200/50">
                    <div className="flex justify-between mb-4">
                        <h1></h1>
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost "><XIcon /></button>
                        </form>
                    </div>
                    <EmployeeCV employee={ employee } />

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </ >
    );
}

export function InterviewShowDocument({ employee }: { employee: TEmployeeDB }) {
    return (
        <>
            <button className="btn btn-info" onClick={ () => {
                const modal = document.getElementById('my_modal_document')
                if (modal instanceof HTMLDialogElement) {
                    modal.showModal();
                }
            } }
            >Show
                Document
            </button>
            <dialog id="my_modal_document" className="modal">
                <div className="modal-box w-11/12 max-w-4xl">
                    <div className="flex justify-between mb-4">
                        <h1></h1>
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost "><XIcon /></button>
                        </form>
                    </div>
                    <EmployeePhotos employee={ employee } />

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}
