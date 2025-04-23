'use client'
import React, { useActionState, useEffect } from "react";
import Link from "next/link";
import { Employees } from "@prisma/client";
import Form from "next/form";
import { MyInput, MyInputTextArea } from "@/app/components/form/action";
import { employeeListStatus } from "@/interface/enum";
import { registerUpdateFormDataAdmin } from "@/server/action/inbox";
import toast from "react-hot-toast";
import { toDateIndo } from "@/utils/toDate";
import { EmployeeUserClient } from "@/interface/entity/employee.model";
import { Departements } from ".prisma/client";

export function Pagination({ totalPages, search, status, page }: {
    totalPages: number,
    search: string,
    status: string,
    page: number
}) {
    return (
        <div className="flex justify-center mt-4 space-x-2">
            { Array.from({ length: totalPages }, (_, i) => (
                <Link key={ i + 1 } href={ `/admin/inbox?search=${ search }&status=${ status }&page=${ i + 1 }` }
                      className={ `btn ${ page === i + 1 ? 'btn-primary' : 'btn-outline' }` }
                >
                    { i + 1 }
                </Link>
            )) }
        </div>
    );
}

export function EmployeesRegistrationTable({ employees }: {
    employees: EmployeeUserClient[],
    // title: string,
    // valid?: boolean
}) {
    return (
        <div className="overflow-x-auto">
            <table className="table bg-base-200 ">
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
                    <th>Complete</th>
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
                        <td>{
                            employee.photo3x4 === null ||
                            employee.photoKtp === null ||
                            employee.photoIjazah === null ? 'Not Complete' : 'Complete'
                        }</td>
                        {/*<td >{ employee.salary }</td>*/ }
                        {/*<td >{ employee.status }</td>*/ }
                        <td>
                            <div>
                                <Link
                                    className={ 'btn btn-info' }
                                    href={ `/admin/registration/${ employee.id }` }
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
                    <h3 className="font-bold text-lg">{ employees.User.name }</h3>
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

export function FormRegistration({ employee, departments }: { employee: Employees, departments: Departements[] }) {
    const [ state, action, pending ] = useActionState(registerUpdateFormDataAdmin, undefined)
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
            <input type={ "hidden" } value={ 0 } name={ 'salary' } />

            <h1>Form Registration</h1>
            <MyInput
                title={ "jobTitle" }
                error={ state?.errors?.jobTitle }
                defaultValue={ state?.value.jobTitle ?? employee.jobTitle }
            />

            {/*<MyInputNum*/ }
            {/*    title={ 'salary' }*/ }
            {/*    errors={ state?.errors?.salary }*/ }
            {/*    defaultValue={ state?.value.salary ?? employee.salary }*/ }
            {/*/>*/ }

            <div className="form-control w-full">
                <label htmlFor={ `status` } className="label">
                    <span className="label-text capitalize"> status </span>
                </label>
                <select
                    className="select select-bordered join-item"
                    name="status"
                    key={ state?.value.status || employee.status }
                    defaultValue={ state?.value.status || employee.status }
                >
                    <option disabled value="">Select Status</option>
                    { employeeListStatus.map((item) => (
                        <option key={ item }>{ item }</option>
                    )) }
                </select>
            </div>

            <div className="form-control w-full">
                <label htmlFor={ `department` } className="label">
                    <span className="label-text capitalize"> department </span>
                </label>
                <select
                    className="select select-bordered join-item"
                    name="department"
                    key={ state?.value.department || employee.department }
                    defaultValue={ state?.value.department || employee.department }
                >
                    <option disabled value="">Select department</option>
                    { departments.map((item) => (
                        <option key={ item.id }>{ item.position }</option>
                    )) }
                </select>
            </div>

            <MyInputTextArea
                title={ 'notes' }
                error={ state?.errors?.notes }
                defaultValue={ state?.value.notes ?? employee.notes }
            />
            <button
                disabled={ pending }
                className={ 'btn btn-info' }
            >
                Send
            </button>
            {/*{ employee.status === 'Interview' &&*/ }
            {/*    <button*/ }
            {/*        onClick={ () => {onSendEmailSingle()}}*/ }
            {/*        type="button"*/ }
            {/*        disabled={ pending }*/ }
            {/*        className={ 'btn btn-success' }*/ }
            {/*    >*/ }
            {/*        Send Email*/ }
            {/*    </button>*/ }
            {/*}*/ }

            {/*<button*/ }
            {/*    onClick={ () => {*/ }
            {/*    } }*/ }
            {/*    type={ 'button' }*/ }
            {/*    className={ 'btn btn-success' }*/ }
            {/*>*/ }
            {/*    Send Email*/ }
            {/*</button>*/ }
        </Form>
    )
}
