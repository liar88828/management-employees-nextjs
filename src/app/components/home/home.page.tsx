import React from "react";

export function CategoryList(props: {
    onClick: () => void,
    item: { icon: React.JSX.Element; title: string }
}) {
    return (
        <button
        onClick={ props.onClick }
        className="border shadow p-5 bg-base-200/40 rounded-2xl flex items-center flex-col gap-2 "
    >
        <div className="">
            { props.item.icon }
        </div>

            <h2 className={ "~text-base/xl font-bold" }>
                { props.item.title }
            </h2>
        </button>
    );
}
