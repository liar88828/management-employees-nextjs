import React from "react";
import { OrderFormUpsertAdmin } from "@/app/components/order/order.form";
import { validSession } from "@/server/lib/db";

export default async function OrderForm() {
    const { userId } = await validSession()

    return (
        <OrderFormUpsertAdmin
            method={ 'POST' }
            idCustomer={ userId }
        />
    )
}
