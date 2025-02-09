'use client'
import Link from "next/link";
import React from 'react';
import { Filter, Plus } from "lucide-react";
import { OrderTablePage } from "@/app/components/order/order.page";
import { PageEmptyData } from "@/app/components/PageErrorData";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { useDebounce } from "@/hook/useDebounce";
import { useOrder } from "@/hook/useOrder";
import { useTableStore } from "@/store/table";

export function OrderTableClientAdmin() {
    const { search: nameTable, status: statusTable } = useTableStore()
    const nameDebounce = useDebounce({ value: nameTable })
    const statusDebounce = useDebounce({ value: statusTable })
    const { getAll, useOrderInfiniteQuery } = useOrder()
    const {
        data,
        error,
        isError,
        isFetching,
        isLoading,
        status,
        targetTrigger,
    } = useOrderInfiniteQuery(
        {
            name: nameDebounce,
            status: statusDebounce,
        },
        {
            name: nameTable,
            status: statusTable
        }
    )

    if (status === 'pending' || isLoading && isFetching || !data) return <PageLoadingSpin />
    if (status === 'error' || isError || error) return <PageEmptyData page={ 'Payment User' } />
    const datas = data.pages.flatMap(page => page.data)

    return (
        <div className="overflow-x-auto mt-2 ">
            <OrderTablePage orders={ datas } />
            { targetTrigger }
        </div>
    );
}

export function OrderSearch({ children }: { children: React.ReactNode }) {
    const { search, setSearch } = useTableStore()

    return ( <>
            <div className="flex justify-between items-center gap-2">
                <div className="join w-full ">
                    <input
                        className="input input-bordered join-item w-full"
                        onChange={ (e) => setSearch(e.target.value) }
                        placeholder="Search"
                        value={ search }
                    />

                    <button
                        className="btn join-item "
                        onClick={ () => {
                            // @ts-ignore
                            document.getElementById('my_modal_filter').showModal()
                        } }
                    >
                        <Filter />
                    </button>
                </div>

                <div className=" flex flex-nowrap gap-2">
                    {/* Open the modal using document.getElementById('ID').showModal() method */ }
                    <Link href={ '/admin/order/create' } className={ 'btn ' }>
                        <Plus />
                    </Link>
                </div>
            </div>
            { children }
        </>

    );
}

export function FilterDialog() {
    const { setStatus, data, setTableDetail, tableDetail } = useTableStore()
    return (
        <dialog id="my_modal_filter" className="modal ">
            <div className="modal-box ">
                <h3 className="font-bold text-lg mb-2">Filter</h3>

                <div className=" space-y-5">
                    <div className="">
                        <h2 className={ 'font-semibold' }>Select Status</h2>
                        <label className="">
                            <select className="select select-bordered w-full"
                                    onChange={ (e) => setStatus(e.target.value) }
                            >
                                <option value={ '' }>All</option>
                                <option value="Pending">Pending</option>
                                <option value="Fail">Fail</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <h2 className="font-semibold">Show Column</h2>
                        <div className="space-y-1">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm"
                                    checked={ tableDetail.description }
                                    onChange={ () => {
                                        setTableDetail({ description: !tableDetail.description })
                                    } }
                                />
                                <span>Description</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm"
                                    checked={ tableDetail.receiver }
                                    onChange={ () => {
                                        setTableDetail({ receiver: !tableDetail.receiver })
                                    } }
                                />
                                <span>Receiver</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm"
                                    checked={ tableDetail.payment }
                                    onChange={ () => {
                                        setTableDetail({ payment: !tableDetail.payment })
                                    } }
                                />
                                <span>Payment</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm"
                                    checked={ tableDetail.deliver }
                                    onChange={ () => {
                                        setTableDetail({ deliver: !tableDetail.deliver })
                                    } }
                                />
                                <span>Deliver</span>
                            </label>
                        </div>
                    </div>

                    <div className="font-semibold ">
                        <h2>Selected Data : { data.length }</h2>
                        <div className="space-x-2">
                            <Link href={ '/admin/order/export/excel' }
                                  className={ 'btn ' }
                            >
                                Export
                            </Link>
                            <Link href={ '/admin/order/print' }
                                  className={ 'btn btn-error' }
                            >
                                Delete
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */ }
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}
