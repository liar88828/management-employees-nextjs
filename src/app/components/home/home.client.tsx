'use client'
import React from 'react';
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function HomeProductClientUser({ products, title, isLogin }: {
    title: 'New Product' | 'Economical' | 'Popular Product',
    products: Object[],
    isLogin: boolean
}) {
    const router = useRouter();

    return (
        <div className="card card-compact ">
            <div className="card-body">
                <div className="flex justify-between text-base-content/60">
                    <h2 className="card-title">{ title }</h2>
                    <button
                        className={ 'flex flex-nowrap items-center hover:text-info ' }
                    >
                        <h1 className={ 'text-lg' }>More</h1>
                        <ChevronRight />
                    </button>
                </div>
                <div className='flex gap-3 overflow-x-auto'>
                    { products.map((product: Object, i) => (
                        <div
                            key={ `${ i }` }
                            className={ ' flex-shrink-0 ~w-40/48 py-0.5' }
                        >

                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    );
}
