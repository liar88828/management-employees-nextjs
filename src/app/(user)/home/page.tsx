import React from 'react';
import { getEmployeeById, } from "@/server/controller/employee.controller";
import { toDateIndo } from "@/utils/toDate";
import { validSession } from "@/secure/db";

async function Page() {
    const {userId} = await validSession()
    const employee = await getEmployeeById({ userId })
    return (
        <div className="">
            <h1 className={'text-xl font-bold'}>Welcome to employee-management</h1>
            <div className="">

                <div className="card">
                    <div className="card-body">
                        <h1 className={ 'card-title' }>
                            Register ID # {employee ? employee.id : 'Empty'}
                        </h1>
                        <p>
                            Register At {employee ? toDateIndo(employee.createdAt) : 'Empty'}
                        </p>
                        <p>
                            Status : { employee ? employee.status : '' }
                        </p>
                        <div className="">
                            <p className={'font-bold'}>Note : </p>
                            <p className={'text-xs text-base/50 italic'}>- Status is wait from admin</p>
                            { !employee && <p className={ 'text-xs text-error italic' }>- Please Complete Register will Show CV</p> }
                            { !employee && <p className={ 'text-xs text-error italic' }>- Please Complete Register will Show ID-Card</p> }
                        </div>
                        <div className="card-actions">
                            <button className={`btn btn-primary ${employee && 'btn-disabled'}`}>
                                Register
                            </button>

                            <button className={`btn btn-primary ${!employee && 'btn-disabled'}`}>
                                Print
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Page;
