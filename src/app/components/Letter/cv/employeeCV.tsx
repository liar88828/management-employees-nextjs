import { TEmployeeDB } from "@/interface/entity/employee.model";
import { toDate } from "@/utils/toDate";
import React from "react";

export function EmployeeCV({ employee }: { employee: TEmployeeDB }) {
    return (
        <div
            // w-[210mm]
            // h-[297mm]
            className=" bg-white text-black print:shadow-none shadow-lg card max-w-4xl print:h-screen print:w-screen"
        >
            <div className="card-body">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 avatar">
                            {/* eslint-disable-next-line @next/next/no-img-element */ }
                            <img
                                className="rounded-full"
                                // src={ `https://api.dicebear.com/6.x/initials/svg?seed=${ employee.userName }` }
                                src={ employee.img }
                                alt={ employee.User.name }
                            />
                            {/*<p>{ employee.userName.split(' ').map(n => n[0]).join('') }</p>*/ }
                        </div>
                        <div>
                            <div className="card-title text-2xl">{ employee.User.name }</div>
                            <p className="text-sm text-muted-foreground">{ employee.jobTitle }</p>
                        </div>
                    </div>

                </div>

                <div className="divider"></div>
                <div className=" grid gap-6 ">
                    <section>
                        <h3 className="font-semibold mb-2">Contact Information</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <p><strong>Email:</strong> { employee.User.email }</p>
                            <p><strong>Phone:</strong> { employee.User.phone }</p>
                            <p><strong>Birth Date:</strong> { toDate(employee.dateOfBirth) }</p>

                            <p><strong>Address:</strong> { employee.address }</p>
                            <p><strong>City:</strong> { employee.city }</p>
                            {/*<p><strong>Country:</strong> { employee.country }</p>*/ }
                        </div>
                    </section>

                    <section>
                        <h3 className="font-semibold mb-2">Professional Details</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            {/*<p><strong>Position:</strong> { employee.position }</p>*/ }
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
                            { employee.Educations && employee.Educations.map(({ text }, index) => (
                                <li key={ index }>{ text }</li>
                            )) }
                        </ul>
                    </section>

                    <section>
                        <h3 className="font-semibold mb-2">Skills</h3>
                        <ul className="list-disc list-inside text-sm">
                            { employee.Skills && employee.Skills.map(({ text }, index) => (
                                <li key={ index }>{ text }</li>
                            )) }
                        </ul>
                    </section>

                    {/*<section>*/ }
                    {/*    <h3 className="font-semibold mb-2">Languages</h3>*/ }
                    {/*    <ul className="list-disc list-inside text-sm">*/ }
                    {/*        { employee.languages && employee.languages.map(({ text }, index) => (*/ }
                    {/*            <li key={ index }>{ text }</li>*/ }
                    {/*        )) }*/ }
                    {/*    </ul>*/ }
                    {/*</section>*/ }
                </div>
            </div>
        </div>
    );
}
