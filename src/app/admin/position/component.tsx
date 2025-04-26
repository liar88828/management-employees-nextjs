import React from "react";
import { EmployeeUserClient } from "@/interface/entity/employee.model";
import { toDateIndo } from "@/utils/toDate";
import { prisma } from "@/config/prisma";

export async function PositionEmployeeTable({ employees }: { employees: EmployeeUserClient[] }) {

    return (
        <section>
            { employees.length === 0 ? (
                <h1 className="card-title">Empty Data</h1>
            ) : (
                <div className="overflow-x-auto ">
                    <table className="table table-zebra w-full table-sm">
                        <thead>
                        <tr className=" text-left">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Hire Date</th>
                            <th>Position</th>
                        </tr>
                        </thead>
                        <tbody>
                        { employees.map((employee) => (
                            <tr key={ employee.id } className="hover:bg-gray-100/20">
                                <td>{ employee.User?.name }</td>
                                <td>{ employee.User?.email }</td>
                                <td className="text-nowrap">{ employee.User?.phone }</td>
                                <td>{ toDateIndo(employee.hireDate) }</td>
                                <td>{ employee.department }</td>
                            </tr>
                        )) }
                        </tbody>
                        <tfoot>
                        <tr>
                            <td></td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            ) }
        </section>
    );
}
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
