import React from "react";
import { ProductDetailPageUser } from "@/app/components/product/product.page";
import {
    ProductAddTrolleyClientUser,
    ProductDetailClientAdmin,
    ProductFormClientAdmin
} from "@/app/components/product/product.client";
import { productHistory, productId } from "@/server/network/product";
import { PageErrorData } from "@/app/components/PageErrorData";
import { OrderHistoryCard } from "@/app/components/order/history";

export async function ProductFormUpdateServerAdmin({ idProduct }: { idProduct: string }) {
    const { data } = await productId(idProduct)
    return ( <ProductFormClientAdmin
            defaultValues={ data }
            method={ 'PUT' }
            id={ idProduct }
        />
    )
}

export async function ProductDetailServerAdmin({ idProduct }: { idProduct: string }) {
    const { data: product } = await productId(idProduct)
    return (
        <>
            <ProductDetailClientAdmin product={ product } />
        </>
    )
}

export async function ProductHistoryServerAdmin({ idProduct }: { idProduct: string }) {
    const { data: historyProduct } = await productHistory(idProduct)

    return (
        <OrderHistoryCard
            idPage={ idProduct }
            formPage={ 'product' }
            orderHistory={ historyProduct }/>
    )
}

export async function ProductDetailServerUser({ idProduct }: { idProduct: string }) {
    const response = await productId(idProduct)

    if (!response.data) {
        return (
            <div className="flex justify-center">
                <PageErrorData code={ 404 } msg={ 'Data is not found' } />
            </div>
        )
    }
    return (
        <ProductDetailPageUser product={ response.data }>
            <ProductAddTrolleyClientUser product={ response.data }/>
        </ProductDetailPageUser>
    )
}
