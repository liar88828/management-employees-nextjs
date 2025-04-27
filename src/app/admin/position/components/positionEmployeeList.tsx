import React from "react";

export function PositionEmployeeList({ title, desc }: {
    title: string,
    desc: string,
}) {
    return (
        <div className="flex ">
            <p className={ 'text-nowrap' }>{ title } : </p>
            <p className={ 'text-right' }>{ desc }</p>
        </div>
    );
}
