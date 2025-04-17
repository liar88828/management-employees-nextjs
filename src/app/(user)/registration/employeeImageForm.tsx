import { TEmployeeDB } from "@/interface/entity/employee.model";
import { RegistrationError } from "@/app/components/error/registrationFirst";
import { UploadDocument } from "@/app/components/employee/client/upload-document";
import React from "react";

export function EmployeeImageForm(props: { employee?: TEmployeeDB, error: string, type: string }) {
    return <>
        { props.employee && (
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                <div className="">
                    { props.error && props.type === "ktp" && <RegistrationError error={ props.error } /> }
                    <UploadDocument
                        employee={ props.employee }
                        type={ "KTP" }
                    />
                </div>
                <div className="">
                    { props.error && props.type === "3x4" && <RegistrationError error={ props.error } /> }
                    <UploadDocument
                        employee={ props.employee }
                        type={ "3x4" }
                    />
                </div>
                <div className="">
                    { props.error && props.type === "ijazah" && <RegistrationError error={ props.error } /> }
                    <UploadDocument
                        employee={ props.employee }
                        type={ "ijazah" }
                    />
                </div>
            </div>
        ) }
    </>;
}
