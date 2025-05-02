'use client'
import { useFieldArray, useFormContext } from "react-hook-form";
import { Minus, Plus } from "lucide-react";
import { TEmployeeDB } from "@/interface/entity/employee.model";
import { useState } from "react";
import { TypeFile, uploadFile } from "@/server/action/upload.action";
import { EmployeePhotoPageAdmin } from "@/app/components/employee/employeePhotoPageAdmin";

export function EmployeeFormContextClientAdmin({ title, keys }: { title: string, keys: string }) {
    const { register, control } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        control,
        name: keys
    });

    return (
        <div className="form-control ">
            <div className="flex justify-between mb-1">
                <label className="label items-end ">
                    <span className="label-text">{ title }</span>

                </label>
                <button
                    className="btn btn-info btn-square"
                    type="button"
                    onClick={ () => append({ text: "" }) }
                >
                    <Plus />
                </button>
            </div>
            <div className="space-y-2">
                { fields.map((item, index) => (
                    <div key={ item.id } className="flex gap-2">
                        <input
                            className="input input-bordered w-full"
                            { ...register(`${ keys }.${ index }.text`) } />
                        <button
                            className={ 'btn btn-error btn-square' }
                            type="button"
                            onClick={ () => remove(index) }
                        >
                            <Minus />
                        </button>
                    </div>
                )) }
            </div>
        </div>
    );
}


export function EmployeePhotosUploadClientAdmin({ employee, type }: { employee: TEmployeeDB, type: TypeFile }) {
    const [ imagePreview, setImagePreview ] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setImagePreview(previewURL);
        }
    };
    const uploadImage = uploadFile.bind(null, {
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
