'use client'
import React, { ReactNode } from "react";
import Link from "next/link";
import { usePrint } from "@/hook/usePrint";
import { Printer } from "lucide-react";

export function PrintComponent({ children, href }: { href?: string, children: ReactNode }) {
    const { isPrinting, handlePrint, contentRef } = usePrint()
    return (
        <div ref={ contentRef }>
            <div className=" print:hidden gap-2 mb-2 flex  items-center">
                { href && <Link href={ href } className={ 'btn btn-outline' }>Edit</Link> }
                <button
                    onClick={ handlePrint }
                    disabled={ isPrinting }
                    className={ 'btn btn-info ' }
                >
                    { isPrinting ? 'Printing...' : <>Print PDF<Printer /></> }
                </button>
            </div>
            { children }
        </div>
    );
}
