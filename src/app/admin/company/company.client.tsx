'use client';

import React, { useActionState } from "react";
import { EmployeeFormContextClientAdmin, InputImage, InputText, MyInput, MyInputImage } from "@/app/components/form";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useFormPersist from "react-hook-form-persist";
import toast from "react-hot-toast";
import { CompanyFormSchema, CompanyFormSchemaType } from "@/schema/company.valid";
import { createCompanyAction, createCompanyActionFormData } from "@/server/action/company";
import { Companys } from "@prisma/client";
import { imageDefault } from "@/interface/entity/employee.model";

export default function CompanyClient({ company }: { company?: CompanyFormSchemaType }) {
    const methods = useForm<CompanyFormSchemaType>({
        resolver: zodResolver(CompanyFormSchema),
        defaultValues: company

    });
    const { handleSubmit, watch, setValue, formState: { isLoading } } = methods
    const { clear } = useFormPersist("form-registration", { watch, setValue });
    const onSubmit = async (data: CompanyFormSchemaType) => {
        const idToast = toast.loading('Loading...')
        try {
            await createCompanyAction(data)
            clear()
            toast.success('Successfully created');
        } catch (e) {
            if (e instanceof Error) {
                toast.error(e.message);
            }
        } finally {
            toast.dismiss(idToast)
        }
    };


    return (
        <FormProvider { ...methods }>
            <form onSubmit={ handleSubmit(onSubmit) } className="space-y-4">
                {/*<form action={ action } className="card-body">*/ }
                    <h2 className="card-title">Edit My Company</h2>
                    {/* Email Input */ }
                {/*{ company?.id && <input type="hidden" value={ company?.id } name={ 'id' }/> }*/ }

                <InputText keys={ 'name' } label={ 'Name' }/>
                <InputText keys={ 'address' } label={ 'Address' }/>
                <InputText keys={ 'phone' } label={ 'Phone' }/>
                <InputText keys={ 'email' } label={ 'Email' }/>
                <EmployeeFormContextClientAdmin keys={ 'visi' } label={ 'Visi' }/>
                <EmployeeFormContextClientAdmin keys={ 'misi' } label={ 'Misi' }/>
                <InputImage img={ company?.img } label={ 'Image Company' }/>
                {/*<MyInputImage defaultValue={ company?.img }*/ }
                {/*              title={ 'Company' }*/ }
                {/*              */ }
                {/*/>*/ }


                <div className="card-actions">
                        <button
                            type="submit"
                            className={ `btn btn-primary w-full  mt-5` }
                            disabled={ isLoading }
                        >
                            Save
                        </button>
                    </div>
                </form>
        </FormProvider>
    );
}

export function CompanyClientxxx({ company }: { company?: Companys }) {
    const [ state, action, pending ] = useActionState(createCompanyActionFormData, undefined);
    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-4xl card card-bordered bg-base-200 ">
                <form action={ action } className="card-body">
                    <h2 className="card-title">Edit My Company</h2>
                    {/* Email Input */ }
                    { company?.id && <input type="hidden" value={ company?.id } name={ 'id' }/> }

                    <MyInput title={ "name" }
                             defaultValue={ state?.value.name ?? company?.name }
                             error={ state?.errors?.name }/>
                    <MyInput title={ "address" }
                             defaultValue={ state?.value.address ?? company?.address }
                             error={ state?.errors?.address }/>
                    <MyInput title={ "phone" }
                             defaultValue={ state?.value.phone ?? company?.phone }
                             error={ state?.errors?.phone }/>
                    <MyInput title={ "email" }
                             defaultValue={ state?.value.email ?? company?.email }
                             error={ state?.errors?.email }/>
                    <MyInputImage defaultValue={ company?.img ?? imageDefault }
                                  title={ 'Company' }
                                  error={ state?.errors?.img }/>
                    { state?.message && (
                        <p className={ `${ state.success ? 'text-success' : 'text-error' } text-sm mt-1` }>{ state.message }</p>
                    ) }
                    <div className="card-actions">
                        <button
                            disabled={ pending }
                            type="submit"
                            className={ `btn btn-primary w-full ${ pending ? "btn-disabled" : "" } mt-5` }
                        >
                            { pending ? "Signing In..." : "Sign In" }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
