'use client'
import Link from "next/link";
import React, { useActionState } from "react";
import { InvoicePaper } from "@/app/components/invoice/invoice.page";
import { TOrderTransactionDB } from "@/interface/entity/transaction.model";
import { usePathname } from "next/navigation";
import { usePrint } from "@/hook/usePrint";
import { incomingActionForm } from "@/server/action/order";
import { STATUS } from "@/app/components/toStatus";
import { Pen } from "lucide-react";

export function InvoicePrintHandler({ redirectAction, order }: { redirectAction: string, order: TOrderTransactionDB }) {
    const { isPrinting, handlePrint, contentRef } = usePrint()
    const path = usePathname()

    return ( <>
            <div ref={ contentRef }>
                <InvoicePaper
                    path={ path }
                    invoice={ order }
                />
            </div>

            <div className="print:hidden mt-5 space-x-5 p-5">
                <button
                    onClick={ handlePrint }
                    disabled={ isPrinting }
                    className={ 'btn btn-info' }
                >
                    { isPrinting ? 'Printing...' : 'Print Invoice' }
                </button>
                <Link
                    href={ redirectAction }
                    hidden={ isPrinting }
                    className={ 'btn ' }
                >
                    Back
                </Link>
            </div>
        </>

    );
}

export function InvoiceCheckHandler({ redirectAction, order }: { redirectAction: string, order: TOrderTransactionDB }) {
    const { isPrinting, handlePrint, contentRef } = usePrint()
    const path = usePathname()
    const [ _state, action, isPending ] = useActionState(incomingActionForm, undefined)

    return ( <>
            <div ref={ contentRef }>
                <InvoicePaper
                    path={ path }
                    invoice={ order }
                />
            </div>

            <div className="print:hidden sm:mt-5 m-2  sm:space-x-5 p-2 sm:p-5 flex gap-5">
                <button
                    onClick={ handlePrint }
                    disabled={ isPrinting }
                    className={ 'btn btn-info' }
                >
                    { isPrinting ? 'Printing...' : 'Print' }
                </button>
                {/*<button*/ }
                {/*    // onClick={ handlePrint }*/ }
                {/*    disabled={ isPrinting }*/ }
                {/*    className={ 'btn btn-info' }*/ }
                {/*>*/ }
                {/*    */ }
                {/*</button>*/ }

                <form className="join " action={ action }>
                    <input type="hidden" name={ 'id' } value={ order.id } />
                    <select
                        name={ 'status' }
                        className="select select-bordered  max-w-xs join-item"
                    >
                        <option>{ STATUS.PENDING }</option>
                        <option>{ STATUS.COMPLETE }</option>
                        <option>{ STATUS.FAIL }</option>
                    </select>
                    <button
                        disabled={ isPending }
                        type="submit"
                        className='btn btn-square btn-neutral join-item'
                    >
                        <Pen />
                    </button>
                </form>

                <Link
                    href={ redirectAction }
                    hidden={ isPrinting }
                    className={ 'btn btn-neutral' }
                >
                    Back
                </Link>

            </div>
        </>

    );
}
