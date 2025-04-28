import React, { useActionState } from "react";
import { toDateIndo } from "@/utils/toDate";
import { prisma } from "@/config/prisma";
import { departmentCreateFormDataAction } from "@/server/action/department.action";
import { FormError } from "@/app/components/form/action";
import { LoadingAction } from "@/app/components/LoadingData";

export function PositionEmployeeList({ title, desc }: {
    title: string,
    desc: string,
}) {
    return (
        <div className="flex ">
            <p className={ 'text-nowrap' }>{ title } : </p>
            <p className={ 'text-right' }>{ desc }</p>
        </div>
    );
}
async function PositionEmployee_({ position, name }: { position: string, name?: string }) {
    const employees = await prisma.employees.findMany({
        where: {
            ...( name && { name: { contains: name } } ),
            department: position
        },
        include: {
            User: {
                omit: {
                    password: true, otp: true, otpExpired: true
                }
            }
        }
    })
    return (
        <section>
            <h1 className={ 'text-xl font-bold' }>{ position }</h1>

            {
                employees.length === 0
                    ? <h1 className={ 'card-title' }>Empty Data</h1>
                    : <div className={ 'grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4' }>
                        { employees.map((employee) => (
                            <div className="card bg-base-200 " key={ employee.id }>
                                <div className="card-body">
                                    <PositionEmployeeList title={ 'Name' } desc={ employee?.User?.name ?? '' } />
                                    <PositionEmployeeList title={ 'email' } desc={ employee.User?.email ?? '' } />
                                    <PositionEmployeeList title={ 'Phone' } desc={ employee.User?.phone ?? '' } />
                                    <PositionEmployeeList title={ 'Hire' } desc={ toDateIndo(employee.hireDate) } />
                                </div>
                            </div>
                        )) }
                    </div>
            }
        </section>
    );
}

export function PositionModalCreatexx() {
    const [ state, action, pending ] = useActionState(departmentCreateFormDataAction, undefined);
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
