import Form from "next/form";
import React from 'react';
import { Search } from "lucide-react";

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Form action={ '/admin/order/incoming/pending' } className={ 'join mb-2 w-full sm:w-fit' }>
                <input name="search"
                       className={ 'input input-bordered join-item w-full sm:w-fit' }
                       placeholder={ 'Search...' }
                />
                <button className={ 'join-item btn btn-neutral' } type={ 'submit' }>
                    <Search />
                </button>
            </Form>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                { children }
            </div>
        </div>
    );
}

export default Layout;
