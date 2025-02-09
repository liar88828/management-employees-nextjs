import Image from "next/image";
import QRCode from "react-qr-code";
import React from "react";
import { TOrderTransactionDB } from "@/interface/entity/transaction.model";
import { toDateIndo } from "@/utils/toDate";
import { toRupiah } from "@/utils/toRupiah";
import { toStatus } from "@/app/components/toStatus";

export function InvoicePaper(
    { invoice: { Customers, Trolleys, Deliverys, Payments, ...data }, path }:
    { invoice: TOrderTransactionDB, path: string }) {

    return (
        <div className="  print:h-[270mm] grid grid-cols-1 p-6  shadow-lg  print:shadow-none " data-theme={ 'light' }>
            <div className={ `bg-base-100 rounded-lg ~text-sm/base print:p-15 ` }>
                <div className="grid grid-cols-3 ">
                    <Image src='/my-logo.png' alt="Tahu Bakso Logo" width={ 100 } height={ 100 } />

                    <div className="">
                        <h1 className="text-2xl font-bold  text-center">Invoice</h1>
                    </div>
                    <div className=" flex justify-end p-2">
                        <QRCode
                            className={ 'w-20 h-auto' }
                            size={ 256 }
                            value={ process.env.NEXT_PUBLIC_URL_PAGE + path }
                            viewBox={ `0 0 256 256` }
                        />
                    </div>
                </div>
                <div className={ 'divider mt-0' }></div>
                <div className="border-b pb-4 mb-4">
                    <div className="flex justify-between">
                        <p><span className="font-semibold">Invoice ID:</span> #{ data.id }</p>
                        <p><span
                            className="font-semibold">Order Time:</span> { new Date(data.orderTime).toLocaleString() }
                        </p>
                    </div>
                    <p><span className="font-semibold">Description:</span> { data.desc }</p>
                    <p><span className="font-semibold">Delivery Address:</span> { data.address }</p>
                </div>

                <div className="border-b pb-4 mb-4">
                    <h2 className="font-semibold text-lg mb-2">Customer Details</h2>
                    <p><span className="font-semibold">Name:</span> { Customers.name }</p>
                    <p><span className="font-semibold">Address:</span> { Customers.address }</p>
                    <p><span className="font-semibold">Phone:</span> { Customers.phone }</p>
                </div>

                <div className="border-b pb-4 mb-4 ">
                    <h2 className="font-semibold text-lg mb-2">Items</h2>
                    <table className="table w-full border-collapse  table-xs ">
                        <thead>
                        <tr>
                            <th className={ 'border  ' }>Product Name</th>
                            <th className={ 'border  ' }>Quantity</th>
                            <th className={ 'border  ' }>Price</th>
                            <th className={ 'border  ' }>Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        { Trolleys.map((item) => (
                            <tr key={ item.id }>
                                <td className={ 'border ' }>{ item.Product.name }</td>
                                <td className={ 'border ' }>{ item.qty_at_buy }</td>
                                <td className={ 'border ' }>{ toRupiah(item.price_at_buy) }</td>
                                <td className={ 'border ' }>{ toRupiah(item.qty_at_buy * item.price_at_buy) }</td>
                            </tr>
                        )) }
                        </tbody>
                    </table>
                </div>

                <div className="border-b pb-4 mb-4 ">
                    <h2 className="font-semibold text-lg mb-2">Delivery Details</h2>
                    <p><span className="font-semibold">Courier:</span> { Deliverys.name }</p>
                    <p><span className="font-semibold">Phone:</span> { Deliverys.phone }</p>
                    <p><span className="font-semibold">Type:</span> { Deliverys.type }</p>
                </div>

                <div className="border-b pb-4 mb-4 ">
                    <h2 className="font-semibold text-lg mb-2">Payment Details</h2>
                    <p><span className="font-semibold">Method:</span> { Payments.name }</p>
                    <p><span className="font-semibold">Type:</span> { Payments.type }</p>
                    <p><span className="font-semibold">Description:</span> { Payments.desc }</p>
                </div>

                <div className="flex justify-between">
                    <div className="grid grid-cols-2">
                        <div><span className="font-semibold">Subtotal:</span></div>
                        <div>
                            <span>{ toRupiah(Trolleys.reduce((total, item) => total + ( item.price_at_buy * item.qty_at_buy ), 0)) }</span>
                        </div>
                        <div className={ 'pr-5' }><span className="font-semibold">Delivery Fee:</span></div>
                        <div><span>{ toRupiah(data.priceDelivery) }</span></div>
                    </div>

                    <div className="text-end">
                        <h2 className="font-bold text-xl">Total: { toRupiah(data.totalAll) }</h2>
                        <h2 className="font-semibold text-lg">PPN: 12%</h2>
                        <h2 className="font-bold text-xl">
                            Total + PPN: { toRupiah(data.totalAll * 1.12) }
                        </h2>
                        <p className={ `text-${ toStatus(data.status) } font-semibold` }>Status: { data.status }</p>
                    </div>
                </div>

            </div>
            <div className=" flex justify-end mt-10">
                {/*@ts-ignore*/ }
                { toDateIndo(new Date()) }
            </div>
        </div>
    );
}
