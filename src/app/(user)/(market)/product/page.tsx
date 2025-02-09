import React from 'react';
import { ProductFetchClientUser, ProductLayoutClientUser } from "@/app/components/product/product.client";

export default function Page() {
    return (
        <ProductLayoutClientUser>
            <ProductFetchClientUser />
        </ProductLayoutClientUser>
    )
}
