import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import React from "react";

export function AuthLayout() {
    return (
        <div className="navbar bg-base-300/70 fixed ">
            <div className="flex-1">
                <Link
                    href={ "/public" }
                    className="btn btn-ghost text-xl btn-square "
                >
                    <ChevronLeftIcon />
                </Link>

            </div>
            <div className="flex-none">
            </div>
        </div>
    );
}
