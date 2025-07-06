'use client'
import { authRegisterAction } from "@/action/auth.action";
import { InputEmail, InputPassword, InputText } from "@/app/components/ui/FormComponent";
import { registerFormSchema, RegisterFormSchemaType } from "@/schema/auth.valid";
import { useOtpStore } from "@/store/otp";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import toast from "react-hot-toast";


export function AuthRegisterPage() {
	const [ message, setMessage ] = useState('')
	const [ error, setError ] = useState('')
	const { setData } = useOtpStore()
	const router = useRouter();
	const methods = useForm<RegisterFormSchemaType>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			confirm: '',
			email: '',
			name: '',
			password: '',
			phone: '',
		} satisfies RegisterFormSchemaType
	});
	const { handleSubmit, formState: { errors, isLoading }, watch, setValue, reset } = methods
	const { clear } = useFormPersist("auth-register", { watch, setValue, exclude: [ 'password' ] });

	const onSubmit = async (data: RegisterFormSchemaType) => {
		const response = await authRegisterAction(data);
		if (response.success) {
			reset()
			clear()
			toast.success(response.message);
			setMessage(response.message);
			router.push('/otp')
		} else {
			toast.error(response.message);
			setError(response.message)
		}
	}

	const isDisabled = isLoading;
	return (
		<div className="card bg-base-200 max-w-2xl mt-10 w-full">
			<FormProvider { ...methods }>
				<form onSubmit={ handleSubmit(onSubmit) } className="card-body">
					<div className="">
						<h2 className="card-title">Daftar </h2>
						<p className={ 'text-error' }>{ error }</p>
						<p className={ 'text-success' }>{ message }</p>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<InputText title="Nama" keys="name" />
						<InputEmail title="Email" keys="email" onChange={email => setData({ email })} />
						<InputText title="Telepon" keys="phone" />
						<div className=""></div>
						<InputPassword title="Kata Sandi" keys="password" />
						<InputPassword title="Konfirmasi Kata Sandi" keys="confirm" />
					</div>

					{/* Submit Button */ }
					<div className="card-actions mt-4">
						<button

							onClick={ e => setData({
								time: null,
								reason: "OTP"
							}) }
							disabled={ isDisabled }
							type="submit"
							className={ `btn btn-primary w-full ${ isDisabled ? "btn-disabled" : "" }` }
						>
							{isDisabled ? "Mendaftarkan..." : "Daftar"}
						</button>
						<div>
							Sudah punya akun?
							<Link href="/login" className="btn btn-link mx-0.5 px-0.5">
								Masuk
							</Link>
							Sekarang!
						</div>
					</div>
				</form>

			</FormProvider>
		</div>
	);
}
