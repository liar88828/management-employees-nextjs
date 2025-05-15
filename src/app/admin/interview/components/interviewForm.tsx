'use client'
import React, { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import Form from "next/form";
import { MyInput, MyInputNum, MyInputOption, MyInputTextArea } from "@/app/components/form/action";
import { StatusEmployeeList } from "@/interface/enum";
import { interviewUpdateAction } from "@/server/action/interview.action";
import { TEmployeeDB } from "@/interface/entity/employee.model";

export function InterviewForm(
    {
        employee,
        // positions
    }: {
        // positions: Position[],
        employee: TEmployeeDB
    }) {
    const [ state, action, pending ] = useActionState(interviewUpdateAction, undefined)
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
        <Form action={ action } className={ 'card  max-w-4xl bg-base-200' }>
            <div className="card-body ">
                <h1 className={ 'card-title' }>Form Detail Interview : { employee.User.name }</h1>
                <input type="hidden" value={ employee.id } name={ 'id' } />
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

                    <MyInputOption
                        name={ 'status' }
                        keys={ state?.value.status || employee.status }
                        lists={ StatusEmployeeList }
                    />

                    {/*<MyInputOption*/ }
                    {/*    userName={ 'position' }*/ }
                    {/*    keys={ state?.value.position || employee.position }*/ }
                    {/*    lists={ positions.map(item => item.position) }*/ }
                    {/*/>*/ }

                    <MyInputTextArea
                        title={ 'notes' }
                        error={ state?.errors?.notes }
                        defaultValue={ state?.value.notes ?? employee.notes }
                    />
                </div>
                <div className="card-actions">
                    <button
                        disabled={ pending }
                        className={ 'btn btn-info mt-2' }
                    >Apply
                    </button>
                </div>
            </div>
        </Form>
    )
}
