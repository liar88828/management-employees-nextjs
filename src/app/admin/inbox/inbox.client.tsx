import { TEmployeeDB } from "@/interface/entity/employee.model";
import { toDateIndo } from "@/utils/toDate";
import React from "react";
import Link from "next/link";
import { Employees } from "@prisma/client";
import { EmployeeCV, EmployeePhotos } from "@/app/components/employee/employee.page";

export function EmployeeCVPageAdmin({ employee }: { employee: TEmployeeDB }) {
    return (
        <div className={ 'space-y-10' }>
            <EmployeeCV employee={ employee }/>
            <EmployeePhotos employee={ employee }/>
        </div>
    );
}

export function Pagination({ totalPages, search, status, page }: {
    totalPages: number,
    search: string,
    status: string,
    page: number
}) {
    return (
        <div className="flex justify-center mt-4 space-x-2">
            { Array.from({ length: totalPages }, (_, i) => (
                <Link key={ i + 1 } href={ `/admin/inbox?search=${ search }&status=${ status }&page=${ i + 1 }` }
                      className={ `btn ${ page === i + 1 ? 'btn-primary' : 'btn-outline' }` }>
                    { i + 1 }
                </Link>
            )) }
        </div>
    );
}

export function TableEmployees({ employees }: {
    employees: Employees[],
    // title: string,
    // valid?: boolean
}) {
    return (
        <section className="space-y-2">
            <h1 className={ '' }>List Employee</h1>

            <div className="overflow-x-auto">
                <table className="table bg-base-200 ">
                    <thead>
                    <tr className="text-left">
                        <th className="">No</th>
                        <th className="">Name</th>
                        <th className="">Email</th>
                        <th className="">Phone</th>
                        {/*<th className="">Gender</th>*/ }
                        {/*<th className="">Job Title</th>*/ }
                        <th className="">Department</th>
                        {/*<th className="">Employment Type</th>*/ }
                        <th className="">Hire Date</th>
                        {/*<th className="">Salary</th>*/ }
                        <th className="">Status</th>
                        <th className="">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    { employees.map((employee, index) => (
                        <tr key={ employee.id } className="hover:bg-gray-100/20">
                            <td className="">{ index + 1 }</td>
                            <td className="">{ employee.name }</td>
                            <td className="">{ employee.email }</td>
                            <td className="">{ employee.phone }</td>
                            {/*<td className="">{ employee.gender }</td>*/ }
                            {/*<td className="">{ employee.jobTitle }</td>*/ }
                            <td className="">{ employee.department }</td>
                            {/*<td className="">{ employee.employmentType }</td>*/ }
                            <td className="">{ toDateIndo(employee.hireDate) }</td>
                            {/*<td className="">{ employee.salary }</td>*/ }
                            <td className="">{ employee.status }</td>
                            <td className="">
                                <div className="">
                                    <Link
                                        className={ 'btn btn-info' }
                                        href={ `/admin/inbox/${ employee.id }` }>
                                        Detail
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    )) }
                    </tbody>
                    <tfoot>
                    <tr>
                        <th></th>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </section>
    );
}

export function InboxModalAction({ employees }: { employees: Employees }) {
    return (<>
            <button className="btn" onClick={ () => {
                // @ts-ignore
                document.getElementById(`InboxModalAction${ employees.id }`).showModal()
            } }>open modal
            </button>
            <dialog id={ `InboxModalAction${ employees.id }` } className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    { employees.name }
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */ }
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>

    )
}


