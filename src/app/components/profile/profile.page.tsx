import Link from "next/link";
import React from "react";
import { LogOut, Settings } from "lucide-react";
import { Users } from "@prisma/client";
import { logout } from "@/server/lib/state";

export function ProfileUserPage(props: {
    children: React.ReactNode;
    user: Users
}) {
    return (
        <div className="card card-compact bg-base-300">
            <div className="card-body">
                <div className="justify-between flex">
                    <h2 className="card-title">{ props.user.name }</h2>
                    <div className=" flex gap-5 items-center">
                        <Link href={ "/profile/setting" } className="btn  btn-square btn-sm ">
                            <Settings />
                        </Link>

                        <form action={ logout }>
                            <button className="btn  btn-square btn-sm btn-error">
                                <LogOut />
                            </button>
                        </form>

                    </div>
                </div>

                <div className="flex gap-2">
                    <p>{ props.user.email }</p>
                    <p>{ props.user.phone }</p>
                </div>
                <div className="pb-2">
                    <p className={ "text-base-content/50 ~text-xs/base" }>
                        { props.user.address }
                    </p>
                </div>
                <div className="flex gap-10 justify-end">
                    { props.children }
                </div>
            </div>
        </div>
    );
}

export function ProfileStatusCountPage(props: {
    countStatus: number,
    onStatusAction: () => void,
    isStatus: boolean,
    children: React.ReactNode
}) {

    return (
        <div className="indicator">
            <span className="indicator-item badge badge-neutral  indicator-start">
                { props.countStatus }
            </span>
            <button
                data-testid="ProfileStatusCountPage-action"
                onClick={ props.onStatusAction }
                className={ `btn btn-square ${ props.isStatus && "btn-active" }` }
            >
                { props.children }
            </button>
        </div>
    );
}
