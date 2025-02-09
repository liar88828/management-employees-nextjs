'use client'
import { toRupiah } from "@/utils/toRupiah";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";

export function PageErrorData({ msg = 'Error Load', code = 404, }: { msg?: string, code?: number }) {
    const router = useRouter()
    return (
        <div className="card w-96 md:w-full shadow bg-base-200/40">
            <div className="card-body items-center text-center">
                <h2 className="card-title text-nowrap">Error { code }</h2>
                <p>{ msg }</p>
                <div className="card-actions justify-end">
                    <button
                        data-testId={ 'PageErrorData-refresh' }
                        onClick={ () => router.refresh() } className="btn btn-primary">Reload
                    </button>
                    <button
                        data-testId={ 'PageErrorData-back' }
                        onClick={ () => router.back() } className="btn btn-ghost">Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export function PageErrorDataTrolley() {
    return (
        <div className="card-body">
            <h1 className="text-lg font-bold">{ 0 } Items</h1>
            <p className="text-info">Subtotal: { toRupiah(0) }</p>
            <div className="card-actions">
                <Link
                    href={ '/login' }
                    className="btn btn-primary btn-block"
                >
                    Login
                </Link>
            </div>
        </div>
    );
}

export function EmptyData(
    { page }: { page: string }) {
    return (
        <PageErrorData msg={ `${ page } Data Is Empty` } code={ 404 } />
    );
}

export function PageEmptyData(
    { page }: { page: string }) {
    return (
        <div className={ 'flex w-full justify-center' }>
            <PageErrorData msg={ `${ page } Data Is Empty` } code={ 404 } />
        </div>
    );
}
