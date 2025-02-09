import React, { useState } from "react";
import useTrolleyStore from "@/store/trolley";
import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import { EmptyData } from "@/app/components/PageErrorData";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { Plus, Search } from "lucide-react";
import { TDeliveryDB } from "@/interface/entity/delivery.model";
import { TPaymentDB } from "@/interface/entity/payment.model";
import { redirect } from "next/navigation";
import { useDeliveryStore } from "@/store/delivery";
import { usePaymentStore } from "@/store/payment";
import { useProductStore } from "@/store/product";
import {
    DeliveryActionItem,
    DeliveryListDialog,
    PaymentActionItem,
    PaymentDialogList,
    ProductOrderDialog,
    ProductSelectedList
} from "@/app/components/order/order.page";

export function DeliveryActionDialog() {
    const { setDelivery, delivery } = useDeliveryStore()
    return (
        <div className="">
            <div className=" mb-2">
                <h1 className="card-title">Delivery</h1>
            </div>
            <div className=" mt-2">
                <div className="">
                    <div className="space-y-2">
                        { !delivery
                            ? <DeliveryFormButtonDialog />
                            : <DeliveryActionItem
                                key={ delivery.id }
                                delivery={ delivery as TDeliveryDB }
                                onClick={ () => setDelivery(null) }
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export function DeliveryFormActionDialog() {
    const { getDeliveryData } = useDeliveryStore()
    return (
        <button
            type="button"
            className="btn join-item btn-neutral"
            onClick={ async () => {
                await getDeliveryData()
                // @ts-ignore
                document.getElementById('my_modal_delivery').showModal()
            } }
        >
            <Search />
        </button>
    )
}

export function DeliveryFormButtonDialog() {
    const { getDeliveryData } = useDeliveryStore()
    return (
        <button
            className="btn btn-neutral w-full"
            type={ 'button' }
            onClick={ async () => {
                await getDeliveryData()
                // @ts-ignore
                document.getElementById('my_modal_delivery').showModal()
            } }
        >
            Please Add Delivery <Plus />
        </button>
    )
}
export function DeliveryShowLoadDialog() {
    const { setDelivery, deliveryData, setSearch, search, isLoading } = useDeliveryStore()

    return (
        <dialog id="my_modal_delivery" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Please Add</h3>
                { isLoading
                    ? <PageLoadingSpin />
                    : (
                        <div className="">
                            {/*<p className="py-4">Press ESC key or click the button below to close</p>*/ }
                            <div className="flex justify-between py-4">
                                <input
                                    className={ 'input input-bordered w-full' }
                                    type="search"
                                    onChange={ (e) => setSearch(e.target.value) }
                                    value={ search }
                                    placeholder="Search..."
                                />
                            </div>
                            <div className=" space-y-2">
                                { deliveryData &&
                                    deliveryData
                                    .filter(data => data.name.toLowerCase().includes(search.toLowerCase()))
                                    .map(delivery => (
                                            <DeliveryListDialog
                                                key={ delivery.id }
                                                delivery={ delivery }
                                                onClick={ () => setDelivery(delivery) }
                                            />
                                        )
                                    ) }
                            </div>
                        </div>
                    )
                }

                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */ }
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}

//

export function PaymentActionDialog() {
    const { setPayment, payment } = usePaymentStore()

    return (
        <div className="">
            <div className="mb-2">
                <h1 className="card-title">Payment</h1>
            </div>
            <div className=" mt-2">
                <div className="">
                    <div className="space-y-2">
                        { !payment
                            ? <PaymentActionButtonDialog />
                            : <PaymentActionItem
                                payment={ payment as TPaymentDB }
                                onDeleteAction={ () => setPayment(null) }
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

function PaymentActionButtonDialog() {
    const getPaymentData = usePaymentStore(state => state.getPaymentData)

    return (
        <button
            className="btn btn-neutral w-full"
            type={ 'button' }
            onClick={ async () => {
                await getPaymentData()
                // @ts-ignore
                document.getElementById('my_modal_payment').showModal()
            } }
        >
            Please Add Payment <Plus />
        </button>
    );
}

export function PaymentFormActionDialog() {
    const { getPaymentData } = usePaymentStore()

    return <button className="btn join-item btn-neutral"
                   type={ 'button' }
                   onClick={ async () => {
                       await getPaymentData()
                       // @ts-ignore
                       document.getElementById('my_modal_payment').showModal()
                   } }
    >
        <Search />
    </button>
}

export function PaymentShowLoadDialog() {
    const { setFilter, setPayment, paymentData, filter, } = usePaymentStore()

    return (
        <dialog id="my_modal_payment" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Please Select Payment Methods</h3>
                {/*<p className="py-4">Press ESC key or click the button below to close</p>*/ }
                <input
                    className={ 'input input-bordered w-full' }
                    type="search"
                    onChange={ (e) => {
                        setFilter({ name: e.target.value })
                    } }
                    value={ filter.name }
                    placeholder="Search..."
                />
                <div className="space-y-2 mt-2">
                    {
                        paymentData &&
                        paymentData
                        .filter(data => data.name.toLowerCase().includes(filter.name.toLowerCase()))
                        .map(payment => (
                            <PaymentDialogList
                                key={ payment.id }
                                payment={ payment }
                                onClick={ () => {
                                    setPayment(payment);
                                } }
                            />
                        )) }
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */ }
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

//
export function ProductActionDialogUser() {
    const { onIncrement, onDecrement, onRemove, setQty, onSelected } = useTrolleyStore();

    if (onSelected.length === 0) {
        redirect('/trolley')
    }

    return (
        <div className="">
            <div className="px-2 mb-2">
                <div className="flex justify-between">
                    <h1 className="card-title">Product</h1>
                </div>
            </div>

            <div className="space-y-2  rounded-2xl ">
                { !onSelected
                    ? <EmptyData page={ 'checkout' } />
                    : onSelected.map(trolley => (
                        <ProductSelectedList
                            key={ trolley.id_product }
                            product={ trolley }
                            onChangeQty={ (e) => setQty(trolley.id_product, Number(e.target.value)) }
                            onRemoveAction={ () => onRemove(trolley.id_product) }
                            onIncrementAction={ () => onIncrement(trolley.id_product) }
                            onDecrementAction={ () => onDecrement(trolley.id_product) }
                        />
                    )) }
            </div>
        </div>
    )
}

export function ProductShowDialog() {

    const {
        productAsync,
        isLoading,
        idProduct,
        setProduct,
    } = useProductStore()
    const [ search, setSearch ] = useState<string>('')
    return (
        <dialog id="my_modal_product" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box ">
                <div className="space-y-2 mb-2">
                    <div className="flex justify-between items-center ">
                        <h3 className="font-bold text-lg">Please Select The Product</h3>
                        <form method="dialog">
                            <button className="btn btn-square btn-neutral btn-sm"><CloseIcon /></button>
                        </form>
                    </div>
                    <input type="search"
                           placeholder="Search..."
                           className={ 'input input-bordered  input-sm w-full' }
                           onChange={ (e) => setSearch(e.target.value) }
                           value={ search }
                    />
                </div>
                <div className="space-y-2 overflow-auto h-[76vh]">
                    { isLoading
                        ? <PageLoadingSpin />
                        : productAsync
                        .filter(product => !idProduct.includes(product.id))
                        .filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
                        .map(product => (
                            <ProductOrderDialog
                                key={ product.id }
                                product={ product }
                                onClick={ () => setProduct(product) }
                            />
                        )) }
                </div>
                {/*<div className="modal-action">*/ }
                {/*    <form method="dialog">*/ }
                {/*        <button className="btn">Close</button>*/ }
                {/*    </form>*/ }
                {/*</div>*/ }
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}

export function ProductActionDialogAdmin() {
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
            <h1 className={ 'card-title' }>Product</h1>
            <div className=" mt-2">
                <div className="space-y-2">
                    { !productStore
                        ? <EmptyData page={ 'Checkout Product' } />
                        : productStore.map(product => (
                            <ProductSelectedList
                                key={ product.id_product }
                                product={ product }
                                onChangeQty={ (e) => setQty(product.id_product, Number(e.target.value)) }
                                onRemoveAction={ () => onRemove(product.id_product) }
                                onIncrementAction={ () => onIncrement(product.id_product) }
                                onDecrementAction={ () => onDecrement(product.id_product) }
                            />
                        ))
                    }
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
                Add Product
                <Plus />
            </button>
        </div>
    );
}
