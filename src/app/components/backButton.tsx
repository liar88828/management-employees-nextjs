'use client'
import React from 'react';
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
    const router = useRouter()
    return (
        <button
            onClick={ () => router.back() }
            className="btn btn-ghost text-xl"
        >
            <ChevronLeft />
        </button>
    );
}
