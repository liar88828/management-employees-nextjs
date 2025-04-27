import React from 'react';
import { employeeFindById, } from "@/server/controller/employee.controller";
import { toDateIndo } from "@/utils/toDate";
import { validSession } from "@/secure/db";
import { InterviewShowCVGlobal } from "@/app/admin/interview/components/interviewShowCVGlobal";
import { InterviewShowDocument } from "@/app/admin/interview/components/interviewShowDocument";

async function Page() {
    const { userId } = await validSession()
    const employee = await employeeFindById({ userId })
    // console.log(employee)
    return (
        <div>
            {/*<h1 className={ 'text-xl font-bold' }>Welcome to employee-management</h1>*/ }
            <div className="card bg-base-200">
                <div className="card-body ">
                    <h1 className={ 'card-title' }>Register ID # { employee ? employee.id : 'Empty' }</h1>
                    <p>Register At : { employee ? toDateIndo(employee.createdAt) : 'Empty' }</p>
                    <p>Status : { employee ? employee.status : '' }</p>
                    <div>
                        <p className={ 'font-bold' }>Note : </p>
                        <p className={ 'text-xs text-base/50 italic' }>- Status is wait from admin</p>
                        { !employee &&
                            <p className={ 'text-xs text-errors italic' }>- Please Complete Register will Show CV</p> }
                        { !employee &&
                            <p className={ 'text-xs text-errors italic' }>- Please Complete Register will Show
                            ID-Card</p> }
                    </div>
                    <div className="card-actions">
                        <button className={ `btn btn-primary ${ employee && 'btn-disabled' }` }>
                            Register
                        </button>

                        {/*<button className={ `btn btn-primary ${ !employee && 'btn-disabled' }` }>*/ }
                        {/*    Print*/ }
                        {/*</button>*/ }
                        { employee && <>
                            <InterviewShowCVGlobal employee={ employee } />
                            <InterviewShowDocument employee={ employee } />
                        </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
