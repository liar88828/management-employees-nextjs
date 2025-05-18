'use client'
import { TEmployeeDB } from "@/interface/entity/employee.model";
import { useState } from "react";
import { TypeFile, uploadFileAction } from "@/server/action/upload.action";
import { EmployeePhotoPageAdmin } from "@/app/components/employee/employeePhotoPageAdmin";

export function EmployeePhotosUploadClientAdmin({ employee, type }: { employee: TEmployeeDB, type: TypeFile }) {
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
