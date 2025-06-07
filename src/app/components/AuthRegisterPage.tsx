'use client'
import { useState } from "react";
import { useOtpStore } from "@/store/otp";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { registerFormSchema, RegisterFormSchemaType } from "@/schema/auth.valid";
import { zodResolver } from "@hookform/resolvers/zod";
import useFormPersist from "react-hook-form-persist";
import { authRegisterAction } from "@/action/auth.action";
import toast from "react-hot-toast";
import { InputEmail, InputPassword, InputText } from "@/app/components/ui/form/state";
import Link from "next/link";

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
                        <h2 className="card-title">Register </h2>
                        <p className={ 'text-error' }>{ error }</p>
                        <p className={ 'text-success' }>{ message }</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <InputText title={ 'name' } keys={ 'name' } />
                        <InputEmail title={ 'email' } keys={ 'email' } onChange={ email => setData({ email }) } />
                        <InputText title={ 'phone' } keys={ 'phone' } />
                        <div className=""></div>
                        <InputPassword title={ 'password' } keys={ 'password' } />
                        <InputPassword title={ 'confirm' } keys={ 'confirm' } />
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
                            { isDisabled ? "Register..." : "Register" }
                        </button>
                        <div>
                            Already have an account?
                            <Link href="/login" className="btn btn-link mx-0.5 px-0.5">
                                Login
                            </Link>
                            Now!
                        </div>
                    </div>
                </form>

            </FormProvider>
        </div>
    );
}
