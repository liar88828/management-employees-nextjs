'use client'
import React, { useState } from "react";
import toast from "react-hot-toast";
import { UserDB } from "@/interface/entity/user.model";
import { TEmployeeDB } from "@/interface/entity/employee.model";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onUpsertDataUserAction, registrationFinishedState } from "@/app/(user)/registration/registration-user.action";
import {
    InputDate,
    InputImage,
    InputSelect,
    InputText,
    InputTextArea,
    InputTextDynamic
} from "@/app/components/form/state";
import { constantGender, constantWorkTime } from "@/assets/constant";
import { RegistrationError } from "@/app/components/error/registrationFirst";
import { UploadDocument } from "@/app/components/employee/client/upload-document";
import {
    registrationCreateClientUser,
    registrationSanitizerUser,
    RegistrationUserCreateClient
} from "@/app/(user)/registration/registration-user-sanitizer";

export function RegistrationFormClientUser({ employee, method, user, type, error }: {
    user: UserDB,
    employee: TEmployeeDB | null,
    method: "POST" | 'PUT',
    error: string,
    type: string
}) {
// console.log(employee,'RegistrationFormClientUser')
    // const router = useRouter();
    const [ errorImage, setErrorImage ] = useState<string | undefined>()

    const methods = useForm<RegistrationUserCreateClient>({
        resolver: zodResolver(registrationCreateClientUser),
        defaultValues: registrationSanitizerUser(employee, user)
    });
    const { handleSubmit, formState: { errors, isLoading }, watch, setValue, reset } = methods
    console.log("registrationFormClientUser", errors)
    // const { clear } = useFormPersist("form-registration-user", { watch, setValue });
    const onSubmit = async (data: any) => {
        setErrorImage(undefined)
        const response = await onUpsertDataUserAction(method, data, user.id, employee?.id);
        if (response.success) {
            // clear()
            // reset()
            toast.success(response.message);
            console.log('is successfully');
        } else {
            toast.error(response.message);
        }
    }
    // const actionRegistrationFinished = registrationFinishedAction.bind(null, { userId: user.id })

// @ts-ignore
    return ( <div className="flex flex-col gap-5">
            { error && type === 'form' && <RegistrationError error={ error } /> }
            <FormProvider { ...methods }>
                <form onSubmit={ handleSubmit(onSubmit) } className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <InputText title={ 'name' } keys={ 'name' } isDisable={ false } />
                        <InputText title={ 'email' } keys={ 'email' } isDisable={ true } />
                        <InputText title={ 'phone' } keys={ 'phone' } isDisable={ false } />
                        <InputSelect keys={ 'gender' } title={ 'gender' } array={ constantGender } />
                        <InputDate keys={ 'dateOfBirth' } title={ 'Date Birth' } />
                        <InputText title={ 'Job Title' } keys={ 'jobTitle' } />
                        <InputTextArea title={ 'address' } keys={ 'address' } />
                        <InputText title={ 'city' } keys={ 'city' } />
                        <InputText title={ 'postal code' } keys={ 'postalCode' } />
                        <InputSelect keys={ 'workTime' } title={ 'Work Time' } array={ constantWorkTime } />
                        <InputTextDynamic keys={ 'educations' } title={ 'Educations' } />
                        <InputTextDynamic keys={ 'skills' } title={ 'Skills' } />
                    </div>
                    <InputImage img={ employee?.img } title={ 'Image Company' } errorText={ errorImage } />

                    <div className="form-control mt-6">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={ isLoading }
                        >
                            { method === 'POST' ? 'Create' : 'Update' } Employee
                        </button>
                    </div>
                </form>
            </FormProvider>
            { error && type === "ktp" && <RegistrationError error={ error } /> }
            <UploadDocument
                user={ user }
                imageData={ employee?.photoKtp ?? null }
                title={ 'KTP' }
            />
            { error && type === "ijazah" && <RegistrationError error={ error } /> }
            <UploadDocument
                user={ user }
                imageData={ employee?.photoIjazah ?? null }
                title={ 'ijazah' }
            />

            <button
                type="button"
                onClick={ async () => {
                    const response = await registrationFinishedState({ userId: user.id })
                    if (response.success) {
                        toast.success(response.message);
                    } else {
                        toast.error(response.message);
                    }
                } }
                className={ 'btn btn-success btn-block' }
            >
                Finish
            </button>

        </div>
    );
}
