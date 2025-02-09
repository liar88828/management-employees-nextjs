'use client'
import React, { useEffect } from "react";
import { FormOrderProps, OrderCreateAdmin, orderCreateAdmin } from "@/validation/order.valid";
import { FormProvider, useForm, useFormContext, UseFormReturn } from "react-hook-form";
import { ReceiverFormClientAdmin } from "@/app/components/order/order.client";
import { useDeliveryStore } from "@/store/delivery";
import { useOrder } from "@/hook/useOrder";
import { usePaymentStore } from "@/store/payment";
import { useProductStore } from "@/store/product";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    DeliveryFormActionDialog,
    DeliveryShowLoadDialog,
    PaymentFormActionDialog,
    PaymentShowLoadDialog,
    ProductActionDialogAdmin,
    ProductShowDialog
} from "@/app/components/order/order.dialog";

export function OrderFormUpsertAdmin({ defaultValue, idCustomer, method }: FormOrderProps) {
    const { onUpsertAdmin } = useOrder()

    const methods = useForm<OrderCreateAdmin>({
        defaultValues: defaultValue,
        resolver: zodResolver(orderCreateAdmin),
    });

    const onSubmit = (formData: OrderCreateAdmin) => {
        onUpsertAdmin.mutate({ data: formData, method: method, id: defaultValue?.id })
    };

    return (
        <>
            <FormProvider { ...methods }>
                <form
                    onSubmit={ methods.handleSubmit(onSubmit) }
                    className={ " grid grid-cols-1 sm:grid-cols-2 sm:gap-5 px-2 pb-20" }
                >
                    <OrderFormContext
                        isPending={ onUpsertAdmin.isPending }
                        idCustomer={ idCustomer }
                    />
                    <div className="space-y-4 pb-2">
                        <ReceiverFormClientAdmin />
                        <ProductActionDialogAdmin />
                        <OrderFormTotal
                            isPending={ onUpsertAdmin.isPending }
                        />
                    </div>
                </form>
            </FormProvider>
            <DeliveryShowLoadDialog />
            <PaymentShowLoadDialog />
            <ProductShowDialog />
        </>
    )
}

export function OrderFormTotal({ isPending }: { isPending: boolean }) {
    const { total: totalProductStore } = useProductStore()
    const { register, formState: { errors } } = useFormContext<OrderCreateAdmin>()
    return (
        <>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Total Product</span>
                </label>
                <input
                    type="number"
                    disabled={ true }
                    value={ totalProductStore }
                    { ...register("totalProduct",
                        { valueAsNumber: true }) }
                    className="input input-bordered"
                />
            </div>
            { errors.totalProduct &&
              <span className="text-error">{ errors.totalProduct.message }</span> }

            <div className="form-control visible sm:invisible">
                <label className="label">
                    <span className="label-text">Total All</span>
                </label>
                <input
                    type="number"
                    disabled={ true }
                    { ...register("totalAll",
                        {
                            valueAsNumber: true,
                        }) }
                    className="input input-bordered"
                />
            </div>
            { errors.totalAll &&
              <span className="text-error">{ errors.totalAll.message }</span> }

            <div className="form-control mt-4  visible sm:invisible">
                <button
                    type="submit"
                    disabled={ isPending }
                    className="btn btn-primary"
                >
                    Submit
                </button>
            </div>
        </>

    );
}

export function OrderFormContext({ isPending, idCustomer }: { idCustomer: string, isPending: boolean }) {
    const { total: totalProductStore } = useProductStore()
    const { delivery: dataDelivery, setDeliveryPartial } = useDeliveryStore()
    const { payment: dataPayment, setPaymentPartial } = usePaymentStore()
    const { register, formState: { errors }, setValue, getValues } = useFormContext<OrderCreateAdmin>()

    useEffect(() => {
        const [ priceDelivery, totalPayment ] = getValues([ 'priceDelivery', "totalPayment" ])
        const totalAllCalculate = +priceDelivery + totalPayment + totalProductStore
        if (!isNaN(totalAllCalculate)) {
            setValue('totalProduct', totalProductStore)
            setValue('totalAll', totalAllCalculate)
        }
        if (dataDelivery) {
            setValue('nameDelivery', dataDelivery.name ?? '')
            setValue('phoneDelivery', dataDelivery.phone ?? '')
            setValue('priceDelivery', dataDelivery.price ?? 0)
        }
        if (dataPayment) {
            setValue('namePayment', dataPayment.name ?? '')
            // setValue('pricePayment', dataPayment.name ?? '')
        }
    }, [ dataPayment, dataDelivery, getValues, setValue, totalProductStore ])
// console.log(id_customer)
    return (
        <div>
            <h2 className="text-xl font-bold">Order Form</h2>
            <input
                type="hidden"
                value={ idCustomer }
                { ...register("id_customer") }
            />

            {/* Order Time */ }
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Order Time</span>
                </label>
                <input
                    type="datetime-local"
                    { ...register("orderTime", {
                        valueAsDate: true,
                    }) }
                    className="input input-bordered"
                />
            </div>
            { errors.orderTime && <span className="text-error">{ errors.orderTime.message }</span> }

            {/* Send Time */ }
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Send Time</span>
                </label>
                <input
                    type="datetime-local"
                    { ...register("sendTime", {
                        valueAsDate: true,
                    }) }
                    className="input input-bordered"
                />
            </div>
            { errors.sendTime && <span className="text-error">{ errors.sendTime.message }</span> }

            {/* Delivery */ }
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Delivery Name</span>
                </label>
                <div className="join w-full">
                    <input
                        disabled={ true }
                        type="text"
                        { ...register("nameDelivery", {
                            onChange: (e) => {
                                setDeliveryPartial({ name: e.target.value })
                            }
                        }) }
                        className="input input-bordered join-item w-full"
                    />
                    <DeliveryFormActionDialog />
                </div>
            </div>
            { errors.nameDelivery && <span className="text-error">{ errors.nameDelivery.message }</span> }

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Delivery Phone</span>
                </label>
                <input
                    type="text"
                    { ...register("phoneDelivery", {
                            onChange: (e) => {
                                setDeliveryPartial({ phone: e.target.value })
                            }
                        }
                    ) }
                    className="input input-bordered"
                />
            </div>
            { errors.phoneDelivery && <span className="text-error">{ errors.phoneDelivery.message }</span> }

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Delivery Price</span>
                </label>
                <input
                    type="number"
                    { ...register("priceDelivery",
                        {
                            valueAsNumber: true,
                            onChange: (e) => {
                                let priceDelivery = Number(e.target.value);

                                if (!isNaN(priceDelivery)) {
                                    setDeliveryPartial({ price: priceDelivery })
                                    const [ totalPayment, totalProduct ] = getValues([ 'totalPayment', "totalProduct" ])
                                    const totalAllCalculate = priceDelivery + totalPayment + totalProduct
                                    setValue('totalAll', totalAllCalculate)
                                    // setValue('totalProduct', totalProductStore)
                                }
                                //
                                // setTotal({
                                //     totalProduct : totalProduct,
                                //     priceDelivery : Number(e.target.value),
                                // })
                            }
                        }) }
                    className="input input-bordered"
                />
            </div>
            { errors.priceDelivery && <span className="text-error">{ errors.priceDelivery.message }</span> }

            {/* Payment */ }
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Payment Name</span>
                </label>
                <div className="join w-full">
                    <input
                        disabled={ true }
                        type="text"
                        { ...register("namePayment", {
                            onChange: (e) => {
                                setPaymentPartial({ name: e.target.value })
                            }
                        }) }
                        className="input input-bordered join-item w-full"
                    />
                    <PaymentFormActionDialog />
                </div>
            </div>
            { errors.namePayment && <span className="text-error">{ errors.namePayment.message }</span> }

            {/* Payment */ }
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Total Payment</span>
                </label>
                <input
                    type="number"
                    { ...register("totalPayment",
                        {
                            valueAsNumber: true,
                            onChange: (e) => {
                                const [ priceDelivery, totalProduct ] = getValues([ 'priceDelivery', "totalProduct" ])
                                const totalAllCalculate = Number(e.target.value) + priceDelivery + totalProduct
                                if (!isNaN(totalAllCalculate)) {
                                    setValue('totalAll', totalAllCalculate)
                                }

                                // setTotal({
                                //     totalProduct : totalProduct,
                                //     pricePayment : Number(e.target.value)
                                // })
                            }
                        }) }
                    className="input input-bordered"
                />
            </div>
            { errors.totalPayment && <span className="text-error">{ errors.totalPayment.message }</span> }

            {/* Product */ }
            <div className="form-control hidden sm:block ">
                <label className="label">
                    <span className="label-text">Total Product</span>
                </label>
                <input
                    type="number"
                    disabled={ true }
                    value={ totalProductStore }
                    { ...register("totalProduct",
                        { valueAsNumber: true }) }
                    className="input input-bordered"
                />
            </div>
            { errors.totalProduct && <span className="text-error">{ errors.totalProduct.message }</span> }

            <div className="form-control hidden sm:block ">
                <label className="label">
                    <span className="label-text">Total All</span>
                </label>
                <input
                    type="number"
                    disabled={ true }
                    { ...register("totalAll",
                        {
                            valueAsNumber: true,
                        }) }
                    className="input input-bordered"
                />
            </div>
            { errors.totalAll && <span className="text-error">{ errors.totalAll.message }</span> }

            {/* Status */ }
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Status</span>
                </label>
                <select { ...register("status") } className="select select-bordered">
                    <option value="Pending">Pending</option>
                    <option value="Fail">Fail</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            { errors.status && <span className="text-error">{ errors.status.message }</span> }

            {/* Submit Button */ }
            <div className="form-control mt-4 ">
                <button
                    disabled={ isPending }
                    type="submit" className="btn btn-primary hidden sm:block"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export function OrderFormPagexxxx(props: {
    idCustomer: string
    isPending: boolean
    methods: UseFormReturn<OrderCreateAdmin>,
    onSubmit: (data: OrderCreateAdmin) => void
}) {
    return <>
        <FormProvider { ...props.methods }>
            <form
                onSubmit={ props.methods.handleSubmit(props.onSubmit) }
                className={ " grid grid-cols-1 sm:grid-cols-2 gap-5 px-2 pb-20" }
            >
                <OrderFormContext
                    isPending={ props.isPending }
                    idCustomer={ props.idCustomer }
                />
                <div className="space-y-4 pb-2">
                    <ReceiverFormClientAdmin />
                    <ProductActionDialogAdmin />
                    <div className="form-control mt-4  visible sm:invisible">
                        <button
                            type="submit"
                            disabled={ props.isPending }
                            className="btn btn-primary"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </FormProvider>
        <DeliveryShowLoadDialog />
        <PaymentShowLoadDialog />
        <ProductShowDialog />
    </>;
}
