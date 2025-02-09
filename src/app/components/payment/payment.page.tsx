import Link from "next/link";
import React from "react";
import { Pen, Trash } from "lucide-react";
import { TPaymentDB } from "@/interface/entity/payment.model";
import { toAccounting } from "@/utils/toAccounting";
import { toDate } from "@/utils/toDate";

export function PaymentCardPageAdmin({ payment, onDeleteAction }: {
    payment: TPaymentDB,
    onDeleteAction: () => Promise<void>
}) {
    return (
        <div
            className="card card-side card-compact bg-base-300 "
        >
            <Link href={ `/admin/payment/${ payment.id }` }>
                <figure>
                    {/* eslint-disable-next-line @next/next/no-img-element */ }
                    <img
                        src="https://picsum.photos/200/300?random=1"
                        alt="Movie"
                        className="rounded-xl object-cover w-32 h-32 "
                    />
                </figure>
            </Link>
            <div className="card-body">
                <div className="flex justify-between h-full">
                    <h2 className="card-title">{ payment.name }</h2>
                </div>
                <div className="flex justify-between items-end">
                    <div className="">
                        <p>{ toAccounting(payment.accounting) }</p>
                        <p>{ payment.phone }</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={ onDeleteAction }
                            className=" btn btn-square btn-error btn-sm "
                        >
                            <Trash />
                        </button>
                        <Link
                            href={ `/admin/payment/update/${ payment.id }` }
                            className=" btn btn-square btn-info btn-sm "
                        >
                            <Pen />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function PaymentDetailPageAdmin({ payment }: { payment: TPaymentDB }) {
    return (
        <div className="card card-bordered card-compact bg-base-200">
            <div className="card-body">

                {/* eslint-disable-next-line @next/next/no-img-element */ }
                <img
                    src="https://picsum.photos/200/300?random=1"
                    alt={ payment.name }
                    className="w-full h-48 object-cover rounded"
                />
                <div className="grid grid-cols-2 p-2">

                    <div className="">
                        <h2 className="font-bold text-xl mb-2">{ payment.name }</h2>
                        <p className="text-gray-700 text-sm mb-2">{ payment.desc }</p>
                        <p className="text-gray-600 text-sm">
                            <strong>Type:</strong> { payment.type }
                        </p>
                        <p className="text-gray-600 text-sm">
                            {/*<strong>Location:</strong> {payment.location}*/ }
                        </p>
                    </div>

                    <div className="  ">
                        <p className="text-gray-200 font-bold text-lg mb-2">
                            {/*{toRupiah(payment.price)}*/ }
                        </p>
                        <p className="text-gray-600 text-sm">
                            {/*<strong>Stock:</strong> {payment.qty} units*/ }
                        </p>
                        <p className="text-gray-500 text-sm">
                            <strong>Last Updated:</strong> { toDate(payment.updated_at) }
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
}

