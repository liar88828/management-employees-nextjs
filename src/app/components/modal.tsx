'use client'
import React, { useState } from 'react';

export function Modal(
    {
        children,
        buttonText,
    }: {
        children: React.ReactNode
        buttonText: React.ReactNode
    }) {
    return (
        <>
            <button
                className="btn"
                onClick={ () => ( document.getElementById('my_modal_2') as HTMLDialogElement ).showModal() }
            >open modal
            </button>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click outside to close</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}

function onModalOpen(title: string) {
    ( document.getElementById(`my_modal_${ title }`) as HTMLDialogElement ).showModal()
}

function onModalClose(title: string) {
    ( document.getElementById(`my_modal_${ title }`) as HTMLDialogElement ).close()
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
                    onModalOpen(title);
                    setOpen(true)
                } }
            >
                { buttonText }
            </button>
            <dialog id={ `my_modal_${ title }` }
                    className="modal"
            >
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="capitalize font-bold text-lg">{ title.replaceAll('_', ' ') }</h3>
                    { open && children }
                    <div className="modal-action">
                        <button
                            type={ `button` }
                            className="btn "
                            onClick={ () => {
                                onModalClose(title);
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
