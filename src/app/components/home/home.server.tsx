import { HomeProductClientUser } from "@/app/components/home/home.client";
import { PRODUCT_FILTER_PRICE } from "@/interface/entity/product.model";
import { productNew } from "@/server/network/product";

export type ProductHome = { isLogin: boolean };
export async function NewProduct({ isLogin }: ProductHome) {
    const newProduct = await productNew({
        pagination: { limit: 20 },
        filter: { new: true }
    })
    .then(res => {
        if (res) {
            return res.data.data
        }
        return res
    })

    return (
        <HomeProductClientUser
            products={ newProduct }
            title={ 'New Product' }
            isLogin={ isLogin }
        />
    )
}

export async function LowPriceProduct({ isLogin }: ProductHome) {

    const lowPriceProduct = await productNew({
        pagination: { limit: 20 },
        filter: { price: PRODUCT_FILTER_PRICE.LOW }
    })
    .then(res => {
        if (res) {
            return res.data.data
        }
        return res
    })

    return (
        <HomeProductClientUser
            products={ lowPriceProduct }
            title={ 'Economical' }
            isLogin={ isLogin }
        />
    )
}

export async function PopularProduct({ isLogin }: ProductHome) {

    const popularProduct = await productNew({
        pagination: { limit: 20 },
        filter: { popular: true }
    })
    .then(res => {
        if (res) {
            return res.data.data
        }
        return res
    })

    return (
        <HomeProductClientUser
            products={ popularProduct }
            title={ 'Popular Product' }
            isLogin={ isLogin }
        />
    )
}
