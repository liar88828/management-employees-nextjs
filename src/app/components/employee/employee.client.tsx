'use client'
import Form from "next/form";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { Plus } from "lucide-react";
import { TypeFile, uploadFileAction } from "@/server/action/upload.action";
import { TEmployeeDB } from "@/interface/entity/employee.model";
import { EmployeePhotoPageAdmin } from "@/app/components/employee/employeePhotoPageAdmin";

export interface EmployeeCVProps {
    employee: TEmployeeDB,
    type: string,
}

export function EmployeePhotosUploadClientAdmin({ employee, type }: EmployeeCVProps & { type: TypeFile }) {
    const [ imagePreview, setImagePreview ] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setImagePreview(previewURL);
        }
    };
    const uploadImage = uploadFileAction.bind(null, {
        id: employee.id,
        from: 'employee',
        typeFile: type
    })

    return (
        <EmployeePhotoPageAdmin
            type={ type }
            imagePreview={ imagePreview }
            employee={ employee }
            action={ uploadImage }
            onChange={ handleFileChange }
        />
    )
}

export function EmployeeSearchClientAdmin({ children }: { children: React.ReactNode }) {
    const { setFilter, filter } = useEmployeeStore();

    return (
        <>
            <div className="flex justify-between gap-2">
                <Form action={ '/admin/employee' } className="join w-full">
                    <input
                        onChange={ e => setFilter({ name: e.target.value }) }
                        type="text"
                        className={ 'input input-bordered join-item w-full' }
                        name={ 'search' }
                        value={ filter.name }
                    />
                    <select className="select select-bordered join-item w-fit"
                            defaultValue={ '' }
                            onChange={ e => setFilter({ status: e.target.value }) }
                            name={ 'status' }
                    >
                        <option disabled value={ '' }>Filter</option>
                        {/*<option value={ '' }>All</option>*/ }
                        <option>Pending</option>
                        <option>Fail</option>
                        <option>Complete</option>
                        <option>Active</option>
                        <option>Disabled</option>
                    </select>
                </Form>
                <Link href={ '/admin/employee/create' } className={ 'btn btn-square' }>
                    <Plus />
                </Link>
            </div>
            { children }
        </>
    );
}

function useEmployeeStore(): { setFilter: any; filter: any; } {
    throw new Error("Function not implemented.");
}
