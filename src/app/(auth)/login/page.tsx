'use client';
import React from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import useFormPersist from "react-hook-form-persist";
import { loginState } from "@/server/action/auth.action";
import { redirect, useSearchParams } from "next/navigation";
import { InputEmail, InputPassword } from "@/app/components/form/state";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, LoginFormSchemaType } from "@/schema/auth.valid";

export default function LoginForm() {
    const methods = useForm<LoginFormSchemaType>({
        resolver: zodResolver(loginFormSchema),
    });
    const { handleSubmit, formState: { errors, isLoading }, watch, setValue, reset } = methods
    const { clear } = useFormPersist("auth-login", { watch, setValue, exclude: [ 'password' ] });
    const searchParam = useSearchParams()
    const message = searchParam.get('message')
    const onSubmit = async (data: any) => {
        const response = await loginState(data);
        if (response.success) {
            clear()
            reset()
            toast.success(response.message);
            if (response.response.role === 'ADMIN') {
                redirect('/admin')
            } else if (response.response.role === 'USER') {
                redirect('/user')
            }
        } else {
            toast.error(response.message);
        }
    }
    console.log(errors)
    return (
        <div className="card bg-base-200 max-w-xl mt-10">
            <FormProvider { ...methods }>
                <form onSubmit={ handleSubmit(onSubmit) } className="card-body">
                    <h2 className="card-title">Login { message &&
                        <span className={ 'text-error' }>{ message }</span> }</h2>

                    <InputEmail title={ 'email' } keys={ 'email' } />
                    <InputPassword title={ 'password' } keys={ 'password' } />

                    <div className="card-actions">
                        <button
                            disabled={ isLoading }
                            className={ `btn btn-primary w-full ${ isLoading ? "btn-disabled" : "" } mt-5` }
                            type="submit"
                        >
                            { isLoading ? "Login..." : "Login" }
                        </button>

                        <div className="flex sm:justify-between w-full flex-col sm:flex-row">
                            <div>
                                Dont Have Account
                                <Link href="/register" className={ `btn btn-link mx-0.5 px-0.5` }>Register</Link>Now!
                            </div>
                            <div>
                                Forget Password
                                <Link href="/reset" className={ `btn btn-link mx-0.5 px-0.5` }>Reset</Link>Now!
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}
