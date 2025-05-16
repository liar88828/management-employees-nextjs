'use client'
import { TEmployeeDB } from "@/interface/entity/employee.model";
import { XIcon } from "lucide-react";
import React, { useState } from "react";
import { StatusEmployeeList } from "@/interface/enum";
import { updateStatus } from "@/server/action/employee-admin.action";
import toast from "react-hot-toast";

export function EmployeeUpdateStatus({ employee }: { employee: TEmployeeDB }) {

    const [ changePosition, setChangePosition ] = useState<string>()

    const onSubmit = async () => {
        const response = await updateStatus(employee, changePosition)
        if (response.success) {
            toast.success(response.message)
        } else {
            toast.error(response.message)
        }
    }

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
                        <h1 className={ 'card-title' }>Change Status Employee</h1>
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost "><XIcon /></button>
                        </form>
                    </div>
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
                            onClick={ () => onSubmit() }
                        >
                            Change
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
