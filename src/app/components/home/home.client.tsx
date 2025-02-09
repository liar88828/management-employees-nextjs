'use client'
import React from 'react';
import { ChevronRight, PackagePlus } from "lucide-react";
import { PRODUCT_FILTER_PRICE, TProductDB } from "@/interface/entity/product.model";
import { ProductCardPageUser } from "@/app/components/product/product.page";
import { categoryData, menuData } from "@/assets/MenuList";
import { useProduct } from "@/hook/useProduct";
import { useProductStore } from "@/store/product";
import { useRouter } from "next/navigation";
import { useTrolley } from "@/hook/useTrolley";
import { CategoryList } from "@/app/components/home/home.page";

export function HomeProductClientUser({ products, title, isLogin }: {
    title: 'New Product' | 'Economical' | 'Popular Product',
    products: TProductDB[],
    isLogin: boolean
}) {
    const { setFilter } = useProductStore();
    const router = useRouter();
    const { push } = useTrolley()
    const hrefProduct = () => {
        if (title === 'Popular Product') {
            setFilter({ popular: true })
        } else if (title === 'Economical') {
            setFilter({ price: PRODUCT_FILTER_PRICE.LOW })
        } else if (title === 'New Product') {
            setFilter({ new: true })
        }
        router.push(`/product`)
    }

    return (
        <div className="card card-compact ">
            <div className="card-body">
                <div className="flex justify-between text-base-content/60">
                    <h2 className="card-title">{ title }</h2>
                    <button onClick={ hrefProduct }
                            className={ 'flex flex-nowrap items-center hover:text-info ' }
                    >
                        <h1 className={ 'text-lg' }>More</h1>
                        <ChevronRight />
                    </button>
                </div>
                <div className='flex gap-3 overflow-x-auto'>
                    { products.map((product: TProductDB) => (
                        <div
                            key={ product.id }
                            className={ ' flex-shrink-0 ~w-40/48 py-0.5' }
                        >
                            <ProductCardPageUser
                                isLogin={ isLogin }
                                product={ product }
                                addTrolleyAction={ () => push.mutate(product) }
                                detailProductAction={ () => router.push(`/product/${ product.id }`) }
                            />
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    );
}

export function ProductHomeCategoryUser() {
    const route = useRouter()
    const { setFilter } = useProductStore();
    const { getProductType } = useProduct();
    const { data: productType } = getProductType()
    return (
        <div className="grid sm:grid-cols-6 grid-cols-1 gap-5">
            <div className="col-span-4 card sm:card-bordered card-compact ">
                <div className="card-body ">
                    <h1 className="card-title">Shop My Category</h1>
                    <div className="flex justify-between gap-5 overflow-x-auto pb-1">

                        { categoryData.map((item) => (
                            <CategoryList
                                key={ item.title }
                                item={ item }
                                onClick={ () => {
                                    setFilter({ type: item.title })
                                    route.push('/product')
                                } }
                            />
                        )) }

                        { productType?.slice(0, 2).map((item) => (
                            <CategoryList
                                key={ item.title }
                                item={ {
                                    title: item.title,
                                    icon: <PackagePlus />
                                } }
                                onClick={ () => {
                                    setFilter({ type: item.title })
                                    route.push('/product')
                                } }
                            />
                        )) }

                    </div>
                </div>
            </div>

            <div className="hidden sm:block col-span-2 card sm:card-bordered card-compact ">
                <div className="card-body ">
                    <h1 className="card-title">Menu</h1>
                    <div className="flex gap-5 overflow-x-auto pb-1">
                        { menuData.map((item) => (
                            <CategoryList
                                key={ item.title }
                                item={ item }
                                onClick={ () => route.push(item.href) }
                            />
                        )) }
                    </div>
                </div>
            </div>
        </div>
    )
}
