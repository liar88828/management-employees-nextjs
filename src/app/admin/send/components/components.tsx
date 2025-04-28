'use client';

import React, { useActionState } from "react";
import { Letters } from "@prisma/client";
import { LoadingSpin } from "@/app/components/LoadingData";
import { EmployeeUserClient } from "@/interface/entity/employee.model";
import { MyInput, MyInputDate } from "@/app/components/form/action";
import { _sendEmployeeFormDataAction } from "@/server/action/send.action";

export function SendFormx({ employees, letter }: { letter?: Letters, employees: EmployeeUserClient[] }) {
    const [ state, action, pending ] = useActionState(_sendEmployeeFormDataAction, undefined);
    // console.log(state)
    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-4xl card card-bordered bg-base-200 ">
                <form action={ action } className="card-body">
                    <h2 className="card-title">Create Form letter</h2>

                    { letter?.id && <input type="hidden" value={ letter?.id } name={ 'id' } /> }

                    <MyInput title={ "signerName" }
                             defaultValue={ state?.value.signerName ?? letter?.signerName }
                             error={ state?.errors?.dressCode }
                    />

                    <MyInputDate title={ "interviewDate" }
                                 defaultValue={ state?.value.interviewDate ?? letter?.interviewDate }
                                 error={ state?.errors?.interviewDate }
                    />

                    <MyInput title={ "interviewLocation" }
                             defaultValue={ state?.value.interviewLocation ?? letter?.interviewLocation }
                             error={ state?.errors?.interviewLocation }
                    />

                    <MyInput title={ "dressCode" }
                             defaultValue={ state?.value.dressCode ?? letter?.dressCode }
                             error={ state?.errors?.dressCode }
                    />
                    <hr className="my-4" />
                    {/*<div >*/ }
                    {/*    Select Employee Or Save as Template*/ }
                    {/*</div>*/ }
                    <div>
                        {/*<SendFormTableEmployees employees={ employees } />*/ }
                    </div>

                    { state?.message && (
                        <p className={ `${ state.success ? 'text-success' : 'text-errors' } text-sm mt-1` }>{ state.message }</p>
                    ) }
                    <div className="card-actions">
                        <button
                            disabled={ pending }
                            type="submit"
                            className={ `btn btn-primary w-full ${ pending ? "btn-disabled" : "" } mt-5` }
                        >
                            { pending && <LoadingSpin /> }Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
