'use client'

import React, { useActionState, useEffect, useState } from "react";
import {
    departmentCreateFormDataAction,
    departmentDeleteAction,
    departmentUpdateAction,
    DepartmentUpdateActionType
} from "@/server/action/department.action";
import { FormError } from "@/app/components/form/action";
import { LoadingAction } from "@/app/components/LoadingData";
import { useFormStatus } from "react-dom";
import { onAction } from "@/server/action/OnAction";
import { Department } from "@/interface/entity/departement.model";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";

export function PositionModalCreate() {
    const [ state, action, pending ] = useActionState(departmentCreateFormDataAction, undefined);
    // console.log(state)

    useEffect(() => {
        if (state?.success === true) {
            toast.success("Success Create Position ");
            ( document.getElementById('ModalCreateDepartment') as HTMLDialogElement ).close()
        } else if (state?.success === false) {
            toast.error("Failed Create Data");

        }
    }, [ state ]);

    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */ }
            <button
                // btn-sm btn-square
                className="btn btn-success "
                onClick={ () => {
                    ( document.getElementById('ModalCreateDepartment') as HTMLDialogElement ).showModal()
                } }
            >
                {/*<Plus/>*/ }
                Create
            </button>
            <dialog id="ModalCreateDepartment" className="modal">
                <div className="modal-box ">
                    <form action={ action }>
                        <h2 className="card-title">Add Department Position</h2>
                        <div className="form-control w-full">
                            <label htmlFor="email" className="label">
                                <span className="label-text">Position</span>
                            </label>
                            <input
                                id="position"
                                name="position"
                                placeholder="Enter Position"
                                className="input input-bordered w-full"
                            />
                            <FormError errors={ state?.errors?.position } title="must add:" />
                        </div>

                        { !state?.success && state?.message && (
                            <p className="text-red-500 text-sm mt-1">{ state.message }</p>
                        ) }
                        <div className="card-actions">
                            <button
                                disabled={ pending }
                                type="submit"
                                className={ `btn btn-primary w-full ${ pending ? "btn-disabled " : "" } mt-5` }
                            >
                                { pending ? "Creating..." : "Create" }
                                <LoadingAction isLoading={ pending } />
                            </button>

                        </div>
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */ }
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    )
}
export function PositionModalUpdate({ department }: { department: Department }) {
    const [ position, setPosition ] = useState(department.position)
    const { pending } = useFormStatus()
    const onUpdate = async (data: DepartmentUpdateActionType) => {
        await onAction(() => departmentUpdateAction(data), `Success Delete Data Department By ID ${ department.id }`)
    }

    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */ }
            <button
                // btn-sm btn-square
                className="btn btn-primary "
                onClick={ () => {
                    // @ts-ignore
                    document.getElementById(`DepartmentModalUpdate_${ department.id }`).showModal()
                } }
            >
                {/*<Pen/>*/ }
                Edit
            </button>
            <dialog id={ `DepartmentModalUpdate_${ department.id }` } className="modal">
                <div className="modal-box space-y-5">
                    <h2 className="card-title">Update ID { department.id } - Position { department.position }</h2>
                    <p>Are You Sure want Update this data ???</p>
                    <input type="text" onChange={ e => setPosition(e.target.value) }
                           className="input input-bordered w-full"
                    />
                    <div className="modal-action">
                        <button className={ `btn btn-info ${ pending && 'btn-disabled' }` }
                                onClick={ () => onUpdate({ departmentId: department.id, position }) }
                        >
                            {/*<Pen/>*/ }
                            Edit
                        </button>

                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */ }
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}
export function DepartmentModalDelete({ department }: { department: Department }) {
    const { pending } = useFormStatus()
    const onDelete = async () => {
        await onAction(async () => await departmentDeleteAction(department.id),
            `Success Delete Data Department By ID ${ department.id }`)
    }

    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */ }
            <button className="btn btn-error  btn-square" onClick={ () => {
                // @ts-ignore
                document.getElementById(`DepartmentModalDelete_${ department.id }`).showModal()
            } }
            >
                <Trash />
            </button>
            <dialog id={ `DepartmentModalDelete_${ department.id }` } className="modal">
                <div className="modal-box space-y-5">
                    <h2 className="card-title">Delete ID { department.id } - Position { department.position }</h2>
                    <p>Are You Sure want Delete this data ???</p>
                    <div className="modal-action">
                        <button className={ `btn btn-error  btn-square ${ pending && 'btn-disabled' }` }
                                onClick={ onDelete }
                        >
                            <Trash />
                        </button>

                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */ }
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}
