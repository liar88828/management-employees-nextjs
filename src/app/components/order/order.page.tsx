import React, { Ref, startTransition, useRef, useState } from "react";
import Link from "next/link";
import { Check, Minus, NotebookTabs, Plus, Trash, XIcon } from "lucide-react";
import { TDeliveryDB } from "@/interface/entity/delivery.model";
import { TOrderTransactionDB } from "@/interface/entity/transaction.model";
import { TPaymentDB } from "@/interface/entity/payment.model";
import { TProductDB } from "@/interface/entity/product.model";
import { TReceiverCreate } from "@/interface/entity/receiver.model";
import { TTrolleyProductUser } from "@/interface/entity/trolley.model";
import { toAccounting } from "@/utils/toAccounting";
import { toDate } from "@/utils/toDate";
import { toRupiah } from "@/utils/toRupiah";
import { toStatus } from "@/app/components/toStatus";
import { useTableStore } from "@/store/table";

export function OrderDetailAdmin(
    { order, contentRef, isPrinting, handlePrintAction, isPending, handleDeleteAction, id }:
    {
        contentRef: Ref<HTMLDivElement>
        handleDeleteAction: () => void,
        handlePrintAction: () => void,
        id: string
        isPending: boolean,
        isPrinting: boolean,
        order: TOrderTransactionDB,
    }) {
    return (
        <div className={ ` mx-auto sm:p-4 ${ isPrinting ? 'w-[50rem]' : "" } pb-20 max-w-[210mm]` }>
            <div className="mb-4 card  card-compact sm:card-normal bg-white card-bordered text-xs sm:text-base">
                <div
                    ref={ contentRef }
                    className={ 'card-body' }
                >
                    <h1 className=" card-title text-2xl font-bold pb-10 text-nowrap ">Invoice #{ order.id }</h1>
                    <div className="grid  grid-cols-2 gap-4 mb-4">
                        <div>
                            <p className="font-semibold">Order Date:</p>
                            <p>{ toDate(order.orderTime ?? 0) }</p>
                        </div>
                        <div>
                            <p className="font-semibold">Send Date:</p>
                            <p>{ toDate(order.sendTime ?? 0) }</p>
                        </div>
                        <div>
                            <p className="font-semibold">Customer:</p>
                            <p>{ order.Customers.name }</p>
                            <p>{ order.Customers.address }</p>
                            <p>{ order.Customers.phone }</p>
                        </div>
                    </div>
                    <div className="mb-4">
                        <p className="font-semibold">Description:</p>
                        <p>{ order.desc }</p>
                    </div>
                    <table className="w-full mb-4 ">
                        <thead>
                        <tr className="border-b">
                            <th className="text-left">Product</th>
                            <th className="text-right">Qty</th>
                            <th className="text-right">Unit Price</th>
                            <th className="text-right">Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        { order.Trolleys.map((item) => (
                            <tr key={ item.id } className="border-b">
                                <td>{ item.Product.name }</td>
                                <td className="text-right">{ item.qty_at_buy }</td>
                                <td className="text-right">{ toRupiah(item.price_at_buy) }</td>
                                <td className="text-right">{ toRupiah(item.qty_at_buy * item.price_at_buy) }</td>
                            </tr>
                        )) }
                        </tbody>
                    </table>
                    <div className={ `grid  ${ isPrinting ? 'grid-cols-2' : "grid-cols-1 sm:grid-cols-2" }` }>
                        <div className=""></div>

                        <div className="mt-4">
                            <div className="flex justify-between">
                                <span className="font-semibold">Subtotal:</span>
                                <span>{ toRupiah(order.totalPayment) }</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">Delivery Fee:</span>
                                <span>{ toRupiah(order.priceDelivery) }</span>
                            </div>
                            <div className="flex justify-between font-bold">
                                <span>Total:</span>
                                <span>{ toRupiah(order.totalAll) }</span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <p className="font-semibold">Delivery Information:</p>
                            <p>Name: { order.Deliverys.name }</p>
                            <p>Phone: { order.Deliverys.phone }</p>
                            <p>Address: { order.Deliverys.address }</p>
                            <p>Type: { order.Deliverys.type }</p>
                        </div>
                        <div className="mt-4">
                            <p className="font-semibold">Payment Information:</p>
                            <p>Method: { order.Payments.name }</p>
                            <p>Type: { order.Payments.type }</p>
                            <p>Payment:{ order.totalPayment }</p>
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className="font-semibold">Status: { order.status }</p>
                    </div>

                    <div className=" card-actions flex justify-center print:hidden">
                        <button onClick={ handlePrintAction } disabled={ isPrinting } className={ 'btn btn-info' }>
                            { isPrinting ? 'Printing...' : 'Print Invoice' }
                        </button>

                        <Link
                            href={ `/admin/order/update/${ id }` }
                            hidden={ isPrinting }
                            className={ 'btn btn-warning' }
                        >
                            Update
                        </Link>
                        <button

                            onClick={ handleDeleteAction }
                            disabled={ isPrinting || isPending }
                            className={ 'btn btn-error' }
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ProductSelectedList(props: {
    product: TTrolleyProductUser,
    onChangeQty: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onRemoveAction: () => void,
    onIncrementAction: () => void,
    onDecrementAction: () => void
}) {
    return (
        <div className={ `card card-side card-compact card-bordered bg-base-200 ` }>
            <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */ }
                <img
                    src="https://picsum.photos/200/300?random=1"
                    alt="Movie"
                    className="rounded-xl object-cover w-32 h-32 "
                />
            </figure>
            <div className="card-body">
                <div className="flex justify-between">
                    <h2 className="card-title">{ props.product.Product.name }</h2>
                    <button
                        onClick={ props.onRemoveAction }
                        className=" btn btn-square btn-error btn-sm "
                    >
                        <Trash />
                    </button>
                </div>
                <div className="flex justify-between items-end">
                    <div className="">
                        <p>{ toRupiah(props.product.price_at_buy) }</p>
                        <p>{ props.product.Product.type }</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type={ "button" }
                            onClick={
                                props.onIncrementAction }
                            className="btn btn-square btn-sm"
                        >
                            <Plus />
                        </button>
                        <input
                            className={ "input w-20" }
                            type={ "number" }
                            max={ props.product.Product.qty }
                            value={ props.product.qty_at_buy }
                            onChange={ props.onChangeQty }
                        />
                        <button
                            type={ "button" }
                            onClick={ props.onDecrementAction }
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

export function ProductOrderDialog(props: { product: TProductDB, onClick: () => void }) {
    return (
        <div className={ `card card-side card-compact bg-base-300 card-bordered ` }>
            <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */ }
                <img
                    src="https://picsum.photos/200/300?random=1"
                    alt="Movie"
                    className="rounded-xl object-cover w-32 h-32 "
                />
            </figure>
            <div className="card-body ">
                <div className="flex justify-between">
                    <h2 className="card-title">{ props.product.name }</h2>
                    <form method="dialog">
                        <button
                            className={ "btn btn-square btn-sm btn-neutral" }
                            onClick={ props.onClick }
                        >
                            <Plus />
                        </button>
                    </form>
                </div>
                <div className="text-xs sm:text-sm leading-normal sm:leading-none">
                    <p>{ toRupiah(props.product.price) }</p>
                    <p>type { props.product.type }</p>
                    <p>qty { props.product.qty }</p>
                </div>
            </div>
        </div>
    );
}

export function DeliveryListDialog(props: { delivery: TDeliveryDB, onClick: () => void }) {
    return (
        <div className="card card-side card-compact bg-base-300 ">
            <figure className={ "p-1" }>
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
                        <form method="dialog">
                            <button
                                onClick={ props.onClick }
                                className={ "btn btn-square " }
                            >
                                <Check />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function DeliveryActionItem(props: {
    delivery: TDeliveryDB
    onClick: () => void
}) {
    return (
        <div className="card card-side card-compact bg-base-300 ">
            <figure className={ "p-1" }>
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
                        <p>{ props.delivery.phone }</p>
                        <p>{ props.delivery.address }</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={ props.onClick }
                            className={ "btn btn-square " }
                        >
                            <XIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function PaymentActionItem(props: {
    payment: TPaymentDB,
    onDeleteAction: () => void
}) {
    return (
        <div className="card card-side card-compact bg-base-300 ">
            <figure className={ "p-1" }>
                {/* eslint-disable-next-line @next/next/no-img-element */ }
                <img
                    src="https://picsum.photos/200/300?random=1"
                    alt="Movie"
                    className="rounded-xl object-cover w-32 h-32 "
                />
            </figure>
            <div className="card-body">
                <div className="flex justify-between h-full">
                    <h2 className="card-title">{ props.payment.name }</h2>
                </div>
                <div className="flex justify-between items-end">
                    <div className="">
                        <p>{ toAccounting(props.payment.accounting) }</p>
                        <p>{ props.payment.phone }</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            className="btn btn-square "
                            onClick={ props.onDeleteAction }
                        >
                            <XIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div> );
}

export function ReceiverItemSelected(props: { onReceiver: TReceiverCreate & { id?: string } }) {
    return <div className="flex gap-2 items-center">
        <div className="avatar">
            <div className="w-24 rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */ }
                <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt={ props.onReceiver.name }
                />
            </div>
        </div>

        <div className="p-1.5 ">
            <h2 className={ "~text-base/xl font-bold" }>{ props.onReceiver.name }</h2>
            <p className={ "text-gray-700 ~text-sm/base" }>{ props.onReceiver.phone }</p>
            <p className={ "text-gray-400 ~text-xs/base line-clamp-2" }>{ props.onReceiver.address }</p>
        </div>
    </div>;
}

export function PaymentDialogList(props: { payment: TPaymentDB, onClick: () => void }) {
    return (
        <div className="card card-side card-compact bg-base-300 ">
            <figure className={ "p-1" }>
                {/* eslint-disable-next-line @next/next/no-img-element */ }
                <img
                    src="https://picsum.photos/200/300?random=1"
                    alt="Movie"
                    className="rounded-xl object-cover w-32 h-32 "
                />
            </figure>
            <div className="card-body">
                <div className="flex justify-between h-full">
                    <h2 className="card-title">{ props.payment.name }</h2>
                </div>
                <div className="flex justify-between items-end">
                    <div className="">
                        <p>{ toAccounting(props.payment.accounting) }</p>
                        <p>{ props.payment.phone }</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */ }
                            <button
                                className="btn btn-square "
                                onClick={ props.onClick }
                            >
                                <Check />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function OrderTablePage({ orders, }: { orders: TOrderTransactionDB[] }) {
    const [ selectedOrders, setSelectedOrders ] = useState<string[]>([]);
    const tableRef = useRef(null);
    const { setTable, existTable, search: nameTable, status: statusTable, tableDetail } = useTableStore()

    return (
        <table className="table table-xs"
               ref={ tableRef }
               data-theme={ 'light' }
        >
            <thead>
            <tr>
                <th>
                    <label>
                        <input
                            type="checkbox"
                            className="checkbox checkbox-sm"
                            checked={ selectedOrders.length === orders.length }
                            onChange={ (e) => {
                                startTransition(() => {
                                    if (e.target.checked) {
                                        setSelectedOrders(orders.map((order) => order.id));
                                    } else {
                                        setSelectedOrders([]);
                                    }
                                })
                            } }
                        />
                    </label>
                </th>
                <th>ID</th>
                <th>Order Time</th>
                <th>Send Time</th>
                <th>Status</th>
                {/**/ }
                <th>Name (Customer)</th>
                <th>Address</th>
                { tableDetail.description && (
                    <th>Description</th>
                ) }
                {/**/ }
                { tableDetail.receiver && ( <>
                    <th className={ 'bg-orange-100' }>Name (Receiver)</th>
                    <th className={ 'bg-orange-100' }>Address (Receiver)</th>
                    <th className={ 'bg-orange-100' }>Phone (Receiver)</th>
                </> )
                }
                {/**/ }
                { tableDetail.deliver && ( <>
                    <th className={ 'bg-green-100' }>Name (Delivery)</th>
                    <th className={ 'bg-green-100' }>Phone (Delivery)</th>
                </> ) }
                {/**/ }
                { tableDetail.payment && ( <>
                    <th className={ 'bg-red-100' }>Name (Payments)</th>
                    <th className={ 'bg-red-100' }>Type (Payments)</th>
                </> ) }
                {/**/ }
                <th className={ 'bg-yellow-100 ' }>Name (Product)</th>
                <th className={ 'bg-yellow-100' }>Price (Product)</th>
                {/**/ }
                <th className={ 'bg-red-100' }>Price (Payments)</th>
                <th className={ 'bg-green-100' }>Price Delivery</th>

                <th>Total All</th>
                <th className={ 'w-24' }>Action</th>
            </tr>
            </thead>
            <tbody>
            {
                orders
                .filter((order) => {
                    const nameOrder = order.Customers.name.toLowerCase().includes(nameTable.toLowerCase());
                    const statusOrder = order.status.includes(statusTable);
                    return nameOrder && statusOrder;
                })
                .map((order) => (
                    <tr key={ order.id }>
                        <td>
                            <label>
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm"
                                    checked={ existTable(order.id) }
                                    onChange={ () => {
                                        setTable(order)
                                    } }
                                />
                            </label>
                        </td>
                        <td>{ order.id }</td>
                        <td>{ toDate(order.orderTime || 0) }</td>
                        <td>{ toDate(order.sendTime || 0) }</td>
                        <td>
                            {
                                <span className={ `badge badge-${ toStatus(order.status) }` }>
												{ order.status }
											</span>
                            }
                        </td>
                        {/**/ }
                        <td>{ order.Customers.name }</td>
                        <td>{ order.address }</td>
                        { tableDetail.description && (
                            <td className={ 'line-clamp-2' }>{ order.desc }</td>
                        ) }
                        {/**/ }
                        { tableDetail.receiver &&
                            ( <>
                                <td className={ 'bg-orange-50' }>{ order.Customers.name }</td>
                                <td className={ 'bg-orange-50' }>{ order.Customers.address }</td>
                                <td className={ 'bg-orange-50' }>{ order.Customers.phone }</td>
                            </> ) }
                        {/**/ }
                        { tableDetail.deliver &&
                            ( <>
                                <td className={ 'bg-green-50' }>{ order.nameDelivery }</td>
                                <td className={ 'bg-green-50' }>{ order.phoneDelivery }</td>
                            </> ) }
                        {/**/ }
                        { tableDetail.payment &&
                            ( <>
                                <td className={ 'bg-red-50' }>{ order.Payments.name }</td>
                                <td className={ 'bg-red-50' }>{ order.Payments.type }</td>
                            </> ) }
                        {/**/ }
                        <td className={ 'bg-yellow-50 ' }>{ order.Trolleys.map(d => (
                            <span key={ d.id } className={ 'text-nowrap' }>
												{ d.Product.name } x { d.qty_at_buy } <br />
											</span>
                        )) }</td>
                        <td className={ 'bg-yellow-50' }>{ order.Trolleys.map(d => toRupiah(d.price_at_buy)).join(', \n') }</td>
                        {/**/ }
                        <td className={ 'bg-red-50' }>{ toRupiah(order.totalPayment) }</td>
                        <td className={ 'bg-green-50' }>{ toRupiah(order.priceDelivery) }</td>
                        <td>{ toRupiah(order.totalAll) }</td>
                        <td className={ ' ' }>
                            <Link
                                href={ `/admin/order/${ order.id }` }
                                className={ 'btn btn-sm btn-square' }
                            >
                                <NotebookTabs />
                            </Link>
                            {/*<button className={ 'btn btn-sm btn-info btn-square' }>*/ }
                            {/*	<Pencil/>*/ }
                            {/*</button>*/ }
                            {/*<button className={ 'btn btn-sm btn-error btn-square' }>*/ }
                            {/*	<Trash/>*/ }
                            {/*</button>*/ }
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    )

}
