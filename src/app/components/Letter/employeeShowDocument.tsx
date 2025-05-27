'use client'
import { photoKtp, TEmployeeDB } from "@/interface/entity/employee.model";
import { XIcon } from "lucide-react";
import { EmployeePhotos } from "@/app/components/employee/employeePhotos";
import React, { useState } from "react";
import { url_fastapi } from "@/config/nextPublicBaseUrl";
import Image from "next/image";

export function EmployeeShowDocumentSingle({ imageUrl, title }: { imageUrl?: string | null, title: string }) {
    const [ open, setOpen ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const isPhotoData = imageUrl ? `${ url_fastapi }${ imageUrl }` : photoKtp

    if (!imageUrl) {
        return <button
            type={ 'button' }
            className="btn btn-info btn-disabled"
            onClick={ () => {
                const modal = document.getElementById(`my_modal_document_${ title }`)
                if (modal instanceof HTMLDialogElement) {
                    modal.showModal();
                }
            } }
        >
            { title }
        </button>
    }

    return (
        <>
            <button
                className="btn btn-info"
                onClick={ () => {
                    const modal = document.getElementById(`my_modal_document_${ title }`)
                    if (modal instanceof HTMLDialogElement) {

                        modal.showModal();
                        setOpen(true)
                    }
                } }
            >
                { title }
            </button>
            <dialog id={ `my_modal_document_${ title }` } className="modal">
                <div className="modal-box w-11/12 max-w-4xl bg-base-200/50">
                    <div className="flex justify-end mb-4">
                        <button
                            type="button"
                            onClick={ () => {
                                const modal = document.getElementById(`my_modal_document_${ title }`)
                                if (modal instanceof HTMLDialogElement) {

                                    modal.close();
                                    setOpen(false)
                                }
                            } }
                            className="btn btn-sm btn-circle btn-ghost "
                        ><XIcon /></button>
                    </div>
                    <div className="card card-body  bg-white items-center sm:items-start max-w-4xl">
                        <h3 className="card-title">{ title }</h3>
                        <div className="flex justify-center">
                            { open &&
                                <picture>
                                    <Image
                                        // decoding="async"
                                        unoptimized
                                        quality={ 80 }
                                        loading={ 'lazy' }
                                        // priority={true}
                                        onLoad={ () => setLoading(false) }
                                        src={ isPhotoData }
                                        alt={ `image ${ title }` }
                                        width={ 300 }
                                        height={ 400 }
                                        // placeholder="blur"
                                        // className={ 'w-full h-auto' }
                                        style={ {
                                            width: '100%',
                                            height: 'auto',
                                        } }
                                    />
                                    { loading && <span>Loading...</span> }
                                </picture>
                            }
                        </div>
                    </div>
                </div>
                {/*<form method="dialog" className="modal-backdrop">*/ }
                {/*    <button>close</button>*/ }
                {/*</form>*/ }
            </dialog>
        </>
    );
}

export function EmployeeShowDocument({ employee }: { employee: TEmployeeDB | null }) {
    return ( <>
            <EmployeeShowDocumentSingle imageUrl={ employee?.photoKtp } title={ 'Open KTP' } />
            <EmployeeShowDocumentSingle imageUrl={ employee?.photoIjazah } title={ 'Open Ijazah' } />
        </>
    )
}

export function EmployeeShowDocument_xx({ employee }: { employee: TEmployeeDB | null }) {

    const [ open, setOpen ] = useState(false)
    if (!employee) {
        return <button
            type={ 'button' }
            className="btn btn-info btn-disabled"
            onClick={ () => {
                const modal = document.getElementById('my_modal_document_print')
                if (modal instanceof HTMLDialogElement) {
                    modal.showModal();
                }
            } }
        >
            Show Document
        </button>
    }
    const disabledButton = employee.photoKtp === null || employee.photoIjazah === null;
    return (
        <>
            <button
                disabled={ disabledButton }
                className="btn btn-info"
                onClick={ () => {
                    const modal = document.getElementById('my_modal_document_print')
                    if (modal instanceof HTMLDialogElement) {

                        modal.showModal();
                        setOpen(true)
                    }
                } }
            >
                Show Document
            </button>
            <dialog id="my_modal_document_print" className="modal">
                <div className="modal-box w-11/12 max-w-4xl bg-base-200/50">
                    <div className="flex justify-end mb-4">
                        <button
                            type="button"
                            onClick={ () => {
                                const modal = document.getElementById('my_modal_document_print')
                                if (modal instanceof HTMLDialogElement) {

                                    modal.close();
                                    setOpen(false)
                                }
                            } }
                            className="btn btn-sm btn-circle btn-ghost "
                        ><XIcon /></button>
                    </div>
                    { open &&
                        <EmployeePhotos employee={ employee }
                        />
                    }
                </div>
                {/*<form method="dialog" className="modal-backdrop">*/ }
                {/*    <button>close</button>*/ }
                {/*</form>*/ }
            </dialog>
        </>
    );
}
