'use client'
import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import { departmentUpdate, DepartmentUpdateActionType } from "@/server/action/department";
import { onAction } from "@/server/action/OnAction";
import { Departements } from ".prisma/client";

export function PositionModalUpdate({ department }: { department: Departements }) {
    const [ position, setPosition ] = useState(department.position)
    const { pending } = useFormStatus()
    const onUpdate = async (data: DepartmentUpdateActionType) => {
        await onAction(() => departmentUpdate(data), `Success Delete Data Department By ID ${ department.id }`)
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
