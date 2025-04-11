import React from 'react';
import { prisma } from "@/config/prisma";
import Form from "next/form";
import { toDateIndo } from "@/utils/toDate";
import { TContext } from "@/interface/server/param";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getContextQuery } from "@/utils/requestHelper";
import { PlusIcon } from "lucide-react";

async function Page(context: TContext) {
    const positionQuery = await getContextQuery(context, 'query')
    const search = await getContextQuery(context, 'search')
    const departments = await prisma.employees.groupBy({ by: [ 'department' ] })

    async function onSearch(formData: FormData) {
        'use server'
        const searchForm = formData.get('search')
        redirect(`/admin/position?search=${ searchForm }&query=${ positionQuery }`)
    }

    return (
        <div className="space-y-5">
            <div className="flex justify-between gap-4">
                <div className="flex gap-4">
                    <Form action={ onSearch } className={ 'join ' }>
                        <input name="search"
                               defaultValue={ search }
                               className={ 'input input-bordered join-item' }
                        />
                        <button
                            className={ 'btn join-item' }
                            type="submit">Submit
                        </button>
                    </Form>

                    <details className="dropdown">
                        <summary className="btn ">Select Position</summary>
                        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li>
                                <Link
                                    href={ `?search=${ search }&query=` }>All Position</Link>
                            </li>
                            { departments.map((item) => (
                                <li key={ item.department }>
                                    <Link
                                        href={ `?search=${ search }&query=${ item.department }` }>{ item.department }</Link>
                                </li>
                            )) }
                        </ul>
                    </details>

                </div>

                <Link href={ '/admin/position/create' } className={ 'btn btn-info ' }>
                    Add Position <PlusIcon/>
                </Link>
            </div>

            <div className="space-y-5">
                <PositionEmployeeTable position={ positionQuery } name={ search }/>
            </div>
        </div>
    );
}

export default Page;

async function PositionEmployee({ position, name }: { position: string, name?: string }) {
    const employees = await prisma.employees.findMany({
        where: {
            ...(name && { name: { contains: name } }),
            department: position
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
                                    <PositionEmployeeList title={ 'Name' } desc={ employee.name }/>
                                    <PositionEmployeeList title={ 'email' } desc={ employee.email }/>
                                    <PositionEmployeeList title={ 'Phone' } desc={ employee.phone }/>
                                    <PositionEmployeeList title={ 'Hire' } desc={ toDateIndo(employee.hireDate) }/>
                                </div>
                            </div>
                        )) }
                    </div>
            }
        </section>
    );
}
async function PositionEmployeeTable({ position, name }: { position: string, name?: string }) {
    const employees = await prisma.employees.findMany({
        where: {
            name: { contains: name },
            department: { contains: position }
        }
    })
    return (
        <section>
            { employees.length === 0 ? (
                <h1 className="card-title">Empty Data</h1>
            ) : (
                <div className="overflow-x-auto ">
                    <table className="table bg-base-300 ">
                        <thead className="">
                        <tr className=" text-left">
                            <th className="">Name</th>
                            <th className="">Email</th>
                            <th className="">Phone</th>
                            <th className="">Hire Date</th>
                            <th className="">Position</th>
                        </tr>
                        </thead>
                        <tbody>
                        { employees.map((employee) => (
                            <tr key={ employee.id } className="hover:bg-gray-100/20">
                                <td className="">{ employee.name }</td>
                                <td className="">{ employee.email }</td>
                                <td className="text-nowrap">{ employee.phone }</td>
                                <td className="">{ toDateIndo(employee.hireDate) }</td>
                                <td className="">{ employee.department }</td>
                            </tr>
                        )) }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td ></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            ) }
        </section>
    );
}

function PositionEmployeeList({ title, desc }: {
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

