import React from "react";
import { TEmployeeDB } from "@/interface/entity/employee.model";
import { EmployeePhotosUploadClientAdmin } from "@/app/components/employee/employee.client";
import { Employees } from "@prisma/client";
import { toDate } from "@/utils/toDate";

export function EmployeePhotoAdmin({ employee }: { employee: TEmployeeDB }) {
    return (
        <div className="grid grid-cols-2 gap-2">
            <EmployeePhotosUploadClientAdmin employee={ employee } type={ 'KTP' } />
            <EmployeePhotosUploadClientAdmin employee={ employee } type={ "3x4" } />
        </div>
    );
}

export function EmployeeDetail({ employee }: {
    employee?: Employees
}) {

    if (!employee) {
        return <p>Employee not found.</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">{ employee.name }</h2>
            { employee.img && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={ employee.img }
                    alt={ `${ employee.name }'s photo` }
                    className="w-48 h-48 object-cover rounded mb-4"
                />
            ) }
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p><strong>Email:</strong> { employee.email }</p>
                    <p><strong>Phone:</strong> { employee.phone || "N/A" }</p>
                    <p><strong>Gender:</strong> { employee.gender || "N/A" }</p>
                    <p><strong>Date of Birth:</strong> { toDate(employee.dateOfBirth ?? 0) || "N/A" }</p>
                    <p><strong>Hire Date:</strong> { toDate(employee.hireDate) }</p>
                    <p><strong>Job Title:</strong> { employee.jobTitle }</p>
                    <p><strong>Department:</strong> { employee.department || "N/A" }</p>
                </div>
                <div>
                    <p><strong>Salary:</strong> ${ employee.salary.toFixed(2) }</p>
                    <p><strong>Employment Type:</strong> { employee.employmentType }</p>
                    <p><strong>Status:</strong> { employee.status }</p>
                    <p><strong>Address:</strong> { employee.address || "N/A" }</p>
                    <p><strong>City:</strong> { employee.city || "N/A" }</p>
                    <p><strong>Postal Code:</strong> { employee.postalCode || "N/A" }</p>
                    <p><strong>Notes:</strong> { employee.notes || "N/A" }</p>
                </div>
            </div>
        </div>
    );
}

export function EmployeeCV({ employee }: { employee: TEmployeeDB }) {
    return (
        <div
            // w-[210mm]
            className=" bg-white text-black print:shadow-none shadow-lg card h-[297mm]  max-w-4xl print:h-screen print:w-screen">
            <div className="card-body">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 avatar">
                            {/* eslint-disable-next-line @next/next/no-img-element */ }
                            <img
                                className="rounded-full"
                                // src={ `https://api.dicebear.com/6.x/initials/svg?seed=${ employee.name }` }
                                src={ employee.img }
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

                <div className="divider"></div>
                <div className=" grid gap-6 ">
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

                    </section>

                    {/*<section>*/ }
                    {/*    <h3 className="font-semibold mb-2">Certifications</h3>*/ }
                    {/*    <ul className="list-disc list-inside text-sm">*/ }
                    {/*        { employee.certifications && employee.certifications.map(({ text: cert }, index) => (*/ }
                    {/*            <li key={ index }>{ cert }</li>*/ }
                    {/*        )) }*/ }
                    {/*    </ul>*/ }
                    {/*</section>*/ }

                    {/*<section>*/ }
                    {/*    <h3 className="font-semibold mb-2">Projects</h3>*/ }
                    {/*    <ul className="list-disc list-inside text-sm">*/ }
                    {/*        { employee.projects && employee.projects.map(({ text: project }, index) => (*/ }
                    {/*            <li key={ index }>{ project }</li>*/ }
                    {/*        )) }*/ }
                    {/*    </ul>*/ }
                    {/*</section>*/ }
                </div>

                <div className="divider "></div>
                <div className="grid grid-cols-2 sm:grid-cols-2 ">
                    <section>
                        <h3 className="font-semibold mb-2">Educations</h3>
                        <ul className="list-disc list-inside text-sm">
                            { employee.educations && employee.educations.map(({ text }, index) => (
                                <li key={ index }>{ text }</li>
                            )) }
                        </ul>
                    </section>

                    <section>
                        <h3 className="font-semibold mb-2">Skills</h3>
                        <ul className="list-disc list-inside text-sm">
                            { employee.skills && employee.skills.map(({ text }, index) => (
                                <li key={ index }>{ text }</li>
                            )) }
                        </ul>
                    </section>


                    <section>
                        <h3 className="font-semibold mb-2">Languages</h3>
                        <ul className="list-disc list-inside text-sm">
                            { employee.languages && employee.languages.map(({ text }, index) => (
                                <li key={ index }>{ text }</li>
                            )) }
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}


export function TimeLineEmployee() {
    return (
        <ul className="timeline">
            <TimeLineStart isActive={false} title={"Register"}/>
            <TimeLineMiddle title={'Register'} isActive={false}/>
            <TimeLineEnd title={'Register'} isActive={false}/>
        </ul>
    );
}


function TimeLineStart({title, isActive}: { title: string, isActive: boolean }) {
    return (
        <li>
            <div className="timeline-start timeline-box">{title}</div>
            <div className="timeline-middle">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`${isActive && 'text-primary'} h-5 w-5`}>
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"/>
                </svg>
            </div>
            <hr className={`${isActive && 'bg-primary'}`}/>
        </li>
    );
}


function TimeLineMiddle({title, isActive}: { title: string, isActive: boolean }) {
    return (
        <li>
            <hr className={`${isActive && 'bg-primary'}`}/>

            <div className="timeline-middle">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`${isActive && 'text-primary'} h-5 w-5`}>

                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"/>
                </svg>
            </div>
            <div className="timeline-end timeline-box">iMac</div>
            <hr className={`${isActive && 'bg-primary'}`}/>
        </li>
    );
}

function TimeLineEnd({title, isActive}: { title: string, isActive: boolean }) {
    return (
        <li>
            <hr className={`${isActive && 'bg-primary'}`}/>
            <div className="timeline-start timeline-box">{title}</div>
            <div className="timeline-middle">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`${isActive && 'text-primary'} h-5 w-5`}>

                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"/>
                </svg>
            </div>
        </li>
    );
}
