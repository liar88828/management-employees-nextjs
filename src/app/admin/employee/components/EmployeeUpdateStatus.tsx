'use client'
import { TEmployeeDB } from "@/interface/entity/employee.model";
import { XIcon } from "lucide-react";
import React, { useState } from "react";
import { StatusEmployeeList } from "@/interface/enum";

export function EmployeeUpdateStatus({ employee }: { employee: TEmployeeDB }) {

    const [ changePosition, setChangePosition ] = useState<string>()

    return (
        <>
            <button className="btn btn-info" onClick={ () => {
                const modal = document.getElementById('my_modal_position')
                if (modal instanceof HTMLDialogElement) {
                    modal.showModal();
                }
            } }
            >Update Status
            </button>
            <dialog id="my_modal_position" className="modal">
                <div className="modal-box w-11/12 max-w-4xl">
                    <div className="flex justify-between mb-4">
                        <h1></h1>
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost "><XIcon /></button>
                        </form>
                    </div>
                    <h1 className={ 'card-title' }>Change Position Employee</h1>
                    <div className="space-x-4 mt-4">
                        <select className="select select-bordered join-item w-fit"
                                defaultValue={ employee.status }
                                name={ 'status' }
                                onChange={ (e) => {
                                    setChangePosition(e.target.value)
                                } }
                        >
                            <option disabled value={ '' }>Filter</option>
                            {/*<option value={ '' }>All</option>*/ }
                            { StatusEmployeeList.map(item => (
                                <option key={ item }>{ item }</option>
                            )) }
                        </select>
                        <button
                            className={ 'btn btn-success ' }
                            onClick={ () => {
                                // changeUpdatePositionAction(employee.id, changePosition)
                            } }
                        >Change
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}
