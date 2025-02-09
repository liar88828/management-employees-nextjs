'use client'
import Link from "next/link";
import React, { Suspense, useState } from "react";
import { ChevronDown, ChevronsUpDown, ChevronUp, Minus, Plus, ShoppingCart } from "lucide-react";
import { InfiniteData, useQuery, useQueryClient } from "@tanstack/react-query";
import { useProduct } from "@/hook/useProduct";
import { PRODUCT, PRODUCT_FILTER_PRICE, TProductCreate, TProductDB } from "@/interface/entity/product.model";
import { PageEmptyData, PageErrorData } from "@/app/components/PageErrorData";
import { LoadingSpin, PageLoadingSpin } from "@/app/components/LoadingData";
import { PaginatedResponse, TReactFormHookComponent } from "@/interface/server/param";
import {
    ProductCardPageAdmin,
    ProductCardPageUser,
    ProductDetailPageAdmin
} from "@/app/components/product/product.page";
import { ProductCreate } from "@/validation/product.valid";
import { categoryData } from "@/assets/MenuList";
import { productAll } from "@/server/network/product";
import { toRupiah } from "@/utils/toRupiah";
import { toUnique } from "@/utils/toUnique";
import { useDebounce } from "@/hook/useDebounce";
import { useForm } from "react-hook-form";
import { useProductStore } from "@/store/product";
import { useRouter } from "next/navigation";
import { useTrolley } from "@/hook/useTrolley";
import { zodResolver } from "@hookform/resolvers/zod";

export function ProductLayoutClientUser({ children }: { children: React.ReactNode }) {

    const { filter, setFilter } = useProductStore();
    const { name } = filter
    const { getProductType } = useProduct();
    const { data: productType } = getProductType()

    return (
        <div className="px-3 space-y-5">
            <div className="">
                <div className="flex items-center justify-between ">
                    <input
                        className='input input-bordered w-full'
                        placeholder='Search ...'
                        value={ name }
                        type="text"
                        onChange={ (e) => setFilter({ name: e.target.value }) }
                        list={ 'products' }
                    />
                    <Suspense fallback={ <LoadingSpin /> }>
                        <ProductDataList />
                    </Suspense>
                </div>
                <div className="flex gap-5 mt-2 justify-between sm:justify-normal">

                    <button
                        onClick={ () => setFilter({ related: true }) }
                        className={ `btn btn-outline btn-xs sm:btn-sm  ${ filter.related && "btn-active" }` }
                    >
                        Related
                    </button>

                    <button
                        onClick={ () => setFilter({ popular: true }) }
                        className={ `btn btn-outline btn-xs sm:btn-sm  ${ filter.popular && "btn-active" }` }
                    >
                        Popular
                    </button>

                    <button
                        onClick={ () => setFilter({ new: true }) }
                        className={ `btn btn-outline btn-xs sm:btn-sm  ${ filter.new && "btn-active" }` }
                    >
                        New
                    </button>

                    <button
                        onClick={ () => setFilter({ price: filter.price }) }
                        className={ `btn btn-outline btn-xs sm:btn-sm ${ filter.price === PRODUCT_FILTER_PRICE.NORMAL ? '' : 'btn-active' } ` }
                    >
                        Price {
                        filter.price === PRODUCT_FILTER_PRICE.NORMAL
                            ? <ChevronsUpDown className="w-5 h-5" />
                            : filter.price === PRODUCT_FILTER_PRICE.LOW
                                ? <ChevronDown className="w-5 h-5" />
                                : <ChevronUp className="w-5 h-5" />
                    }
                    </button>
                    <select
                        onChange={ (e) => setFilter({ type: e.target.value }) }
                        className="select select-bordered select-xs sm:select-sm w-20 sm:w-fit"
                        defaultValue={ filter.type }
                    >
                        <option value={ '' }>Select Type</option>
                        {
                            productType && toUnique<string>(
                                categoryData.map(d => d.title),
                                productType.map(d => d.title)
                            )
                            .map((title) =>
                                ( <option key={ title }>{ title }</option> )
                            ) }
                    </select>
                </div>
            </div>
            { children }
        </div>
    )
}

export function ProductDataList() {
    const { name, ...rest } = useProductStore(state => state.filter);
    const debouncedSearch = useDebounce({ value: name })
    const queryClient = useQueryClient();
    const dataQueryClient = queryClient.getQueryData<InfiniteData<PaginatedResponse<TProductDB>>>([
        PRODUCT.KEY, debouncedSearch,
        ...Object.values(rest)
    ])

    return (
        <datalist id={ 'products' }>{
            dataQueryClient?.pages
            .map(item => item.data
            .slice(0, 10)
            .map(_item => (
                <option key={ _item.id }>{ _item.name }</option>
            )))
        }
        </datalist>
    );
}

export function ProductFetchClientUser() {
    const router = useRouter();
    const { useProductInfiniteQuery } = useProduct();
    const { push } = useTrolley()
    const { filter } = useProductStore();
    const debouncedSearch = useDebounce({ value: filter.name })

    const {
        data,
        error,
        isError,
        isFetching,
        isLoading,
        status,
        targetTrigger
    } = useProductInfiniteQuery(debouncedSearch, filter)

    if (status === 'pending' || isLoading && isFetching || !data) return <PageLoadingSpin />
    if (status === 'error' || isError || error) return <PageEmptyData page={ 'Product User' } />

    return <>
        <div className='grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid xl:grid-cols-6 gap-2'>
            {
                data.pages.map((page) =>
                    page.data
                    // .filter(product=>product.name.toLowerCase().includes(search.toLowerCase()))
                    .map((product) => (
                        <ProductCardPageUser
                            key={ product.id }
                            product={ product }
                            addTrolleyAction={ () => push.mutate(product) }
                            detailProductAction={ () => router.push(`/product/${ product.id }`) }
                        />
                        )
                    )
                )
            }
        </div>
        { targetTrigger }
    </>
}

export function ProductListClientAdminXXX() {
    const { onDelete } = useProduct()
    const { filter } = useProductStore()
    // const router = useRouter()
    const searchDebounce = useDebounce({
        value: filter.name,
        // fun: () => router.push(`/admin/product?search=${ filter.name }`)
    })

    const { data: products, isLoading, isError } = useQuery({
        queryKey: [ PRODUCT.KEY, searchDebounce ],
        queryFn: () => productAll({
            pagination: { limit: 20 },
            filter: { name: searchDebounce }
        }),
        enabled: searchDebounce === filter.name,
        select: (data) => data.data.data,
    })

    if (isLoading || !products) return <PageLoadingSpin />
    if (isError) return <PageErrorData />
    if (products.length === 0) return <PageErrorData code={ 404 } msg={ 'Data Payment is Empty' } />

    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 mb-20 ">
            { products.map(product => (
                <ProductCardPageAdmin
                    key={ product.id }
                    onDeleteAction={ () => onDelete(product.id) }
                    product={ product }
                />
            )) }
        </div>
    )
}

export function ProductListClientAdmin() {
    const { onDelete, useProductInfiniteQueryAdmin } = useProduct()
    const { filter } = useProductStore()
    // const router = useRouter()
    const searchDebounce = useDebounce({
        value: filter.name,
        // fun: () => router.push(`/admin/product?search=${ filter.name }`)
    })

    const {
        data,
        isLoading,
        isError,
        status,
        error,
        isFetching,
        targetTrigger
    } = useProductInfiniteQueryAdmin(searchDebounce, filter)

    if (status === 'pending' || isLoading && isFetching || !data) return <PageLoadingSpin />
    if (status === 'error' || isError || error) return <PageEmptyData page={ 'Payment User' } />

    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 mb-20 ">
            { data.pages.map((page) => (
                page.data.map(product => (
                    <ProductCardPageAdmin
                        key={ product.id }
                        onDeleteAction={ () => onDelete(product.id) }
                        product={ product }
                    />
                ))
            )) }
            { targetTrigger }
        </div>
    )
}

export function ProductSearchClientAdmin({ children }: { children: React.ReactNode }) {
    const { filter, setFilter } = useProductStore()
    const queryClient = useQueryClient();
    const data = queryClient.getQueryData <InfiniteData<PaginatedResponse<TProductDB>>>([ PRODUCT.KEY, '' ])
    const products = data?.pages.flatMap((page) => page.data)
    return ( <>
            <div className="flex justify-between mb-4 gap-3">
                <input
                    type="text"
                    className='input input-bordered w-full'
                    onChange={ e => setFilter({ name: e.target.value }) }
                    value={ filter.name }
                    placeholder='search...'
                    list={ 'products' }
                />
                <datalist id="products">
                    { products && products
                    .slice(0, 10)
                    .map((item) => (
                        <option
                            key={ item.id }
                            value={ item.name }
                        >
                            { item.name }
                        </option>
                    )) }
                </datalist>
                <Link href={ '/admin/product/create' } className='btn btn-square'>
                    <Plus />
                </Link>
            </div>
            { children }
        </>
    );
}

export function ProductDetailClientAdmin({ product }: { product: TProductDB }) {
    const { onDelete, onUpdateStock } = useProduct()
    const router = useRouter()
    const [ stock, setStock ] = useState(0)
    const updateStock = async () => {
        await onUpdateStock(product.id, stock)
    }

    return (
        <ProductDetailPageAdmin
            product={ product }
            onChangeAction={ (e: React.ChangeEvent<HTMLInputElement>) => setStock(Number(e.target.value)) }
            onAddStockAction={ updateStock }
            hrefUpdateAction={ () => router.push(`/admin/product/update/${ product.id }`) }
            onDeleteAction={ () => onDelete(product.id) }
        />

    )
}

export function ProductFormClientAdmin({ defaultValues, method, id, }: TReactFormHookComponent<TProductCreate>) {
    const { onUpsert, getProductType } = useProduct()
    const { data: productType } = getProductType()
    const { handleSubmit, register, formState: { errors } } = useForm<TProductCreate>({
        resolver: zodResolver(ProductCreate), defaultValues
    });
    const [ category, setCategory ] = useState(defaultValues?.type ?? '')

    const onSubmitAction = async (data: TProductCreate) => {
        data.type = category;
        await onUpsert({ method, data, id })
    }

    // console.log(UniqueId(productType.map(d=>d.title)??[], categoryData.map(d=>title)))

    return (
        <div className="card card-compact">
            <form className='card-body' onSubmit={ handleSubmit(onSubmitAction) }>
                <h2 className={ 'card-title mb-5' }>Form { method === 'POST' ? "Create" : 'Update' } Product</h2>
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

                {/* Type */ }

                <div className="form-control  ">
                    <label htmlFor="type">Type</label>
                    <div className="join w-full">
                        <input
                            className='input input-bordered w-full join-item'
                            type="text"
                            value={ category }
                            { ...register('type',
                                {
                                    required: "Type is required",
                                    onChange: ( e => setCategory(e.target.value) ),
                                    value: category,
                                }) }
                        />
                        <select
                            onChange={ e => setCategory(e.target.value) }
                            className={ `select select-bordered join-item  ${ errors.type ? 'select-error' : '' }` }

                        >
                            {
                                productType && toUnique<string>(
                                    categoryData.map(d => d.title),
                                    productType.map(d => d.title)
                                ).map((title) => (
                                    <option key={ title } value={ title }
                                    >{ title }</option>
                                ))
                            }
                        </select>
                    </div>
                    { errors.type && <p className="text-error text-sm mt-1">{ errors.type.message }</p> }
                </div>

                {/* Price */
                }
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

                {/* Image */
                }
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

                {/* Description */
                }
                <div className="">
                    <label htmlFor="desc">Description</label>
                    <textarea
                        className='textarea textarea-bordered w-full'
                        { ...register("desc", { required: "Description is required" }) }
                    />
                    { errors.desc && <p className="text-red-500">{ errors.desc.message }</p> }
                </div>

                {/* Location */
                }
                <div className="">
                    <label htmlFor="location">Location</label>
                    <textarea
                        className='textarea textarea-bordered w-full'
                        { ...register("location", { required: "Location is required" }) }
                    ></textarea>
                    { errors.location && <p className="text-red-500">{ errors.location.message }</p> }
                </div>

                {/* Quantity */
                }
                <div className="">
                    <label htmlFor="qty">Quantity</label>
                    <input
                        className='input input-bordered w-full'
                        type="number"
                        { ...register("qty", {
                            valueAsNumber: true,
                            required: "Quantity is required",
                            min: {
                                value: 0,
                                message: "Quantity must be greater than or equal to 0"
                            }
                        }) }
                    />
                    { errors.qty && <p className="text-red-500">{ errors.qty.message }</p> }
                </div>

                <button className='btn btn-info mt-4' type="submit">Submit</button>
            </form>

        </div>

    )
        ;
}

export function ProductAddTrolleyClientUser({ product }: { product: TProductDB }) {
    const { push, incrementProduct, decrementProduct, message, counter } = useTrolley()

    const onPushTrolley = () => {
        push.mutate(product)
    }

    return (
        <>
            <button className="w-full btn btn-outline flex items-center"
                    onClick={ () => {
                        // @ts-ignore
                        return document.getElementById('modal_product_detail_user').showModal();
                    } }
            >
                <ShoppingCart /> <span className={ 'text-lg' }> Add Trolley</span>
            </button>
            <dialog id="modal_product_detail_user" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add Trolley </h3>
                    <div className="py-4">
                        { message && (
                            <p className="text-red-500">
                                { message }
                            </p> ) }
                    </div>
                    <div className="">
                        <div className="card card-compact bg-base-200 ">
                            <div className="card-body ">
                                <div className="flex justify-between">

                                    <div className="">
                                        <div className="card-title">
                                            { product.name }
                                        </div>
                                        <p className="">
                                            { toRupiah(product.price) }
                                        </p>

                                    </div>

                                    <div className="card-action">
                                        <div className="flex items-center gap-4">
                                            <button className={ 'btn btn-square btn-neutral' }
                                                    onClick={ decrementProduct }
                                            >
                                                <Minus />
                                            </button>
                                            <h1 className={ 'text-xl' }>{ counter }</h1>
                                            <button
                                                disabled={ product.qty === counter }
                                                className={ 'btn btn-square btn-neutral' }
                                                onClick={ incrementProduct }
                                            >
                                                <Plus />
                                            </button>
                                        </div>
                                        { product.qty === counter &&
                                          <p className={ 'text-error' }>Product is Max to Add</p> }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-action justify-between">
                        <h1 className="text-xl">
                            Total { toRupiah(product.price * counter) }
                        </h1>
                        <div className=" flex flex-row gap-2">
                            <button
                                onClick={ onPushTrolley }
                                className="btn btn-info"
                            >
                                Add Trolley
                            </button>

                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */ }
                                <button className="btn btn-error">Close</button>
                            </form>
                        </div>
                    </div>
                </div>
            </dialog>
        </>

    )
}
