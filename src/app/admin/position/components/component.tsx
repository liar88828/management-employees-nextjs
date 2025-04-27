import React from "react";
import { toDateIndo } from "@/utils/toDate";
import { prisma } from "@/config/prisma";
import { PositionEmployeeList } from "@/app/admin/position/components/positionEmployeeList";
import { useFormStatus } from "react-dom";
import { onAction } from "@/server/action/OnAction";
import { departmentDelete } from "@/server/action/department";
import { Trash } from "lucide-react";
import { Department } from "@/interface/entity/departement.model";

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

export function DepartmentModalDelete({ department }: { department: Department }) {
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
