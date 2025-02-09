'use client'
import Link from "next/link";
import React, { useActionState, useEffect } from "react";
import { EmptyData, PageErrorData } from "@/app/components/PageErrorData";
import { IncomingStatusResponse } from "@/interface/entity/transaction.model";
import { Minus, MoveRight, Pen, Plus, Trash } from "lucide-react";
import { OrderCreateAdmin } from "@/validation/order.valid";
import { OrderDetailAdmin } from "@/app/components/order/order.page";
import { OrderFormUpsertAdmin } from "@/app/components/order/order.form";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { ProductShowDialog } from "@/app/components/order/order.dialog";
import { STATUS, toStatus } from "@/app/components/toStatus";
import { incomingActionForm } from "@/server/action/order";
import { toRupiah } from "@/utils/toRupiah";
import { useDeliveryStore } from "@/store/delivery";
import { useFormContext } from "react-hook-form";
import { useOrder } from "@/hook/useOrder";
import { useParams } from "next/navigation";
import { usePaymentStore } from "@/store/payment";
import { usePrint } from "@/hook/usePrint";
import { useProductStore } from "@/store/product";
import { useReceiverStore } from "@/store/receiver";
import { useTable } from "@/hook/useTable";
import { useTableStore } from "@/store/table";
import { toDate } from "@/utils/toDate";
import { orderSanitize } from "@/sanitize/order.sanitize";

export function ReceiverFormClientAdmin() {
    const { register, formState: { errors } } = useFormContext<OrderCreateAdmin>()
    const { setReceiverPartial, receiver } = useReceiverStore();
    return (
        <div className={ 'card card-compact bg-base-200' }>
            <div className="card-body">
                <h2 className={ 'card-title' }>Receiver</h2>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Receiver Name</span>
                    </label>
                    <input
                        { ...register('nameCs', {
                            value: receiver.name,
                            onChange: (e) => {
                                setReceiverPartial({ name: e.target.value })
                            }
                        }) }
                        type="text"
                        className="input input-bordered"
                    />
                </div>
                { errors.nameCs && <span className="text-error">{ errors.nameCs.message }</span> }

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Receiver Phone</span>
                    </label>
                    <input
                        { ...register('phoneCs', {
                            value: receiver.phone,
                            onChange: (e) => {
                                setReceiverPartial({ phone: e.target.value })
                            }
                        }) }
                        type="tel"
                        className="input input-bordered"
                    />
                </div>
                { errors.phoneCs && <span className="text-error">{ errors.phoneCs.message }</span> }

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Receiver Address </span>
                    </label>
                    <textarea
                        { ...register('addressCs', {
                            value: receiver.address,
                            onChange: (e) => {
                                setReceiverPartial({ address: e.target.value })
                            }
                        }) }
                        className="textarea textarea-bordered"
                    >
		    		</textarea>
                </div>
                { errors.addressCs && <span className="text-error">{ errors.addressCs.message }</span> }

                {/* Description */ }
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea
                        { ...register("desc") }
                        className="textarea textarea-bordered"
                    ></textarea>
                </div>
                { errors.desc && <span className="text-error">{ errors.desc.message }</span> }
            </div>
        </div>
    )
}

export function ProductAdminXXX() {
    const {
        productStore,
        getProductData,
        setQty,
        onRemove,
        onIncrement,
        onDecrement,
    } = useProductStore()
    return (
        <div>
            <div className={ 'card-title' }>Product</div>
            <div className="  mt-2">
                <div className="space-y-2">
                    { !productStore
                        ? <EmptyData page={ 'checkout' } />
                        : productStore.map(product => (
                            <div
                                key={ product.id_product }
                                className={ `card card-side card-compact card-bordered bg-base-200 ` }
                            >
                                <figure>
                                    {/* eslint-disable-next-line @next/next/no-img-element */ }
                                    <img
                                        src="https://picsum.photos/200/300?random=1"
                                        alt="Movie"
                                        className='rounded-xl object-cover w-32 h-32 '
                                    />
                                </figure>
                                <div className="card-body">
                                    <div className="flex justify-between">
                                        <h2 className='card-title'>{ product.Product.name }</h2>
                                        <button
                                            onClick={ () => onRemove(product.id_product) }
                                            className=' btn btn-square btn-error btn-sm '
                                        >
                                            <Trash />
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="">
                                            <p>{ toRupiah(product.price_at_buy) }</p>
                                            <p>{ product.Product.type }</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                type={ 'button' }
                                                onClick={
                                                    () => {
                                                        onIncrement(product.id_product)
                                                    } }
                                                className="btn btn-square btn-sm"
                                            >
                                                <Plus />
                                            </button>
                                            <input
                                                className={ 'input w-20' }
                                                type={ 'number' }
                                                max={ product.Product.qty }
                                                value={ product.qty_at_buy }
                                                onChange={ (e) => {
                                                    setQty(product.id_product, Number(e.target.value))
                                                } }
                                            />
                                            <button
                                                type={ 'button' }
                                                onClick={ () => {
                                                    onDecrement(product.id_product)
                                                    // setTotalOrder(total)
                                                } }
                                                className="btn btn-square  btn-sm"
                                            >
                                                <Minus />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) }
                </div>
            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */ }
            <button
                type={ 'button' }
                className='btn btn-neutral w-full mt-2'
                onClick={ async () => {
                    await getProductData()
                    // @ts-ignore
                    document.getElementById('my_modal_product').showModal()
                } }
            >
                Add Product <Plus />
            </button>
            <ProductShowDialog />
        </div>
    );
}

export function DetailedInvoicePrintAdmin() {
    const param = useParams<{ id: string }>()
    const { getId, onDelete } = useOrder()
    const { data: order, isLoading, isError } = getId(param.id)
    const { isPrinting, handlePrint, contentRef } = usePrint()
    const handleDelete = () => {
        onDelete.mutate(param.id)
    }

    if (!order || isLoading) return <PageLoadingSpin />
    if (isError) return <EmptyData page={ `Order Detail ${ param.id }` } />

    return ( <OrderDetailAdmin
            order={ order }
            isPrinting={ isPrinting }
            contentRef={ contentRef }
            id={ param.id }
            isPending={ onDelete.isPending }
            handleDeleteAction={ handleDelete }
            handlePrintAction={ handlePrint }
        />

    )
}

export function OrderExcelAdmin() {
    const { tableRef, onDownload } = useTable()
    const { data: dataTable } = useTableStore()

    return (
        <div className={ 'container-none' }>
            <button onClick={ onDownload }
                    className={ 'btn btn-info' }
            >
                Download
            </button>
            <div className="overflow-x-auto mt-2">
                <table ref={ tableRef }
                       className="table table-xs"
                       data-theme={ 'light' }
                >
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Order Time</th>
                        <th>Send Time</th>
                        <th>Status</th>
                        {/**/ }
                        <th>Address</th>
                        <th>Description</th>
                        <th className={ 'bg-green-200' }>Name (Delivery)</th>
                        <th className={ 'bg-green-200' }>Phone (Delivery)</th>
                        <th className={ 'bg-green-200' }>Price Delivery</th>
                        {/**/ }
                        <th className={ 'bg-orange-200' }>Name (Customer)</th>
                        <th className={ 'bg-orange-200' }>Address (Customer)</th>
                        <th className={ 'bg-orange-200' }>Phone (Customer)</th>
                        {/**/ }
                        <th className={ 'bg-red-200' }>Name (Payments)</th>
                        <th className={ 'bg-red-200' }>Type (Payments)</th>
                        <th className={ 'bg-red-200' }>Price (Payments)</th>
                        {/**/ }
                        <th className={ 'bg-yellow-200' }>Name (Product)</th>
                        <th className={ 'bg-yellow-200' }>Qty (Product)</th>
                        <th className={ 'bg-yellow-200' }>Price (Product)</th>
                        <th>Total All</th>
                    </tr>
                    </thead>
                    <tbody>
                    { dataTable.map((order) => (
                        <tr key={ order.id }>
                            <td>{ order.id }</td>
                            <td>{ toDate(order.orderTime || 0) }</td>
                            <td>{ toDate(order.sendTime || 0) }</td>
                            <td> { order.status }</td>
                            <td>{ order.address }</td>
                            <td className={ 'line-clamp-2' }>{ order.desc }</td>
                            <td className={ 'bg-green-100' }>{ order.nameDelivery }</td>
                            <td className={ 'bg-green-100' }>{ order.phoneDelivery }</td>
                            <td className={ 'bg-green-100' }>{ toRupiah(order.priceDelivery) }</td>
                            {/**/ }
                            <td className={ 'bg-orange-100' }>{ order.Customers.name }</td>
                            <td className={ 'bg-orange-100' }>{ order.Customers.address }</td>
                            <td className={ 'bg-orange-100' }>{ order.Customers.phone }</td>
                            {/**/ }
                            <td className={ 'bg-red-100' }>{ order.Payments.name }</td>
                            <td className={ 'bg-red-100' }>{ order.Payments.type }</td>
                            <td className={ 'bg-red-100' }>{ toRupiah(order.totalPayment) }</td>
                            {/**/ }
                            <td className={ 'bg-yellow-100' }>{ order.Trolleys.map(d => d.Product.name).join(', \n') }</td>
                            <td className={ 'bg-yellow-100' }>{ order.Trolleys.map(d => d.qty_at_buy).join(', \n') }</td>
                            <td className={ 'bg-yellow-100' }>{ order.Trolleys.map(d => toRupiah(d.price_at_buy)).join(', \n') }</td>

                            <td>{ toRupiah(order.totalAll) }</td>
                        </tr>
                    )) }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export function OrderFormUpdateClient({ idOrder, id_user }: { idOrder: string, id_user: string }) {
    const { getId } = useOrder()
    const { setProductStore } = useProductStore()
    const { setDelivery } = useDeliveryStore()
    const { setReceiverPartial } = useReceiverStore()
    const { setPayment } = usePaymentStore()
    const { data: order, isLoading, isError } = getId(idOrder)

    useEffect(() => {
        if (order) {
            setProductStore(order.Trolleys.map(d => d))
            setReceiverPartial(order.Customers)
            setPayment(order.Payments)
            setDelivery(order.Deliverys)
        }
    }, [ order, setDelivery, setPayment, setProductStore, setReceiverPartial ])

    if (isLoading || !order) return <PageLoadingSpin />
    if (isError) return <PageErrorData />

    return (
        <OrderFormUpsertAdmin
            defaultValue={ orderSanitize(order) }
            method={ 'PUT' }
            idCustomer={ id_user }
        />
    )
}

export function OrderIncomingPage({ invoice }: { invoice: IncomingStatusResponse }) {
    const [ _stateStatus, action, isPending ] = useActionState(incomingActionForm, undefined)

    return (
        <div className="card card-compact bg-base-300">
            <div className="card-body">
                <div className="flex justify-between">
                    <div className="">
                        <h2 className="text-base font-bold  md:card-title ">
                            #{ invoice.id }
                        </h2>
                        <h2 className={ 'text-sm' }>
                            { invoice.Customers.name }
                        </h2>
                    </div>
                    <div className={ `badge badge-${ toStatus(invoice.status) }` }>
                        { invoice.status }
                    </div>
                </div>
                <div>
                    <div className=" text-xs sm:text-sm">
                        <div className="flex ">
                            <p>Total Item: { invoice.Trolleys.length }</p>
                            <p>Total Price: { toRupiah(invoice.totalAll) }</p>
                        </div>
                        <p>{ toDate(invoice.orderTime) }</p>
                    </div>
                    <div className=" flex flex-row  mt-2 gap-5 justify-end">
                        <form className="join  " action={ action }>
                            <select
                                className="select select-bordered join-item"
                                defaultValue={ invoice.status }
                                name={ 'status' }
                            >
                                <option>{ STATUS.PENDING }</option>
                                <option>{ STATUS.COMPLETE }</option>
                                <option>{ STATUS.FAIL }</option>
                            </select>
                            <input type="hidden" name={ 'id' } value={ invoice.id } />
                            <button
                                disabled={ isPending }
                                type="submit"
                                className='btn btn-square btn-neutral join-item'
                            >
                                <Pen />
                            </button>
                        </form>
                        <Link
                            href={ `/invoice/check/${ invoice.id }?redirect=/admin/order/incoming/${ invoice.status.toLowerCase() }` }
                            className=' btn btn-square'
                        >
                            <MoveRight />
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
}
