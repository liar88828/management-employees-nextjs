'use client'
import {EmployeeCVProps, TEmployeeDB} from "@/interface/entity/employee.model";
import {usePrint} from "@/hook/usePrint";
import React from "react";
import {toDate} from "@/utils/toDate";
import Link from "next/link";
import {Printer} from "lucide-react";

export function EmployeeCV({employee}: EmployeeCVProps) {
    const {isPrinting, handlePrint, contentRef} = usePrint()
    return (
        <div ref={contentRef}>
            <EmployeeCVPageAdmin employee={employee}/>
            <div className=" print:hidden gap-2 mt-2 flex items-center">
                <Link href={+employee.id + '/edit'}
                      className={'btn btn-success'}
                >
                    Edit
                </Link>

                <button
                    onClick={handlePrint}
                    disabled={isPrinting}
                    className={'btn btn-info'}
                >
                    {isPrinting ? 'Printing...' : <Printer/>}
                </button>
            </div>
        </div>
    );
}

export function EmployeeCVPageAdmin({employee}: { employee: TEmployeeDB }) {
    return (
        <div className="card w-full max-w-3xl mx-auto bg-white card-bordered">
            <div className="card-body">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 avatar">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                className="rounded-full"
                                // src={ `https://api.dicebear.com/6.x/initials/svg?seed=${ employee.name }` }
                                src={`/${employee.img}`}
                                alt={employee.name}
                            />
                            {/*<p>{ employee.name.split(' ').map(n => n[0]).join('') }</p>*/}
                        </div>
                        <div>
                            <div className="card-title text-2xl">{employee.name}</div>
                            <p className="text-sm text-muted-foreground">{employee.jobTitle}</p>
                        </div>
                    </div>

                </div>
                <div className="divider "></div>

                <div className=" grid gap-6 mt-2">
                    <section>
                        <h3 className="font-semibold mb-2">Contact Information</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <p><strong>Email:</strong> {employee.email}</p>
                            <p><strong>Phone:</strong> {employee.phone}</p>
                            <p><strong>Birth Date:</strong> {toDate(employee.dateOfBirth)}</p>

                            <p><strong>Address:</strong> {employee.address}</p>
                            <p><strong>City:</strong> {employee.city}</p>
                            <p><strong>Country:</strong> {employee.country}</p>
                        </div>
                    </section>

                    <section>
                        <h3 className="font-semibold mb-2">Professional Details</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <p><strong>Department:</strong> {employee.department}</p>
                            <p><strong>Hire Date:</strong> {toDate(employee.hireDate)}</p>
                            <p><strong>Employee ID:</strong> {employee.id}</p>
                        </div>
                        <div className="divider "></div>

                    </section>

                    <section>
                        <h3 className="font-semibold mb-2">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {employee.skills && employee.skills.map(({text}, index) => (
                                <div className="badge badge-neutral badge-outline" key={index}>
                                    {text}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="font-semibold mb-2">Education</h3>
                        <p className="text-sm">{employee.education}</p>
                    </section>

                    <section>
                        <h3 className="font-semibold mb-2">Languages</h3>
                        <ul className="list-disc list-inside text-sm">
                            {employee.languages && employee.languages.map(({text: language}, index) => (
                                <li key={index}>{language}</li>
                            ))}
                        </ul>
                    </section>

                    {/*<section>*/}
                    {/*    <h3 className="font-semibold mb-2">Certifications</h3>*/}
                    {/*    <ul className="list-disc list-inside text-sm">*/}
                    {/*        { employee.certifications && employee.certifications.map(({ text: cert }, index) => (*/}
                    {/*            <li key={ index }>{ cert }</li>*/}
                    {/*        )) }*/}
                    {/*    </ul>*/}
                    {/*</section>*/}

                    {/*<section>*/}
                    {/*    <h3 className="font-semibold mb-2">Projects</h3>*/}
                    {/*    <ul className="list-disc list-inside text-sm">*/}
                    {/*        { employee.projects && employee.projects.map(({ text: project }, index) => (*/}
                    {/*            <li key={ index }>{ project }</li>*/}
                    {/*        )) }*/}
                    {/*    </ul>*/}
                    {/*</section>*/}
                </div>

            </div>
        </div>
    );
}
