'use client';

import { useActionState } from "react";
import { createCompanyAction } from "@/server/action/company";
import { Companys } from "@prisma/client";
import { MyInput, MyInputImage } from "@/app/components/form";

interface CompanyClientProps {
    company?: Companys
}

export default function CompanyClient({ company }: CompanyClientProps) {
    const [ state, action, pending ] = useActionState(createCompanyAction, undefined);
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
                    <MyInputImage defaultValue={ company?.img }
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
