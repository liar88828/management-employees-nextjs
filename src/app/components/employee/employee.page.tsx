import React from "react";
import { EmployeeCVProps, i3x4, ktp, TEmployeeDB } from "@/interface/entity/employee.model";
import { EmployeePhotosUploadClientAdmin } from "@/app/components/employee/employee.client";
import { Employees } from "@prisma/client";
import { toDate } from "@/utils/toDate";
import Link from "next/link";
import { Printer } from "lucide-react";
import { TypeFile } from "@/server/action/upload";

export function EmployeePhotoAdmin({ employee }: EmployeeCVProps) {
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

export function EmployeeCVPageAdmin({ employee, onPrintAction, isPrinting }: {
    employee: TEmployeeDB;
    isPrinting: boolean;
    onPrintAction: () => void;

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
                                src={ `https://api.dicebear.com/6.x/initials/svg?seed=${ employee.name }` }
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
                        <h3 className="font-semibold mb-2">Certifications</h3>
                        <ul className="list-disc list-inside text-sm">
                            { employee.certifications && employee.certifications.map(({ text: cert }, index) => (
                                <li key={ index }>{ cert }</li>
                            )) }
                        </ul>
                    </section>

                    <section>
                        <h3 className="font-semibold mb-2">Projects</h3>
                        <ul className="list-disc list-inside text-sm">
                            { employee.projects && employee.projects.map(({ text: project }, index) => (
                                <li key={ index }>{ project }</li>
                            )) }
                        </ul>
                    </section>
                </div>
                <div className="  flex justify-end print:hidden gap-2 mt-2">
                    <Link href={ +employee.id + '/edit' }
                          className={ 'btn ' }
                    >
                        Edit
                    </Link>

                    <button
                        onClick={ onPrintAction }
                        disabled={ isPrinting }
                        className={ 'btn btn-info' }
                    >
                        { isPrinting ? 'Printing...' : <Printer /> }
                    </button>
                </div>
            </div>
        </div>
    );
}

export function EmployeePhotoPageAdmin(props: {
    type: TypeFile,
    imagePreview: string | null,
    employee: TEmployeeDB,
    action: (formData: FormData) => Promise<void>,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
    return (
        <div className="card card-bordered">
            <div className="card-body">
                <h2 className="card-title">Add { props.type } </h2>

                <div className="w-48 h-auto">
                    { props.imagePreview
                        ? (
                            <div className="mt-4">
                                <p>Image Preview:</p>
                                {/* eslint-disable-next-line @next/next/no-img-element */ }
                                <img src={ props.imagePreview } alt="Selected file"
                                     className="w-40 h-40 object-cover rounded-md border"
                                />
                            </div>
                        ) : props.type === "KTP"
                            // eslint-disable-next-line @next/next/no-img-element
                            ? <img src={ props.employee.photoKtp ?? ktp }
                                   alt="image ktp"
                                   className={ "aspect-[4/3] " }
                            /> :
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={ props.employee.photo3x4 ?? i3x4 }
                                 alt="image 4x3"
                                 className={ "aspect-[3/4] " }
                            />

                    }
                </div>
                <form action={ props.action } className="flex flex-col gap-4">
                    <label>
                        <span>Upload a file</span>
                        {/*<input type="hidden"/>*/ }
                        <input
                            type="file"
                            name="file"
                            accept="image/*"
                            onChange={ props.onChange }
                        />
                    </label>
                    <button
                        className={ "btn btn-info" }
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
