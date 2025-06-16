'use client'
import { authLoginAction } from "@/action/auth.action";
import { InputEmail, InputPassword } from "@/app/components/ui/FormComponent";
import { loginFormSchema, LoginFormSchemaType } from "@/schema/auth.valid";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";


export function AuthLoginPage() {
	const searchParam = useSearchParams()
	const message = searchParam.get('message') ?? ''

	const [ getMessage, setGetMessage ] = useState('')
	const methods = useForm<LoginFormSchemaType>({
		resolver: zodResolver(loginFormSchema),
		// defaultValues: {
		// 	email: "",
		// 	password: ""
		// } satisfies LoginFormSchemaType,
	});
	const { handleSubmit, formState: { errors, isLoading }, watch, setValue, reset } = methods
	// const { clear } = useFormPersist("auth-login", { watch, setValue, exclude: [ 'password' ] });

	const onSubmit = async (data: any) => {
		const response = await authLoginAction(data);
		if (response.success) {
			// clear()
			reset()
			toast.success(response.message);
			if (response.response.role === 'ADMIN') {
				redirect('/admin')
			} else if (response.response.role === 'USER') {
				redirect('/user')
			}
			setGetMessage(response.message)
		} else {
			toast.error(response.message);
			setGetMessage(response.message)
		}
	}
	// console.log(errors)
	return (
		<div className="card bg-base-200 max-w-xl mt-10">
			<FormProvider { ...methods }>
				<form onSubmit={ handleSubmit(onSubmit) } className="card-body">
					<div className="">
						<h2 className="card-title">Login </h2>
						<p className={ 'text-error' }>{ message }</p>
						<p className={ 'text-error' }>{ getMessage }</p>
					</div>
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
