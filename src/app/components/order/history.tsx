import { THistoryOrder } from "@/interface/entity/transaction.model";
import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function OrderHistoryCard({ orderHistory, formPage, idPage }: {
    formPage: string,
    idPage: string
    orderHistory: THistoryOrder[]
}) {
    return (
        <div className="mt-2 pb-14">
            <h1 className={ 'text-2xl font-bold py-4' }>History</h1>
            <div className="space-y-3 overflow-y-scroll h-[80vw]">
                { orderHistory.map(history => (
                    <div key={ history.id } className={ 'card card-compact bg-base-200' }>
                        <div className="card-body">
                            <h2 className="card-title">#{ history.id }</h2>
                            <div className="flex justify-between">
                                <div className="">
                                    <p className="">{ history.address }</p>
                                    <p className="">{ history.Customers.name }</p>
                                </div>
                                <Link
                                    href={ `/invoice/${ history.id }?redirect=/admin/${ formPage }/${ idPage }` }

                                    className={ 'btn btn-neutral btn-square' }>
                                    <ArrowRight/>
                                </Link>
                            </div>
                        </div>
                    </div>
                )) }
            </div>
        </div>
    );
}
