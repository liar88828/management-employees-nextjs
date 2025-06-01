'use client'
import { Employees } from "@prisma/client";
import React, { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import Form from "next/form";
import { MyInput, MyInputNum, MyInputOption, MyInputTextArea } from "@/app/components/form/action";
import { StatusEmployeeList } from "@/interface/enum";
import { registerUpdateFormDataAdminAction } from "@/app/admin/registration/register.action";

export function RegistrationForm({ employee, }: { employee: Employees, }) {

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
        <Form action={ action } className={ 'card max-w-4xl bg-base-200' }>
            <div className="card-body ">
                <h1 className={ 'card-title' }>Form Registration</h1>
                <input type="hidden" value={ employee.id } name={ 'id' } />
                {/*<input type={ "hidden" } value={ 0 } name={ 'salary' } />*/ }
                <div className="grid grid-cols-2 gap-5">

                    <MyInput
                        title={ "jobTitle" }
                        error={ state?.errors?.jobTitle }
                        defaultValue={ state?.value.jobTitle ?? employee.jobTitle }
                    />

                    <MyInputOption
                        name={ 'status' }
                        keys={ state?.value.status || employee.status }
                        lists={ StatusEmployeeList }
                    />

                    <MyInputNum
                        // onChangeAction={(value) => setSetSalary(value)}
                        title={ "salary" }
                        error={ state?.errors?.salary }
                        defaultValue={ state?.value.salary ?? employee.salary }
                    />

                    {/*<MyInputOption*/ }
                    {/*    userName={ 'position' }*/ }
                    {/*    keys={ state?.value.position || employee.position }*/ }
                    {/*    lists={ positions.map(item => item.position) }*/ }
                    {/*/>*/ }

                    <MyInputTextArea title={ 'notes' }
                                     error={ state?.errors?.notes }
                                     defaultValue={ state?.value.notes ?? employee.notes ?? '-' }
                    />
                </div>
                <div className="card-actions">
                    <button
                        type="submit"
                        disabled={ pending }
                        className={ 'btn btn-info btn-block' }
                    >
                        Submit
                    </button>

                </div>
            </div>

        </Form>
    )
}
