'use client'
import { Position } from "@/interface/entity/position.model";
import { TEmployeeDB } from "@/interface/entity/employee.model";
import React, { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import Form from "next/form";
import { MyInput, MyInputNum, MyInputOption, MyInputTextArea } from "@/app/components/form/action";
import { StatusEmployeeList } from "@/interface/enum";
import { interviewUpdateAction } from "@/server/action/interview.action";

export function InterviewForm({ employee, positions }: { positions: Position[], employee: TEmployeeDB }) {
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
                {/*        { StatusEmployeeList.map((item) => (*/ }
                {/*            <option key={ item }>{ item }</option>*/ }
                {/*        )) }*/ }
                {/*    </select>*/ }
                {/*</div>*/ }
                <MyInputOption
                    title={ 'Status' }
                    name={ 'status' }
                    keys={ state?.value.status || employee.status }
                    lists={ StatusEmployeeList }
                />

                <MyInputOption
                    title={ 'Position' }
                    name={ 'position' }
                    keys={ state?.value.position || employee.position }
                    lists={ positions.map(item => item.position) }

                />

                {/*<div className="form-control w-full">*/ }
                {/*    <label htmlFor={ `positions` } className="label">*/ }
                {/*        <span className="label-text capitalize"> positions </span>*/ }
                {/*    </label>*/ }
                {/*    <select*/ }
                {/*        className="select select-bordered join-item"*/ }
                {/*        name="positions"*/ }
                {/*        key={ state?.value.positions || employee.positions }*/ }
                {/*        defaultValue={ state?.value.positions || employee.positions }*/ }
                {/*    >*/ }
                {/*        <option disabled value="">Select positions</option>*/ }
                {/*        { positions.map((item) => (*/ }
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
