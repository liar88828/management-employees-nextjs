'use client'
import { useOtpStore } from "@/store/otp";
import { useEmail } from "@/hook/useEmail";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
    const router = useRouter();
    const { store, setData, reset } = useOtpStore()
    const { onReset } = useEmail()
    const [ messageError, setMessageError ] = useState<string | null>()

    const handlerReset = async () => {
        setMessageError(null)
        setData({
            loading: true,
            errorPassword: null,
            errorConfirm: null,
        })
        try {
            const response = await onReset({
                email: store.email,
                confirm: store.confirm,
                password: store.password,
                otp: store.otp,
            })
            if (response.success) {
                const willReset = reset()
                if (willReset) {
                    router.replace('/login')
                }

            } else {
                setMessageError(response.message)
                if (response.errors) {
                    setData({
                        errorPassword: response.errors.password ?? null,
                        errorConfirm: response.errors.confirm ?? null,
                    })
                }
            }
        } finally {
            setData({ loading: false })
        }
    }
    return (
        <div className="card card-bordered bg-base-200 ">
            <div className="card-body">
                <h2 className="card-title">Reset</h2>
                <p>Please fill the password and confirm password.</p>

                {/* Password Input */ }
                <div className="form-control w-full">
                    <label htmlFor="password" className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type={ 'password' }
                        value={ store.password }
                        onChange={ (e) => {
                            setData({ password: e.target.value })
                        } }
                        placeholder="Enter your password"
                        className="input input-bordered w-full"
                    />
                    { store.errorPassword && (
                        <div className="mt-2 text-red-500 text-sm">
                            <p>Password must:</p>
                            <ul className="list-disc list-inside">
                                { store.errorPassword.map((error) => (
                                    <li key={ error }>{ error }</li>
                                )) }
                            </ul>
                        </div>
                    ) }
                </div>

                <div className="form-control w-full">
                    <label htmlFor="name" className="label">
                        <span className="label-text">Confirm</span>
                    </label>
                    <input
                        type={ 'password' }
                        value={ store.confirm }
                        onChange={ (e) => {
                            setData({ confirm: e.target.value })
                        } }
                        placeholder="Enter your confirm Password"
                        className="input input-bordered w-full"
                    />
                    { store.errorConfirm && (
                        <div className="mt-2 text-red-500 text-sm">
                            <p>Confirm must:</p>
                            <ul className="list-disc list-inside">
                                { store.errorConfirm.map((error) => (
                                    <li key={ error }>{ error }</li>
                                )) }
                            </ul>
                        </div>
                    ) }
                </div>

                { messageError && (
                    <p className="text-red-500 text-sm mt-1">{ messageError }</p>
                ) }

                {/* Submit Button */ }
                <div className="card-actions">
                    <button
                        onClick={ async () => {
                            const willReset = await handlerReset()
                            // if (willReset) {
                            //     router.replace('/login')
                            // }
                        } }
                        disabled={ store.loading }
                        type="submit"
                        className={ `btn btn-info w-full ${ store.loading ? "btn-disabled" : "" }` }
                    >
                        { store.loading ? "Resetting..." : "Reset" }
                    </button>
                    {/*<button onClick={ () => {*/ }
                    {/*    reset()*/ }
                    {/*} }*/ }
                    {/*>Reset*/ }
                    {/*</button>*/ }
                </div>
            </div>
        </div>
    );
}
