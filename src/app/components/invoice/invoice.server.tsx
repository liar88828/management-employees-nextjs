import React from 'react';
import { InvoiceCheckHandler, InvoicePrintHandler } from "@/app/components/invoice/invoice.client";
import { orderId } from "@/server/network/order";

export async function InvoiceServer({ idOrder, paramsRedirect }: { idOrder: string, paramsRedirect: string, }) {

    const order = await orderId(idOrder)

    return (
        <InvoicePrintHandler redirectAction={ paramsRedirect } order={ order.data } />
    );
}

export async function InvoiceCheckServer({ idOrder, paramsRedirect }: { idOrder: string, paramsRedirect: string, }) {

    const order = await orderId(idOrder)

    return (
        <InvoiceCheckHandler redirectAction={ paramsRedirect } order={ order.data } />
    );
}
