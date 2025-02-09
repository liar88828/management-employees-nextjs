'use client'
import Link from "next/link";
import React, { useActionState } from "react";
import { MoveRight, Palette, ShoppingCartIcon, } from 'lucide-react';
import { EmptyData, PageErrorData } from "@/app/components/PageErrorData";
import { LoadingSpin, PageLoadingSpin } from "@/app/components/LoadingData";
import { ProfileStatusCountPage } from "@/app/components/profile/profile.page";
import { TStatusOrder } from "@/interface/Utils";
import { Users } from "@prisma/client";
import { changeProfile } from "@/server/action/auth";
import { findHistoryUser } from "@/server/network/order";
import { toDate } from "@/utils/toDate";
import { toRupiah } from "@/utils/toRupiah";
import { toStatus } from "@/app/components/toStatus";
import { useOrder } from "@/hook/useOrder";
import { useOrderStore } from "@/store/order";
import { useQuery } from "@tanstack/react-query";
import { useTrolley } from "@/hook/useTrolley";
import { ORDER } from "@/interface/entity/order.model";

export function ProfileTrolleyCountClientUser() {

    const { count } = useTrolley()
    const { data, isLoading } = count()
    if (isLoading || data !== 0) {
        return <LoadingSpin/>
    }

    return (
        <ProfileStatusCountPage
            isStatus={ false }
            countStatus={ data ?? 0 }
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
    const { status, setStatus } = useOrderStore()
    const { getOrderStatus } = useOrder()
    const { data, isFetching } = getOrderStatus(statusOrder)

    if (!data || isFetching) {
        return <LoadingSpin />
    }

    return (
        <ProfileStatusCountPage
            isStatus={ status === statusOrder }
            countStatus={ data }
            onStatusAction={ () => setStatus(statusOrder) }
        >
            { children }
        </ProfileStatusCountPage>
    );
}

export function ProfileOrderHistoryUser() {
    const status = useOrderStore(state => state.status)
    const { data: invoices, isError, isLoading, error } = useQuery({
        queryKey: [ ORDER.KEY, ORDER.HISTORY, status ],

        queryFn: () => findHistoryUser(status),
        select: (response) => response.data
    })

    if (isLoading || !invoices) return <PageLoadingSpin />
    if (isError) return <PageErrorData msg={ error.message } code={ 404 } />

    const loadEmpty = invoices.length === 0 && (
        <div className={ 'flex justify-center' }>
            <EmptyData page={ 'Order Profile' } />
        </div>
    )

    const loadData = invoices.map((invoice) => (
        <div
            key={ invoice.id }
            className="card card-compact bg-base-300"
        >
            <div className="card-body">
                <div className="flex justify-between">
                    <h2 className="text-base font-bold  sm:card-title ">#{ invoice.id }</h2>
                    <div className={ `badge badge-${ toStatus(invoice.status) }` }>
                        { invoice.status }
                    </div>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                    <div className="">
                        <div className=" flex gap-2 mb-2">
                            <p>Total Item: { invoice.Trolleys.length },</p>
                            <p>Total Price: { toRupiah(invoice.totalAll) },</p>
                        </div>
                        <p>{ toDate(invoice.orderTime) }</p>
                    </div>
                    <Link
                        href={ `/invoice/${ invoice.id }?redirect=/profile` }
                        className=' btn btn-square'
                    >
                        <MoveRight />
                    </Link>
                </div>
            </div>
        </div>
    ))

    return (
        <div className="">
            <h2 className='card-title'>History</h2>
            <div className="space-y-1 overflow-y-auto h-[60vh] py-2">
                { loadEmpty }
                { loadData }
            </div>
        </div>

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
