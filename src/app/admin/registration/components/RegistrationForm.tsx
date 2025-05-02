'use client'
import { Employees } from "@prisma/client";
import { Position } from "@/interface/entity/position.model";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import Form from "next/form";
import { MyInput, MyInputTextArea } from "@/app/components/form/action";
import { StatusEmployeeList } from "@/interface/enum";
import { registerUpdateFormDataAdminAction } from "@/server/action/register.action";

export function RegistrationForm({ employee, positions }: { employee: Employees, positions: Position[] }) {
    const [ state, action, pending ] = useActionState(registerUpdateFormDataAdminAction, undefined)
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
                    { StatusEmployeeList.map((item) => (
                        <option key={ item }>{ item }</option>
                    )) }
                </select>
            </div>

            <div className="form-control w-full">
                <label htmlFor={ `position` } className="label">
                    <span className="label-text capitalize"> positions </span>
                </label>
                <select
                    className="select select-bordered join-item"
                    name="position"
                    key={ state?.value.position || employee.position }
                    defaultValue={ state?.value.position || employee.position }
                >
                    <option disabled value="">Select positions</option>
                    { positions.map((item) => (
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
