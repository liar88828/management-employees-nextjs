import React from "react";
import type { TCustomersDB } from "@/interface/entity/receiver.model";
import { OrderMonthTotal, TOrderTopTotal } from "@/interface/entity/transaction.model";
import { toDate } from "@/utils/toDate";
import { toRupiah } from "@/utils/toRupiah";
import { toStatus } from "@/app/components/toStatus";
import { TProductDB } from "@/interface/entity/product.model";

export function GridCardChild({ classNames, data, title }: {
    title: string,
    data: OrderMonthTotal,
    classNames: string
}) {
    return (
        <div className={ `card  ${ classNames }  2xl:card-normal card-compact` }>
            <div className="card-body">
                <div className=" flex md:flex-col xl:flex-row justify-around items-end md:items-start xl:items-end">
                    <div className="">
                        <h1 className={ 'font-bold ~text-2xl/3xl' }>{ toRupiah(data.totalAll) }</h1>
                        <p className={ 'text-base-content/50 ~text-xs/base' }>{ title }</p>
                    </div>
                    <div className="">
                        <h2 className="text-xl font-bold  text-end sm:text-end md:text-start xl:text-end ">{ data.count }</h2>
                        <p className={ 'text-base-content/50 ~text-xs/base text-nowrap  text-start md:text-end' }>
                            This Mouth
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function DashboardOrderPage(props: { orders: TOrderTopTotal[] }) {
    return (
        <div className="card bg-base-200/30 card-compact md:card-normal">
            <div className="card-body ">
                <h2 className="card-title">Top Order</h2>
                <div className="overflow-x-auto">
                    <table className="table  w-full table-auto table-xs md:table-md">
                        <thead>
                        <tr>
                            <th>Img</th>
                            <th>Status</th>
                            <th>Name</th>
                            <th>Total Product</th>
                            <th>Total Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        { props.orders.map((order) => (
                            <tr key={ order.id }>
                                <td>
                                    {/* eslint-disable-next-line @next/next/no-img-element */ }
                                    <img
                                        className={ 'rounded-2xl w-20' }
                                        src="https://picsum.photos/200" alt={ order.Customers.name }
                                    />
                                </td>
                                <td>
                                    <div className=" space-y-1">
                                        <p className={ ` badge badge-outline badge-${ toStatus(order.status) }` }>{ order.status }</p>
                                        <p className={ '~text-xs/base' }>{ toDate(order.sendTime) }</p>
                                    </div>
                                </td>
                                <td>{ order.Customers.name }</td>
                                <td>{ order.Trolleys.reduce((total, item) => {
                                    return total + item.qty_at_buy
                                }, 0) }</td>
                                <td>{ toRupiah(order.totalAll) }</td>
                                {/*<td>{ order.nameDelivery }</td>*/ }
                            </tr> )) }
                        </tbody>
                    </table>
                </div>
            </div>
        </div> );
}

export function DashboardCustomerPage({ customers }: { customers: TCustomersDB[] }) {
    return (
        <div className="card card-compact bg-base-200/30  ">
            <div className="card-body">
                <h2 className="card-title">Top Customers</h2>
                <div className="divider m-0"></div>
                { customers.map((customer) => (
                    <div className="flex items-center justify-between"
                         key={ customer.id }
                    >
                        <div className="flex gap-2">
                            <div className="avatar">
                                <div className="w-10 h-10 rounded-full">
                                    {/* eslint-disable-next-line @next/next/no-img-element */ }
                                    <img
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                        alt={ customer.id }
                                    />
                                </div>
                            </div>
                            <div className="">
                                <h2 className="font-bold ">{ customer.name }</h2>
                                <p className={ 'text-base-content/50 text-nowrap' }>{ 20 } Purchase xxx</p>
                            </div>
                        </div>
                        <div className="">
                            <p className={ 'font-bold' }>{ toRupiah(2000) }xxx</p>
                        </div>
                    </div>
                )) }
            </div>
        </div>
    );
}

export function DashboardProductPage({ products }: { products: TProductDB[] }) {
    return (
        <div className="card card-compact bg-base-200/30 ">
            <div className="card-body">
                <h2 className="card-title">Recent Product</h2>
                <div className="divider m-0"></div>
                { products.map((product) => (
                    <div className="flex  items-center justify-between"
                         key={ product.id }
                    >
                        <div className="flex gap-2">

                            {/* eslint-disable-next-line @next/next/no-img-element */ }
                            <div className="avatar">
                                <div className="w-10 h-10 rounded-full">
                                    {/* eslint-disable-next-line @next/next/no-img-element */ }
                                    <img
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                        alt={ product.id }
                                    />
                                </div>
                            </div>
                            <div className="">
                                <h2 className="font-bold ">{ product.name }</h2>
                                <p className={ 'text-base-content/50' }>{ product.type } </p>
                            </div>
                        </div>

                        <div className="">
                            <p className={ 'font-bold' }>{ product.qty }</p>
                        </div>
                    </div>
                )) }
            </div>
        </div>
    );
}
