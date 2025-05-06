'use client'
import React, { useState } from "react";
import toast from "react-hot-toast";
import useFormPersist from "react-hook-form-persist";
import { UserDB } from "@/interface/entity/user.model";
import { TEmployeeDB } from "@/interface/entity/employee.model";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeRegistrationUserCreateClient, EmployeeRegistrationUserCreateClient } from "@/schema/employee.valid";
import { onUpsertDataUserAction } from "@/server/action/employee-user.action";
import {
    InputDate,
    InputImage,
    InputSelect,
    InputText,
    InputTextArea,
    InputTextDynamic
} from "@/app/components/form/state";
import { ErrorValidation } from "@/utils/error/ErrorClass";
import { constantGender, constantWorkTime } from "@/assets/constant";

export function EmployeeFormClientUser({ employee, method, user }: {
    user: UserDB,
    employee: TEmployeeDB | null,
    method: "POST" | 'PUT'
}) {
    // const router = useRouter();
    const [ errorImage, setErrorImage ] = useState<string | undefined>()

    const methods = useForm<EmployeeRegistrationUserCreateClient>({
        resolver: zodResolver(employeeRegistrationUserCreateClient),
        // @ts-ignore
        defaultValues: employee
            ? {
                ...employee,
                dateOfBirth: employee
                    ? new Date(employee.dateOfBirth).toISOString().split('T')[0]
                    : "" // Format date to YYYY-MM-DD
            } : {
                name: user.name,
                email: user.email,
                phone: user.phone,
                // userId: user.id
            }
    });
    const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = methods
    const { clear } = useFormPersist("form-registration-user", { watch, setValue });
    // console.log(errors)
    const onSubmit = async (data: any) => {
        const idToast = toast.loading('Loading...')
        setErrorImage(undefined)
        try {
            // console.log("prevData : ",prevData)
            // prevData.userId = user.id
            // prevData.registration = false
            const response = await onUpsertDataUserAction(method, data, user.id, employee?.id);
            if (response?.success) {
                clear()
                reset()
                toast.success('Successfully created');
                console.log('is successfully');
                // router.push("/home")
            }
            throw new Error('Something went wrong');
        } catch (e) {
            console.log('is errors')
            // // console.log(e.message)
            if (e instanceof ErrorValidation) {
                console.log('e instanceof ErrorValidation')
                // console.log('---------')
                // console.log(e,'ErrorValidation')
                // console.log('---------')
            }
            if (e instanceof Error) {
                console.log('e instanceof Error')
                // console.log(e.message)
                // toast.errors(e.message);
                console.log(e.message.toLowerCase())
                if (e.message.toLowerCase().includes('image')) {
                    console.log('execute')
                    setErrorImage(e.message)
                }
            }
            // toast.errors(e);

        } finally {
            toast.dismiss(idToast)
        }
    };

    // @ts-ignore
    return (
        <FormProvider { ...methods }>
            <form onSubmit={ handleSubmit(onSubmit) } className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <InputText title={ 'name' } keys={ 'name' } isDisable={ true } />
                    <InputText title={ 'email' } keys={ 'email' } isDisable={ true } />
                    <InputText title={ 'phone' } keys={ 'phone' } isDisable={ true } />
                    <InputSelect keys={ 'gender' } title={ 'gender' } array={ constantGender } />
                    <InputDate keys={ 'dateOfBirth' } title={ 'Date Birth' } />
                    <InputText title={ 'Job Title' } keys={ 'jobTitle' } />
                    <InputTextArea title={ 'address' } keys={ 'address' } />
                    <InputText title={ 'city' } keys={ 'city' } />
                    <InputText title={ 'postal code' } keys={ 'postalCode' } />
                    <InputSelect keys={ 'workTime' } title={ 'Work Time' } array={ constantWorkTime } />
                    {/**/ }
                    <InputTextDynamic keys={ 'educations' } title={ 'Educations' } />
                    <InputTextDynamic keys={ 'skills' } title={ 'Skills' } />
                </div>
                <InputImage img={ employee?.img } title={ 'Image Company' } errorText={ errorImage } />

                <div className="form-control mt-6">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        // disabled={ isPending }
                    >
                        { method === 'POST' ? 'Create' : 'Update' } Employee
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}
