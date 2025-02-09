'use client'
import Link from "next/link";
import React from "react";
import { DELIVERY, TDeliveryCreate, TDeliveryDB } from "@/interface/entity/delivery.model";
import { DeliveryCardPageAdmin, } from "@/app/components/delivery/delivery.page";
import { DeliveryCreate } from "@/validation/delivery.valid";
import { LoadingSpin, PageLoadingSpin } from "@/app/components/LoadingData";
import { PageEmptyData } from "@/app/components/PageErrorData";
import { Plus } from "lucide-react";
import { PaginatedResponse, TReactFormHookComponent } from "@/interface/server/param";
import { useDebounce } from "@/hook/useDebounce";
import { useDelivery } from "@/hook/useDelivery";
import { useDeliveryStore } from "@/store/delivery";
import { useForm } from "react-hook-form";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export function DeliveryFormClientAdmin({ defaultValues, method, id, }: TReactFormHookComponent<TDeliveryDB>) {
    const { onUpsert } = useDelivery()

    const { handleSubmit, register, formState: { errors } } = useForm<TDeliveryCreate>(
        { resolver: zodResolver(DeliveryCreate), defaultValues }
    );

    const onSubmitAction = async (data: TDeliveryCreate) => {
        await onUpsert({ data, id, method })
    }

    return (
        <div>
            <div className="card">
                <form className='card-body' onSubmit={ handleSubmit(onSubmitAction) }>
                    <h2 className={ 'card-title mb-5' }>Form { method === 'POST' ? "Create" : 'Update' } Delivery</h2>

                    {/* Name */ }
                    <div className="">
                        <label htmlFor="name">Name</label>
                        <input
                            className='input input-bordered w-full'
                            type="text"
                            { ...register("name", { required: "Name is required" }) }
                        />
                        { errors.name && <p className="text-red-500">{ errors.name.message }</p> }
                    </div>

                    {/* Phone */ }
                    <div className="">
                        <label htmlFor="phone">Phone</label>
                        <input
                            className='input input-bordered w-full'
                            type="text"
                            { ...register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^[0-9]{10,15}$/,
                                    message: "Invalid phone number"
                                }
                            }) }
                        />
                        { errors.phone && <p className="text-red-500">{ errors.phone.message }</p> }
                    </div>

                    {/* Address */ }
                    <div className="">
                        <label htmlFor="address">Address</label>
                        <input
                            className='input input-bordered w-full'
                            type="text"
                            { ...register("address", { required: "Address is required" }) }
                        />
                        { errors.address && <p className="text-red-500">{ errors.address.message }</p> }
                    </div>

                    {/* Type */ }
                    <div className="">
                        <label htmlFor="type">Type</label>
                        <input
                            className='input input-bordered w-full'
                            type="text"
                            { ...register("type", { required: "Type is required" }) }
                        />
                        { errors.type && <p className="text-red-500">{ errors.type.message }</p> }
                    </div>

                    {/* Price */ }
                    <div className="">
                        <label htmlFor="price">Price</label>
                        <input
                            className='input input-bordered w-full'
                            type="number"
                            { ...register("price", {
                                valueAsNumber: true,
                                required: "Price is required",
                                min: {
                                    value: 0,
                                    message: "Price must be greater than or equal to 0"
                                }
                            }) }
                        />
                        { errors.price && <p className="text-red-500">{ errors.price.message }</p> }
                    </div>

                    {/* Image */ }
                    <div className="">
                        <label htmlFor="img">Image URL</label>
                        <input
                            className='input input-bordered w-full'
                            type="url"
                            { ...register("img", {
                                required: "Image URL is required",
                                pattern: {
                                    value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/,
                                    message: "Invalid image URL"
                                }
                            }) }
                        />
                        { errors.img && <p className="text-red-500">{ errors.img.message }</p> }
                    </div>

                    {/* Description */ }
                    <div className="">
                        <label htmlFor="desc">Description</label>
                        <textarea
                            className='textarea textarea-bordered w-full'
                            { ...register("desc", { required: "Description is required" }) }
                        />
                        { errors.desc && <p className="text-red-500">{ errors.desc.message }</p> }
                    </div>

                    <button

                        className='btn btn-info mt-4' type="submit"
                    >Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export function DeliveryListClientAdmin() {
    const router = useRouter();
    const { search } = useDeliveryStore()
    const searchDebounce = useDebounce({ value: search })
    const { onDelete, getAll, useDeliveryInfiniteQuery } = useDelivery()
    const {
        data,
        isLoading,
        isError,
        status,
        error,
        isFetching,
        targetTrigger
    } = useDeliveryInfiniteQuery(searchDebounce, { search })

    if (status === 'pending' || isLoading && isFetching || !data) return <PageLoadingSpin />
    if (status === 'error' || isError || error) return <PageEmptyData page={ 'Payment User' } />

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 mb-20 ">
                { data.pages.map((page) => (
                    page.data.map(delivery => (
                        <DeliveryCardPageAdmin
                            key={ delivery.id }
                            delivery={ delivery }
                            goDetailAction={ () => router.push('/admin/delivery/' + delivery.id) }
                            onClick={ () => onDelete(delivery.id) }
                        />
                    )) )
                ) }
            </div>
            { targetTrigger }
        </>

    )
}

export function DeliverySearchClientAdmin({ children }: { children: React.ReactNode }) {
    const { search, setSearch } = useDeliveryStore()
    return (
        <>
            <div className="flex justify-between mb-4 gap-3">
                <input
                    type="text"
                    className='input input-bordered w-full'
                    placeholder='search...'
                    value={ search }
                    onChange={ e => setSearch(e.target.value) }
                    list={ 'deliverys' }
                />
                <DeliveryDataList />
                <Link href={ '/admin/delivery/create' } className='btn btn-square'>
                    <Plus />
                </Link>
            </div>
            { children }
        </>
    );
}

export function DeliveryDataList() {
    const queryClient = useQueryClient();
    const deliverys = queryClient.getQueryData <InfiniteData<PaginatedResponse<TDeliveryDB>>>([ DELIVERY.KEY, '' ])
    if (!deliverys) return <LoadingSpin />
    return (
        <datalist id="deliverys">
            { deliverys.pages
            .map((page) => page.data
            .slice(0, 10)
            .map((item) => (
                <option
                    key={ item.id }
                    value={ item.name }
                >
                    { item.name }
                </option>
            ))) }
        </datalist>
    );
}
