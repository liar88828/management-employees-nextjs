'use client'
import React, { useActionState, useState } from "react";
import {
    departmentCreate,
    departmentDelete,
    departmentUpdate,
    DepartmentUpdateActionType
} from "@/server/action/department";
import { Departements } from ".prisma/client";
import { Pen, Plus, Trash } from "lucide-react";
import { LoadingAction } from "@/app/components/LoadingData";
import { FormError } from "@/app/components/form";
import { useFormStatus } from "react-dom";
import { onAction } from "@/server/action/OnAction";

export function DepartmentModalCreate() {
    const [ state, action, pending ] = useActionState(departmentCreate, undefined);
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */ }
            <button className="btn btn-success btn-sm btn-square" onClick={ () => {
                // @ts-ignore
                document.getElementById('ModalCreateDepartment').showModal()
            } }>
                <Plus/>
            </button>
            <dialog id="ModalCreateDepartment" className="modal">
                <div className="modal-box ">
                    <form action={ action } className="">
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
                            <FormError errors={ state?.errors?.position } title="must add:"/>
                        </div>


                        { state?.message && (
                            <p className="text-red-500 text-sm mt-1">{ state.message }</p>
                        ) }
                        <div className="card-actions">
                            <button
                                disabled={ pending }
                                type="submit"
                                className={ `btn btn-primary w-full ${ pending ? "btn-disabled " : "" } mt-5` }
                            >
                                { pending ? "Creating..." : "Create" }
                                <LoadingAction isLoading={ pending }/>
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

export function DepartmentModalDelete({ department }: { department: Departements }) {
    const { pending } = useFormStatus()
    const onDelete = async () => {
        await onAction(async () => await departmentDelete(department.id),
            `Success Delete Data Department By ID ${ department.id }`)
    }

    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */ }
            <button className="btn btn-error btn-sm btn-square" onClick={ () => {
                // @ts-ignore
                document.getElementById(`DepartmentModalDelete_${ department.id }`).showModal()
            } }>
                <Trash/>
            </button>
            <dialog id={ `DepartmentModalDelete_${ department.id }` } className="modal">
                <div className="modal-box space-y-5">
                    <h2 className="card-title">Delete ID { department.id } - Position { department.position }</h2>
                    <p>Are You Sure want Delete this data ???</p>
                    <div className="modal-action">
                        <button className={ `btn btn-error  btn-square ${ pending && 'btn-disabled' }` }
                                onClick={ onDelete }>
                            <Trash/>
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

export function DepartmentModalUpdate({ department }: { department: Departements }) {
    const [ position, setPosition ] = useState(department.position)
    const { pending } = useFormStatus()
    const onUpdate = async (data: DepartmentUpdateActionType) => {
        await onAction(() => departmentUpdate(data), `Success Delete Data Department By ID ${ department.id }`)
    }

    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */ }
            <button className="btn btn-info btn-sm btn-square" onClick={ () => {
                // @ts-ignore
                document.getElementById(`DepartmentModalUpdate_${ department.id }`).showModal()
            } }>
                <Pen/>
            </button>
            <dialog id={ `DepartmentModalUpdate_${ department.id }` } className="modal">
                <div className="modal-box space-y-5">
                    <h2 className="card-title">Update ID { department.id } - Position { department.position }</h2>
                    <p>Are You Sure want Update this data ???</p>
                    <input type="text" onChange={ e => setPosition(e.target.value) }
                           className="input input-bordered w-full"
                    />
                    <div className="modal-action">
                        <button className={ `btn btn-info  btn-square ${ pending && 'btn-disabled' }` }
                                onClick={ () => onUpdate({ departmentId: department.id, position }) }>
                            <Pen/>
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


