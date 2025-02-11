'use client'
import React, { useActionState } from "react";
import { FormError } from "@/app/components/FormError";
import { departmentCreate, departmentDelete } from "@/server/action/department";
import { Departements } from ".prisma/client";
import { Plus, Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { LoadingAction } from "@/app/components/LoadingData";

export function ModalCreateDepartment() {
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
        ;
}

export function ModalDeleteDepartment({ department }: { department: Departements }) {
    const [ state, action, pending ] = useActionState(departmentCreate, undefined);
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */ }
            <button className="btn btn-error btn-sm btn-square" onClick={ () => {
                // @ts-ignore
                document.getElementById(`ModalDeleteDepartment_${ department.id }`).showModal()
            } }>
                <Trash/>
            </button>
            <dialog id={`ModalDeleteDepartment_${ department.id }`} className="modal">
                <div className="modal-box space-y-5">
                    <h2 className="card-title">Delete ID { department.id } - Position { department.position }</h2>
                    <p>Are You Sure want Delete this data ???</p>
                    <div className="modal-action">
                        <DepartmentDeleteButton department={ department }/>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */ }
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    )
        ;
}

export function DepartmentDeleteButton({ department }: { department: Departements }) {

    const { mutate, isPending } = useMutation({
            onSuccess: (data) => toast.success(data.message),
            onError: (error) => toast.error(error.message),
            mutationFn: () => departmentDelete(department.id)
        }
    )

    return (
        <button className={ `btn btn-error  btn-square ${ isPending && 'btn-disabled' }` }
                onClick={ () => mutate() }>
            <Trash/>
        </button>

    );
}

