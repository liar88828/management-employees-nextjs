import React from "react";
import { EmployeeCVProps, i3x4, ktp, TEmployeeDB } from "@/interface/entity/employee.model";
import { EmployeePhotosUploadClientAdmin } from "@/app/components/employee/employee.client";
import { Employees } from "@prisma/client";
import { toDate } from "@/utils/toDate";
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
