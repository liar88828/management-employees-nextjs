import React, { useActionState } from "react";
import { departmentCreate } from "@/server/action/department";
import { FormError } from "@/app/components/form/action";
import { LoadingAction } from "@/app/components/LoadingData";

export function PositionModalCreate() {
    const [ state, action, pending ] = useActionState(departmentCreate, undefined);
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */ }
            <button
                // btn-sm btn-square
                className="btn btn-success "
                onClick={ () => {
                    // @ts-ignore
                    document.getElementById('ModalCreateDepartment').showModal()
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
