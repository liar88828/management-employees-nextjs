'use client'
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
export default function ClientProvider({ children }: { children: ReactNode }) {
    return (
        <>

            { children }
            <Toaster
                position="top-right"
            />
        </>
    );
}
