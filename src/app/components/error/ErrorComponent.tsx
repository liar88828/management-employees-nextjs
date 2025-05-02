'use client'
import React from 'react';
import { useRouter } from "next/navigation";

export function ErrorComponent({ title, description }: { title: string, description: string }) {
    const router = useRouter();
    return (
        <section className={ 'card bg-base-300 max-w-3xl' }>
            <div className="card-body ">
                <h1 className={ 'card-title' }>{ title }</h1>
                <p className={ 'text-base-content/80' }>{ description }</p>
                <div className="card-actions">
                    <button onClick={ () => router.refresh() } className={ 'btn ' }>Refresh</button>
                    <button onClick={ () => router.back() } className={ 'btn  btn-neutral ' }>Back</button>
                </div>
            </div>

        </section>
    );
}
