import React from "react";
import { EarningClient } from "@/app/components/dashboard/dashboard.client";
import { TStatusOrder } from "@/interface/Utils";
import {
    DashboardCustomerPage,
    DashboardOrderPage,
    DashboardProductPage,
    GridCardChild
} from "@/app/components/dashboard/dashboard.page";

export async function DashboardGridDataServerAdmin({ text, color, title }: {
    title: string,
    text: TStatusOrder,
    color: string
}) {
    // const response = await orderMonthTotal(text)
    return (
        <GridCardChild data={ [] } classNames={ color } title={ title } />
    )
}

export async function DashboardTopOrderServerAdmin() {
    // const { data: orders } = await findTopOrderTotal()
    return (
        <DashboardOrderPage orders={ [] } />
    );
}

export async function DashboardTopCustomersServerAdmin() {
    // const { data: receivers } = await receiverAll({ filter: {}, pagination: { limit: 5 } })
    return (
        <DashboardCustomerPage customers={ [] } />
    );
}

export async function DashboardRecentProductServerAdmin() {
    // const { data: products } = await productRecent()
    return (
        <DashboardProductPage products={ [] } />
    );
}

export async function DashboardEarningServerServerAdmin() {
    const year = new Date().getFullYear()
    // const earningDataOld = await getEarningOld(year)
    // const earningDataNew = await getEarningNew(year)
    // console.log(earningDataOld)
    // console.log(earningDataNew)
    const testData = {
        year: 123, dataMonth: [ {
            month: 123,
            total: 123,
        } ]

    };
    return (
        <EarningClient
            year_new={ testData }
            year_old={ testData }
        />
    );
}
