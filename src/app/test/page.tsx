import React from 'react';
import { updateSession } from "@/server/lib/state";

async function Page() {
    const action = async (form: FormData) => {
        'use server'
        // console.log(form);
        await updateSession()
    }
    return (
        <div>
            <form action={ action }>
                <input type="text" name={ 'test' }/>
                <h1>hello</h1>
                <button className={ 'btn btn-info' }>update</button>
            </form>
        </div>
    );
}

export default Page;