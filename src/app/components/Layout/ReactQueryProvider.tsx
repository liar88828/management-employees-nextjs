'use client'
import { QueryClientProvider, } from '@tanstack/react-query'
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "@/app/components/Layout/ReactQueryProvider.server";

function ReactQueryProvider({ children }: { children: ReactNode }) {
    // const isDarkTheme = useThemeDetector()
    const queryClient = getQueryClient()
    return (
        <QueryClientProvider client={ queryClient }>
            { children }
            <Toaster
                position="top-right"
                toastOptions={ {
                    className: '',
                    duration: 1000,
                    success: {
                        duration: 1000,
                    },
                } }
            />
            <ReactQueryDevtools initialIsOpen={ false } />
        </QueryClientProvider>

    )
}

export default ReactQueryProvider;
