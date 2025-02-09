import React from 'react'
import { ProductFormClientAdmin } from "@/app/components/product/product.client";

export default async function Page() {

    return ( <ProductFormClientAdmin method={ 'POST' } id={ '' } /> )
}
