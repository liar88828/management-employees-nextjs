import { i3x4, ijazah, ktp, TEmployeeDB } from "@/interface/entity/employee.model";
import { toDate, toDateIndo } from "@/utils/toDate";
import React from "react";
import Link from "next/link";
import { Employees } from "@prisma/client";

export function EmployeeCVPageAdmin({ employee }: {
    employee: TEmployeeDB;
}) {
    return (
        <div className="card w-full max-w-3xl mx-auto bg-white card-bordered">
            <div className="card-body">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 avatar">
                            {/* eslint-disable-next-line @next/next/no-img-element */ }
                            <img
                                className="rounded-full"
                                src={ `${ employee.img }` }
                                alt={ employee.name }
                            />
                            {/*<p>{ employee.name.split(' ').map(n => n[0]).join('') }</p>*/ }
                        </div>
                        <div>
                            <div className="card-title text-2xl">{ employee.name }</div>
                            <p className="text-sm text-muted-foreground">{ employee.jobTitle }</p>
                        </div>
                    </div>

                </div>
                <div className="divider "></div>

                <div className=" grid gap-6 mt-2">
                    <section>
                        <h3 className="font-semibold mb-2">Contact Information</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <p><strong>Email:</strong> { employee.email }</p>
                            <p><strong>Phone:</strong> { employee.phone }</p>
                            <p><strong>Birth Date:</strong> { toDate(employee.dateOfBirth) }</p>
                            <p><strong>Address:</strong> { employee.address }</p>
                            <p><strong>City:</strong> { employee.city }</p>
                            <p><strong>Country:</strong> { employee.country }</p>
                        </div>
                    </section>

                    <section>
                        <h3 className="font-semibold mb-2">Professional Details</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <p><strong>Department:</strong> { employee.department }</p>
                            <p><strong>Hire Date:</strong> { toDate(employee.hireDate) }</p>
                            <p><strong>Employee ID:</strong> { employee.id }</p>
                        </div>
                        <div className="divider "></div>

                    </section>

                    <section>
                        <h3 className="font-semibold mb-2">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            { employee.skills && employee.skills.map(({ text }, index) => (
                                <div className="badge badge-neutral badge-outline" key={ index }>
                                    { text }
                                </div>
                            )) }
                        </div>
                    </section>

                    <section>
                        <h3 className="font-semibold mb-2">Education</h3>
                        <p className="text-sm">{ employee.education }</p>
                    </section>

                    <section>
                        <h3 className="font-semibold mb-2">Languages</h3>
                        <ul className="list-disc list-inside text-sm">
                            { employee.languages && employee.languages.map(({ text: language }, index) => (
                                <li key={ index }>{ language }</li>
                            )) }
                        </ul>
                    </section>

                    <section>
                        <h3 className="font-semibold mb-2">Ktp</h3>
                        {/* eslint-disable-next-line @next/next/no-img-element */ }
                        <img src={ employee?.photoKtp ?? ktp }
                             alt="image ktp"
                             className={ "aspect-[4/3] " }
                        />
                    </section>

                    <section>
                        <h3 className="font-semibold mb-2">Photo 3x4</h3>
                        {/* eslint-disable-next-line @next/next/no-img-element */ }
                        <img src={ employee.photoKtp ?? i3x4 }
                             alt=""
                             className={ "aspect-[4/3] " }
                        />
                    </section>

                    <section>
                        <h3 className="font-semibold mb-2">Ijazah</h3>
                        {/* eslint-disable-next-line @next/next/no-img-element */ }
                        <img src={ employee?.photoIjasah ?? ijazah }
                             alt="image ktp"
                             className={
                                 // "w-[21cm] h-[33cm]"
                                 'aspect-[33/21]'
                             }
                        />
                    </section>
                </div>
            </div>
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


