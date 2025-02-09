import Link from "next/link";
import React from "react";
import { Pen, Trash } from "lucide-react";
import { TDeliveryDB } from "@/interface/entity/delivery.model";
import { toDate } from "@/utils/toDate";
import { toRupiah } from "@/utils/toRupiah";

export function DeliveryCardPageAdmin(props: {
    delivery: TDeliveryDB,
    goDetailAction: () => void,
    onClick: () => Promise<void>
}) {
    return (
        <div className="card card-side card-compact bg-base-200 ">
            <figure
                className={ 'hover:cursor-pointer' }
                onClick={ props.goDetailAction }
            >
                {/* eslint-disable-next-line @next/next/no-img-element */ }
                <img
                    src="https://picsum.photos/200/300?random=1"
                    alt="Movie"
                    className="rounded-xl object-cover w-32 h-32 "
                />
            </figure>
            <div className="card-body">
                <div className="flex justify-between h-full">
                    <h2 className="card-title">{ props.delivery.name }</h2>
                </div>
                <div className="flex justify-between items-end">
                    <div className="">
                        <p>{ toRupiah(props.delivery.price) }</p>
                        <p>{ props.delivery.address }</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={ props.onClick }
                            className=" btn btn-square btn-error btn-sm "
                        >
                            <Trash />
                        </button>
                        <Link href={ `/admin/delivery/update/${ props.delivery.id }` }
                              className=" btn btn-square btn-info btn-sm "
                        >
                            <Pen />
                        </Link>
                    </div>
                </div>
            </div>
        </div> );
}

export function DeliveryDetailPageAdmin({ delivery }: { delivery: TDeliveryDB }) {
    return (
        <div className="card card-bordered card-compact bg-base-200">
            <div className="card-body">
                {/* eslint-disable-next-line @next/next/no-img-element */ }
                <img
                    src="https://picsum.photos/200/300?random=1"
                    alt={ delivery.name }
                    className="w-full h-48 object-cover rounded"
                />
                <div className="grid grid-cols-2 p-2">

                    <div className="">
                        <h2 className="font-bold text-xl mb-2">{ delivery.name }</h2>
                        <p className="text-gray-700 text-sm mb-2">{ delivery.desc }</p>
                        <p className="text-gray-600 text-sm">
                            <strong>Type:</strong> { delivery.type }
                        </p>
                        <p className="text-gray-600 text-sm">
                            {/*<strong>Location:</strong> {delivery.location}*/ }
                        </p>
                    </div>

                    <div className="  ">
                        <p className="text-gray-200 font-bold text-lg mb-2">
                            { toRupiah(delivery.price) }
                        </p>
                        <p className="text-gray-600 text-sm">
                            {/*<strong>Stock:</strong> {delivery.qty} units*/ }
                        </p>
                        <p className="text-gray-500 text-sm">
                            <strong>Last Updated:</strong> { toDate(delivery.updated_at) }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

