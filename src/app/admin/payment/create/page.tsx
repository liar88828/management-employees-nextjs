import React from 'react'
import { examplePayment } from "@/assets/ExamplePayment";
import { PaymentFormClientAdmin } from "@/app/components/payment/payment.client";

export default function page() {
    return (
        <PaymentFormClientAdmin
            defaultValues={ examplePayment }
            method={ 'POST' }
            id={ '' }
        />
    )
}
