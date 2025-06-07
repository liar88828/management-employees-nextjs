'use client'
import React, { useState } from 'react';
import { XIcon } from "lucide-react";

export function modalOpen(title: string) {
    ( document.getElementById(title) as HTMLDialogElement ).showModal()
}

export function modalClose(title: string) {
    ( document.getElementById(title) as HTMLDialogElement ).close()
}

export function ModalInput(
    {
        children,
        buttonText,
        title,
        active
    }: {
        active?: boolean
        children: React.ReactNode
        buttonText: React.ReactNode
        title: string
    }) {
    // console.log(title,active)

    const [ open, setOpen ] = useState(false)
    return (
        <>
            <button
                type="button"
                className={ `btn join-item  ${ active ? ' btn-info ' : '' } ` }
                onClick={ () => {
                    modalOpen(title);
                    setOpen(true)
                } }
            >
                { buttonText }
            </button>
            <dialog id={ title }
                    className="modal"
            >
                <div className="modal-box w-11/12 max-w-5xl">
                    <div className="flex justify-between">
                        <h3 className="capitalize font-bold text-lg">{ title.replaceAll('_', ' ') }</h3>
                        <button
                            type="button"
                            className={ `btn btn-circle` }
                            onClick={ () => {
                                modalClose(title);
                                setOpen(false)
                            } }
                        ><XIcon />
                        </button>
                    </div>
                    { open && children }
                    <div className="modal-action">
                        <button
                            type={ `button` }
                            className="btn "
                            onClick={ () => {
                                modalClose(title);
                                setOpen(false)
                            } }
                        >Close
                        </button>
                    </div>
                    {/*<form method="dialog" className="modal-backdrop">*/ }
                    {/*    <button>close</button>*/ }
                    {/*</form>*/ }
                </div>

            </dialog>
        </>
    );
}
