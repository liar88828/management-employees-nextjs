'use client'
import React, { useCallback, useEffect, useState } from 'react';
import useTrolleyStore from "@/store/trolley";
import { OrderCreateClient } from "@/validation/order.valid";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { ReceiverItemSelected } from "@/app/components/order/order.page";
import { toRupiah } from "@/utils/toRupiah";
import { useDeliveryStore } from "@/store/delivery";
import { useOrder } from "@/hook/useOrder";
import { usePaymentStore } from "@/store/payment";
import { useProductStore } from "@/store/product";
import { useReceiverStore } from "@/store/receiver";
import {
    DeliveryActionDialog,
    DeliveryShowLoadDialog,
    PaymentActionDialog,
    PaymentShowLoadDialog,
    ProductActionDialogUser
} from "@/app/components/order/order.dialog";
import { useQuery } from "@tanstack/react-query";
import { ORDER } from "@/interface/entity/order.model";
import { receiverUser } from "@/server/network/receiver";

export function CheckoutClientUser() {

    return (
        <>
            <CheckoutProfileClient />
            <ProductActionDialogUser />
            <DeliveryActionDialog />
            <PaymentActionDialog />
            <CheckoutTotalClient />
            {/**/ }
            <PaymentShowLoadDialog />
            <DeliveryShowLoadDialog />
        </ >
    );
}

export function CheckoutProfileClient() {
    const { setReceiverPartial, onReceiver } = useReceiverStore();
    const { isFetching, data } = useQuery({
        queryKey: [ ORDER, 'receiver' ],
        queryFn: receiverUser,
        select: (data) => {
            return data.data
        }
    })
    useEffect(() => {
        if (data && !onReceiver) {
            setReceiverPartial(data)
        }
    }, [ data, onReceiver, setReceiverPartial ])
    return (
        <div className="">
            <div className="px-2 mb-2">
                <div className="flex justify-between">
                    <h1 className="card-title">User Receiver</h1>
                </div>
            </div>
            <div className="rounded-xl bg-base-200">
                { !data || isFetching
                    ? <PageLoadingSpin />
                    : <ReceiverItemSelected onReceiver={ data } />
                }
            </div>
        </div>
    );
}

export function CheckoutTotalClient() {
    const { onUpsertUser } = useOrder()
    const { receiver } = useReceiverStore()
    const { onSelected } = useTrolleyStore();
    const { total: totalProduct, setProductStore } = useProductStore()
    const { delivery: dataDelivery } = useDeliveryStore()
    const { payment: dataPayment } = usePaymentStore()
    const [ desc, setDesc ] = useState('empty')
    const subtotal = useCallback(() => onSelected.reduce((total, item) => {
            return total + item.qty_at_buy * item.price_at_buy
        }, 0),
        [ onSelected ]
    )

    const onSubmit = () => {
        if (!receiver || !dataDelivery || !dataPayment) {
            return;
        }

        setProductStore(onSelected)
        let data: OrderCreateClient = {
            id: '',
            id_customer: receiver.id ?? '',
            addressCs: receiver.address,
            desc: desc,
            //
            nameDelivery: dataDelivery.name ?? '',
            phoneDelivery: dataDelivery.phone ?? '',
            priceDelivery: 0,
            //
            orderTime: new Date(),
            sendTime: new Date(),
            status: "Pending",
            //
            namePayment: dataPayment.name ?? '',
            totalPayment: 0,
            //
            totalProduct,
            totalAll: subtotal(),
        }
        onUpsertUser.mutate({
            data,
            method: "POST",
        })
    };

    return (
        <>
            <div className="">
                <h2 className="font-bold text-sm/lg">Description</h2>
                <textarea
                    placeholder="Enter your desc"
                    className="textarea textarea-bordered w-full"
                    value={ desc }
                    onChange={ (e) => setDesc(e.target.value) }
                />
            </div>
            <div>
                <h2 className="text-lg font-semibold">Summary</h2>
                <div className="mt-3 space-y-2">
                    {/*<div className="flex justify-between">*/ }
                    {/*    <span>Subtotal</span>*/ }
                    {/*    <span>{ toRupiah(subtotal()) }</span>*/ }
                    {/*</div>*/ }
                    {/*<div className="flex justify-between">*/ }
                    {/*    <span>Delivery Fee</span>*/ }
                    {/*    <span>{ toRupiah(dataDelivery?.price ?? 0) }</span>*/ }
                    {/*</div>*/ }
                    <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>{ toRupiah(subtotal()
                            // + ( dataDelivery?.price ?? 0 )
                        ) }</span>
                    </div>
                </div>
                <button
                    disabled={ onUpsertUser.isPending }
                    className="mt-5 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={ onSubmit }
                >
                    Confirm Order
                </button>
            </div>
        </>
    );
}
