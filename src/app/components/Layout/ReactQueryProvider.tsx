'use client'
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

function ReactQueryProvider({ children }: { children: ReactNode }) {
    return (<>
            { children }
            <Toaster
                position="top-right"
                toastOptions={ {
                    // className: '',
                    duration: 1000,
                    success: {
                        duration: 1000,
                    },
                } }
            />
        </>
    )
}

export default ReactQueryProvider;
