'use client'
import { Employees } from "@prisma/client";
import { Department } from "@/interface/entity/departement.model";
import { useActionState, useEffect } from "react";
import { registerUpdateFormDataAdmin } from "@/server/action/inbox";
import toast from "react-hot-toast";
import Form from "next/form";
import { MyInput, MyInputTextArea } from "@/app/components/form/action";
import { employeeListStatus } from "@/interface/enum";

export function RegistrationForm({ employee, departments }: { employee: Employees, departments: Department[] }) {
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
