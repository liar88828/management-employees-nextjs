import { HomeProductClientUser } from "@/app/components/home/home.client";

export type ProductHome = { isLogin: boolean };
export async function NewProduct({ isLogin }: ProductHome) {

    return (
        <HomeProductClientUser
            products={ [ {} ] }
            title={ 'New Product' }
            isLogin={ isLogin }
        />
    )
}

export async function LowPriceProduct({ isLogin }: ProductHome) {

    return (
        <HomeProductClientUser
            products={ [ {} ] }
            title={ 'Economical' }
            isLogin={ isLogin }
        />
    )
}

export async function PopularProduct({ isLogin }: ProductHome) {

    return (
        <HomeProductClientUser
            products={ [ {} ] }
            title={ 'Popular Product' }
            isLogin={ isLogin }
        />
    )
}
