'use client'

import React, { useState } from 'react'
import { useReceiverStore } from "@/store/receiver";
import { TCustomersDB } from "@/interface/entity/receiver.model";
import { receiverAll } from "@/server/network/receiver";
import { Check, Plus, Search, XIcon } from "lucide-react";
import Link from "next/link";

// Mock data for the invoice
const invoiceData = {
	invoiceNumber: 'INV-001',
	date: '2023-06-15',
	dueDate: '2023-07-15',
	customerName: 'John Doe',
	customerEmail: 'john.doe@example.com',
	items: [
		{ description: 'Web Development Services', quantity: 1, unitPrice: 1000, total: 1000 },
		{ description: 'Hosting (1 year)', quantity: 1, unitPrice: 200, total: 200 },
	],
	subtotal: 1200,
	tax: 120,
	total: 1320,
}

export default function InvoicePrint() {
	const [ isPrinting, setIsPrinting ] = useState(false)

	const handlePrint = () => {
		setIsPrinting(true)
		window.print()
		setIsPrinting(false)
	}

	return (
		<div className="container mx-auto p-4 max-w-3xl ">
			<div className="mb-4 card bg-white">
				<div className="card-body">

					<div className="card-title text-2xl font-bold">Invoice #{ invoiceData.invoiceNumber }</div>
					<div className="grid grid-cols-2 gap-4 mb-4">
						<div>
							<p className="font-semibold">Date:</p>
							<p>{ invoiceData.date }</p>
						</div>
						<div>
							<p className="font-semibold">Due Date:</p>
							<p>{ invoiceData.dueDate }</p>
						</div>
					</div>
					<div className="mb-4">
						<p className="font-semibold">Customer:</p>
						<p>{ invoiceData.customerName }</p>
						<p>{ invoiceData.customerEmail }</p>
					</div>
					<table className="w-full mb-4">
						<thead>
						<tr className="border-b">
							<th className="text-left">Description</th>
							<th className="text-right">Quantity</th>
							<th className="text-right">Unit Price</th>
							<th className="text-right">Total</th>
						</tr>
						</thead>
						<tbody>
						{ invoiceData.items.map((item, index) => (
							<tr key={ index } className="border-b">
								<td>{ item.description }</td>
								<td className="text-right">{ item.quantity }</td>
								<td className="text-right">${ item.unitPrice.toFixed(2) }</td>
								<td className="text-right">${ item.total.toFixed(2) }</td>
							</tr>
						)) }
						</tbody>
					</table>
					<div className="flex justify-end">
						<div className="w-1/2">
							<div className="flex justify-between">
								<span className="font-semibold">Subtotal:</span>
								<span>${ invoiceData.subtotal.toFixed(2) }</span>
							</div>
							<div className="flex justify-between">
								<span className="font-semibold">Tax:</span>
								<span>${ invoiceData.tax.toFixed(2) }</span>
							</div>
							<div className="flex justify-between font-bold">
								<span>Total:</span>
								<span>${ invoiceData.total.toFixed(2) }</span>
							</div>
						</div>
					</div>

					<div className=" card-actions flex justify-center print:hidden">
						<button onClick={ handlePrint } disabled={ isPrinting } className={ 'btn btn-sm btn-primary ' }>
							{ isPrinting ? 'Printing...' : 'Print Invoice' }
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export function Receiver() {
    const { onReceiver, setReceiverPartial } = useReceiverStore()
    const [ receiverData, setReceiverData ] = useState<TCustomersDB[]>([])
    const [ search, setSearch ] = useState<string>('')

    const loadReceiver = async () => {
        if (receiverData.length === 0) {
            const { data } = await receiverAll({ pagination: {} })
            if (data.data.length > 0) {
                setReceiverData(data.data)
            }
        }
    }

    return (
        <div className="">
            <div className="px-2 mb-2">
                <div className="flex justify-between">
                    <h1 className="card-title">User Receiver</h1>

                    <button
                        className='btn btn-square btn-neutral'
                        onClick={ async () => {
                            await loadReceiver()
                            // @ts-ignore
                            document.getElementById('my_modal_search').showModal()
                        } }
                    >
                        <Search />
                    </button>

                    <dialog id="my_modal_search" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <div className="flex justify-between py-4">
                                <input
                                    className={ 'input input-bordered w-full' }
                                    type="text"
                                    onChange={ (e) => {
                                        setSearch(e.target.value)
                                    } }
                                    value={ search }
                                    placeholder="Search..."
                                />

                            </div>
                            <div className="space-y-2">
                                {
                                    receiverData &&
                                    receiverData
                                    .filter(receiver => receiver.name.toLowerCase().includes(search.toLowerCase()))
                                    .map((receiver) => ( <>
                                            <div key={ receiver.id }
                                                 className="flex justify-between items-center"
                                            >
                                                <div className="">
                                                    <h2 className={ 'text-xl font-bold' }>{ receiver.name }</h2>
                                                    <p className={ 'text-gray-400' }>{ receiver.phone }</p>
                                                    <p className={ 'text-gray-400' }>{ receiver.address }</p>
                                                </div>
                                                <button className={ 'btn btn-square' }
                                                        onClick={ () => setReceiverPartial(receiver) }
                                                >
                                                    <Check />
                                                </button>
                                            </div>
                                            <div className="divider"></div>
                                        </>

                                    )) }
                            </div>
                            <div className="modal-action">
                                <Link
                                    className={ 'btn btn-neutral' }
                                    href={ '/admin/receiver/create' }
                                >
                                    Create <Plus />

                                </Link>
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */ }
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
            <div className="card card-compact bg-base-200">
                <div className="card-body">
                    { !onReceiver
                        ? <div className="text-lg font-bold flex justify-between">
                            <h1>Please Add Receiver</h1>
                        </div>
                        : (
                            <div className="flex justify-between  items-center">
                                <div className="">
                                    <h2 className={ 'text-xl font-bold' }>{ onReceiver.name }</h2>
                                    <p className={ 'text-gray-400' }>{ onReceiver.phone }</p>
                                    <p className={ 'text-gray-400' }>{ onReceiver.address }</p>
                                </div>
                                <button className={ 'btn btn-square btn-neutral' }
                                        onClick={ () => setReceiverPartial(null) }
                                >
                                    <XIcon />
                                </button>
                            </div>
                        ) }
                </div>
            </div>
        </div>
    );
}
