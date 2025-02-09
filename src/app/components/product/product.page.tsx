import Link from "next/link";
import React, { ReactNode } from "react";
import { Pen, Plus, ShoppingCart, Star, Trash } from "lucide-react";
import { TProductDB } from "@/interface/entity/product.model";
import { toRepeat } from "@/utils/toRepeat";
import { toDate } from "@/utils/toDate";
import { toRupiah } from "@/utils/toRupiah";

export function ProductCardPageUser({ product, detailProductAction, addTrolleyAction, isLogin }: {
    product: TProductDB,
    detailProductAction: () => void,
    addTrolleyAction: () => void,
    isLogin?: boolean
}) {
    return (
        <div className=" bordered rounded-xl bg-base-200/20 shadow ">
            <figure
                className={ 'hover:cursor-pointer' }
                onClick={ detailProductAction }
            >
                {/* eslint-disable-next-line @next/next/no-img-element */ }
                <img className='rounded-xl object-cover w-full ~h-40/44 '
                     src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                     alt="Shoes"
                />
            </figure>
            <div className="~px-3/5 pb-3 mt-1">
                <h2 className="~text-lg/2xl font-bold">{ product.name }</h2>
                <div className="flex justify-between items-end">
                    <div className="">
                        <p>{ toRupiah(product.price) }</p>
                        <p>{ product.type }</p>
                    </div>
                    { isLogin &&
                      <button
                        onClick={ addTrolleyAction }
                        className="btn btn-primary btn-sm btn-square "
                      >
                        <ShoppingCart className='' />
                      </button>
                    }
                </div>
            </div>
        </div>
    );
}

export function ProductCardPageAdmin(props: {
    product: TProductDB,
    onDeleteAction: () => Promise<void>
}) {
    return (
        <div className="card card-side card-compact bg-base-200 ">
            <Link href={ `/admin/product/${ props.product.id }` }>
                {/* eslint-disable-next-line @next/next/no-img-element */ }
                <img
                    src="https://picsum.photos/200/300?random=1"
                    alt="Movie"
                    className="rounded-xl object-cover w-32 h-32 "
                />
            </Link>
            <div className="card-body">
                <div className="flex justify-between h-full">
                    <h2 className="card-title">{ props.product.name }</h2>
                </div>
                <div className="flex justify-between items-end">
                    <div className="">
                        <p>{ toRupiah(props.product.price) }</p>
                        <p>qty: { props.product.qty }</p>
                        <p>{ props.product.type }</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={ props.onDeleteAction }
                            className=' btn btn-square btn-error btn-sm '
                        >
                            <Trash />
                        </button>
                        <Link
                            href={ `/admin/product/update/${ props.product.id }` }
                            className=" btn btn-square btn-info btn-sm "
                        >
                            <Pen />
                        </Link>
                    </div>
                </div>
            </div>
        </div> )
}

export function ProductDetailPageAdmin(
    {
        product,
        onChangeAction,
        onAddStockAction,
        onDeleteAction,
        hrefUpdateAction
    }: {
    product: TProductDB
    onChangeAction: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onAddStockAction: () => Promise<void>,
    hrefUpdateAction: () => void,
    onDeleteAction: () => void
}) {
    return (
        <div className="card lg:card-side bg-base-100 shadow-xl">
            <figure className="w-full lg:w-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */ }
                <img src="https://picsum.photos/300/200?random=1"
                     alt={ product.name }
                     className="rounded-lg h-auto w-full"
                />
            </figure>
            <div className="card-body w-full lg:w-1/2">
                <h2 className="card-title text-2xl font-bold">{ product.name }</h2>
                <p className="text-sm text-gray-500">Type: { product.type }</p>
                <p className="text-sm text-gray-500">Location: { product.location }</p>
                <p className="mt-4 text-gray-700">{ product.desc }</p>
                <div className="mt-4">
                    <p className="text-lg font-semibold">Price: ${ product.price.toFixed(2) }</p>
                    <p className="text-sm text-gray-500">Available Quantity: { product.qty }</p>
                </div>
                <div className="mt-4">
                    <p className="text-sm text-gray-500">Created At: { toDate(product.created_at) }</p>
                    <p className="text-sm text-gray-500">Updated At: { toDate(product.updated_at) }</p>
                </div>
                <div className="card-actions mt-6 grid grid-cols-2 items-end">
                    <div className="form-control">
                        <label htmlFor={ "stock" }>Add Stock</label>
                        <div className="join">
                            <input
                                className={ "input input-bordered w-24 join-item" }
                                type="number"
                                onChange={ onChangeAction }
                            />
                            <button
                                onClick={ onAddStockAction }
                                className={ "btn join-item" }
                            ><Plus /></button>
                        </div>
                    </div>
                    <div className=" flex gap-2">
                        <button
                            onClick={ hrefUpdateAction }
                            className="btn btn-primary">
                            Update
                        </button>
                        <button
                            onClick={ onDeleteAction }
                            className="btn btn-secondary">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function ProductDetailPageUser({ product, children }: { children: ReactNode, product: TProductDB }) {
    return (
        <div className="flex flex-col md:flex-row card">
            <div className="md:w-1/2 p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */ }
                <img
                    src="https://picsum.photos/200/300?random=1"
                    alt="Product Image"
                    width={ 400 }
                    height={ 400 }
                    className="w-full h-auto object-cover rounded-lg"
                />
            </div>
            <div className="md:w-1/2 p-6 flex flex-col justify-between card-body">
                <div>
                    <header className="px-0">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-3xl font-bold mb-2">
                                    { product.name }
                                </h2>
                                <p className="text-lg text-muted-foreground mb-4">
                                    Type: { product.type }
                                </p>
                            </div>
                        </div>
                    </header>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="flex items-center mr-2">
                                { toRepeat(5).map((_, i) => (
                                    <Star key={ i } className="w-5 h-5 fill-primary"/>
                                )) }
                            </div>
                            <span className="text-sm text-muted-foreground">
                                (128 reviews)
                            </span>
                        </div>
                        <div className="text-3xl font-bold">
                            { toRupiah(product.price) }
                        </div>
                        <div className="flex space-x-2">
                            <div>
                                Stock: { product.qty }
                            </div>
                        </div>
                        <p className="text-muted-foreground">
                            { product.desc }
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>
                                Location: { product.location }
                            </li>
                            <li>
                                Update { toDate(product.created_at) }
                            </li>
                            <li>
                                Create { toDate(product.created_at) }

                            </li>
                            {/*<li>Vacuum insulated</li>*/ }
                            {/*<li>Leak-proof design</li>*/ }
                            {/*<li>Available in multiple colors</li>*/ }
                        </ul>
                    </div>
                </div>
                <footer className="px-0 mt-6">
                    { children }
                </footer>
            </div>
        </div>
    );
}
