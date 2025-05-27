import { TEmployeeDB } from "@/interface/entity/employee.model";
import { toDate } from "@/utils/toDate";
import React from "react";
import { nextPublicBaseUrl } from "@/config/nextPublicBaseUrl";

export function EmployeeCVGlobal(
    {
        employee, ref
    }: {
        employee: TEmployeeDB,
        ref: React.Ref<HTMLDivElement>
    }) {
    return (
        <div
            ref={ ref }
            className="card w-full max-w-3xl  bg-white   shadow-lg print:shadow-none"
        >
            {/*mx-auto*/ }

            <div className="card-body">
                {/*justify-between items-center*/ }
                <div className="flex ">
                    <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 avatar">
                            <picture>
                                <img
                                    loading="lazy"
                                    className="rounded-full"
                                    // src={ `https://api.dicebear.com/6.x/initials/svg?seed=${ employee.userName }` }
                                    src={ `${ nextPublicBaseUrl }${ employee.img }` }
                                    alt={ employee.User.name }
                                />
                            </picture>
                        </div>
                        <div>
                            <div className="card-title text-2xl">{ employee.User.name }</div>
                            <p className="text-sm text-muted-foreground">{ employee.jobTitle }</p>
                        </div>
                    </div>

                </div>
                <div className="divider my-1 "></div>

                <div className=" grid gap-6 mt-2">
                    <section>
                        <h3 className="font-semibold mb-2">Contact Information</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <p><strong>Email:</strong> { employee.User.email }</p>
                            <p><strong>Phone:</strong> { employee.User.phone }</p>
                            <p><strong>Birth Date:</strong> { toDate(employee.dateOfBirth) }</p>

                            <p><strong>Address:</strong> { employee.address }</p>
                            <p><strong>City:</strong> { employee.city }</p>
                        </div>
                    </section>

                    <section>
                        <h3 className="font-semibold mb-2">Professional Details</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <p><strong>Hire Date:</strong> { toDate(employee.hireDate) }</p>
                            <p><strong>Employee ID:</strong> { employee.id }</p>
                        </div>

                    </section>
                </div>
                <div className="divider my-1 "></div>
                <div className="grid grid-cols-2 ">
                    <section>
                        <h3 className="font-semibold mb-2">Education</h3>
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
                </div>

            </div>
        </div>
    );
}
