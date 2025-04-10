import Link from "next/link";
import React from "react";

export function RegistrationFirst() {
    return <div className="card card-body card-bordered bg-base-200 max-w-lg">
        <h1 className={ "card-title" }>
            Please Registration First
        </h1>
        <div className={ "card-actions" }>
            <Link
                className={ "btn btn-info" }
                href={ "/registration" }>Registration</Link>
        </div>
    </div>;
}