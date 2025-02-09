'use client'
import React, { useActionState } from "react";
import { Palette, ShoppingCartIcon, } from 'lucide-react';
import { ProfileStatusCountPage } from "@/app/components/profile/profile.page";
import { TStatusOrder } from "@/interface/Utils";
import { Users } from "@prisma/client";
import { changeProfile } from "@/server/action/auth";

export function ProfileTrolleyCountClientUser() {

    return (
        <ProfileStatusCountPage
            isStatus={ false }
            countStatus={ 0 }
            onStatusAction={ () => {
            } }
        >
            <ShoppingCartIcon />
        </ProfileStatusCountPage>
    );
}

export function ProfileStatusClient({ statusOrder, children }: {
    statusOrder: TStatusOrder,
    children: React.ReactNode
}) {

    return (
        <ProfileStatusCountPage
            isStatus={ status === statusOrder }
            countStatus={ 0 }
            onStatusAction={ () => {
            } }
        >
            { children }
        </ProfileStatusCountPage>
    );
}

export function ProfileChangeUser({ user }: { user: Users }) {
    const [ state, action, pending ] = useActionState(changeProfile, undefined);
    return (
        <div className="card card-bordered bg-base-100 lg:mx-60">
            <form action={ action } className="card-body">
                <input defaultValue={ user.id } name="id" hidden={ true } />
                <h2 className="card-title">Change Profile</h2>

                {/* Name Input */ }
                <div className="form-control w-full">
                    <label htmlFor="name" className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        defaultValue={ user.name }
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        className="input input-bordered w-full"
                    />
                    { state?.errors?.name && (
                        <p className="text-red-500 text-sm mt-1">{ state.errors.name }</p>
                    ) }
                </div>

                {/* Email Input */ }
                <div className="form-control w-full">
                    <label htmlFor="email" className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        defaultValue={ user.email }
                        name="email"
                        type={ 'email' }
                        placeholder="Enter your email"
                        className="input input-bordered w-full"
                    />
                    { state?.errors?.email && (
                        <p className="text-red-500 text-sm mt-1">{ state.errors.email }</p>
                    ) }
                </div>

                {/* Phone Input */ }
                <div className="form-control w-full">
                    <label htmlFor="phone" className="label">
                        <span className="label-text">Phone</span>
                    </label>
                    <input
                        defaultValue={ user.phone }
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        className="input input-bordered w-full"
                    />
                    { state?.errors?.phone && (
                        <p className="text-red-500 text-sm mt-1">{ state.errors.phone }</p>
                    ) }
                </div>

                {/* Address Input */ }
                <div className="form-control w-full">
                    <label htmlFor="address" className="label">
                        <span className="label-text">Address</span>
                    </label>
                    <textarea
                        defaultValue={ user.address }
                        id="address"
                        name="address"
                        placeholder="Enter your address"
                        className="textarea textarea-bordered w-full"
                    />
                    { state?.errors?.address && (
                        <p className="text-red-500 text-sm mt-1">{ state.errors.address }</p>
                    ) }
                </div>
                {/* Password Input */ }
                <div className="form-control w-full">
                    <label htmlFor="password" className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        className="input input-bordered w-full"
                    />
                    { state?.errors?.password && (
                        <div className="mt-2 text-red-500 text-sm">
                            <p>Password must:</p>
                            <ul className="list-disc list-inside">
                                { state.errors.password.map((error) => (
                                    <li key={ error }>{ error }</li>
                                )) }
                            </ul>
                        </div>
                    ) }
                </div>

                {/* Password Input */ }
                <div className="form-control w-full">
                    <label htmlFor="confirm" className="label">
                        <span className="label-text">Confirm Password</span>
                    </label>
                    <input
                        name="confirm"
                        type="password"
                        placeholder="Enter your confirm password "
                        className="input input-bordered w-full"
                    />
                    { state?.errors?.password && (
                        <div className="mt-2 text-red-500 text-sm">
                            <p>Password must:</p>
                            <ul className="list-disc list-inside">
                                { state.errors.password.map((error) => (
                                    <li key={ error }>{ error }</li>
                                )) }
                            </ul>
                        </div>
                    ) }
                </div>

                {/* Submit Button */ }
                <div className="card-actions">
                    <button
                        disabled={ pending }
                        type="submit"
                        className={ `btn btn-primary w-full ${ pending ? "btn-disabled" : "" }` }
                    >
                        { pending ? "Saving..." : "Save" }
                    </button>
                </div>
            </form>
        </div>
    );
}

export function ThemeModal() {
    return (
        <>
            <button
                className="btn"
                onClick={
                    // @ts-ignore
                    () => document.getElementById('modal_theme').showModal()
                }
            >

                <Palette />
            </button>
            <dialog id="modal_theme" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */ }
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>

    );
}
