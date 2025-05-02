import Form from "next/form";
import { SearchIcon } from "lucide-react";
import React from "react";
export default function PositionDetailSearch(
    { position, search }: { position: string, search: string }
) {
    return (
        <div className="flex justify-between gap-4">
            <h1 className={ 'my-title' }>Detail Position : { position }</h1>
            <div className="flex gap-4">
                <Form action={ '/admin/position' }
                      className={ 'join ' }
                >
                    <input type="search"
                           className={ 'input input-bordered join-item ' }
                           defaultValue={ search }
                           name={ 'search' }
                           placeholder={ 'Name Employee ....' }
                    />
                    <input type="hidden"
                           defaultValue={ position }
                           name={ 'position' }
                    />
                    <button
                        className={ 'btn join-item' }
                        type="submit"
                    >
                        <SearchIcon />
                    </button>
                </Form>

                {/*<details className="dropdown">*/ }
                {/*    <summary className="btn m-1">Select Position</summary>*/ }
                {/*    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">*/ }
                {/*        <li>*/ }
                {/*            <Link href={ `/admin/position?search=${ search }&positions=` }*/ }
                {/*            >Select Position</Link>*/ }
                {/*        </li>*/ }
                {/*        { positions.map((item) => (*/ }
                {/*            <li key={ item.id }>*/ }
                {/*                <Link href={ `/admin/position?search=${ search }&positions=${ item.position }` }*/ }
                {/*                >{ item.position }</Link>*/ }
                {/*            </li>*/ }
                {/*        )) }*/ }
                {/*    </ul>*/ }
                {/*</details>*/ }

            </div>

            {/*<Link href={ '/admin/position/create' } className={ 'btn btn-info ' }>*/ }
            {/*    Add Position <PlusIcon />*/ }
            {/*</Link>*/ }
        </div>
    );
}
