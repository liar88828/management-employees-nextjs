import React from "react";
import { Minus, Plus, Trash } from "lucide-react";
import { TTrolleyProductUser } from "@/interface/entity/trolley.model";
import { toRupiah } from "@/utils/toRupiah";

export function TrolleyCardPageUser(
    {
        trolley,
        onSelectAction,
        isTrolleyIncluded,
        onRemoveAction,
        onIncrementAction,
        onDecrementAction,
    }: {
        trolley: TTrolleyProductUser,
        isTrolleyIncluded: boolean,
        onSelectAction: () => void,
        onRemoveAction: () => void,
        onIncrementAction: () => void,
        onDecrementAction: () => void,
    }) {
    return (
        <div
            key={ trolley.id }
            className={ `card card-side card-compact bg-base-300 card-bordered ${ isTrolleyIncluded ? 'border-info' : '' }` }
        >
            <figure onClick={ onSelectAction }>
                {/* eslint-disable-next-line @next/next/no-img-element */ }
                <img
                    src="https://picsum.photos/200/300?random=1"
                    alt="Movie"
                    className='rounded-xl object-cover w-32 h-32 '
                />
            </figure>
            <div className="card-body">
                <div className="flex justify-between">
                    <h1 className='card-title'>{ trolley.Product.name }</h1>
                    <button
                        onClick={ onRemoveAction }
                        className=' btn btn-square btn-error btn-sm '
                    >
                        <Trash />
                    </button>
                </div>
                <div className="flex justify-between items-end">
                    <div>
                        <p>{ toRupiah(trolley.Product.price) }</p>
                        <p>{ trolley.Product.type }</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={ onIncrementAction }
                            className="btn btn-square btn-sm"
                        >
                            <Plus />
                        </button>
                        <h2>{ trolley.qty_at_buy }</h2>
                        <button
                            onClick={ onDecrementAction }
                            className="btn btn-square  btn-sm"
                        >
                            <Minus />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function TrolleyDropDownPageUser({ count, total, hrefAction }: {
    hrefAction: () => void;
    count: number,
    total: number
}) {

    return (
        <div className="card-body">
            <span className="text-lg font-bold">{ count } Items</span>
            <span className="text-info">Subtotal: { toRupiah(total) }</span>
            <div className="card-actions">
                <button
                    onClick={ hrefAction }
                    className="btn btn-primary btn-block"
                >
                    View cart
                </button>
            </div>
        </div>
    );
}
