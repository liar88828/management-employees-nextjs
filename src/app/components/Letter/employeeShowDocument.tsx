'use client'
import { photoKtp, TEmployeeDB } from "@/interface/entity/employee.model";
import { XIcon } from "lucide-react";
import { EmployeePhotos } from "@/app/components/employee/employeePhotos";
import React, { useState } from "react";
import { url_fastapi } from "@/config/nextPublicBaseUrl";
import { ImageStream } from "@/app/components/imageStream";
import { onModalClose, onModalOpen } from "@/app/components/modal";

export function EmployeeShowDocumentSingle(
    { imageUrl, title, buttonText, employee }
    : { imageUrl?: string | null, title: string, buttonText: string, employee: TEmployeeDB | null }) {
    const [ open, setOpen ] = useState(false)
    // const [loading, setLoading] = useState(true)
    const isPhotoData = imageUrl ? `${ url_fastapi }${ imageUrl }` : photoKtp

    if (!imageUrl || !employee) {
        return <button
            type={ 'button' }
            className="btn btn-info btn-disabled"
            onClick={ () => onModalOpen(`my_modal_document_${ title }`) }
        >
            { buttonText }
        </button>
    }

    return (
        <>
            <button
                className="btn btn-info"
                onClick={ () => {
                    onModalOpen(`my_modal_document_${ title }`)
                    setOpen(true)
                } }
            >
                { buttonText }

            </button>
            <dialog id={ `my_modal_document_${ title }` } className="modal">
                <div className="modal-box w-11/12 max-w-4xl space-y-4">
                    <div className="flex justify-between">
                        <h3 className="card-title">{ title }</h3>
                        <button
                            type="button"
                            onClick={ () => {
                                const modal = document.getElementById(`my_modal_document_${ title }`)
                                if (modal instanceof HTMLDialogElement) {

                                    modal.close();
                                    setOpen(false)
                                }
                            } }
                            className="btn btn-sm btn-circle "
                        ><XIcon />
                        </button>
                    </div>

                    <div className="flex justify-center">
                        { open &&
                            <picture>
                                <ImageStream
                                    employee={ employee }
                                    filename={ isPhotoData }
                                    classNames={ 'w-full h-auto' }
                                />
                                {/*<Image*/ }
                                {/*    // decoding="async"*/ }
                                {/*    unoptimized*/ }
                                {/*    quality={80}*/ }
                                {/*    loading={'lazy'}*/ }
                                {/*    // priority={true}*/ }
                                {/*    onLoad={() => setLoading(false)}*/ }
                                {/*    src={isPhotoData}*/ }
                                {/*    alt={`image ${title}`}*/ }
                                {/*    width={300}*/ }
                                {/*    height={400}*/ }
                                {/*    // placeholder="blur"*/ }
                                {/*    // className={ 'w-full h-auto' }*/ }
                                {/*    style={{*/ }
                                {/*        width: '100%',*/ }
                                {/*        height: 'auto',*/ }
                                {/*    }}*/ }
                                {/*/>*/ }
                                {/*{loading && <span>Loading...</span>}*/ }
                            </picture>
                        }
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={ () => {
                                onModalClose(`my_modal_document_${ title }`)
                                setOpen(false)
                            } }
                            className="btn   "
                        >Close
                        </button>
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
            <EmployeeShowDocumentSingle employee={ employee }
                                        imageUrl={ employee?.photoKtp }
                                        title={ `KTP ${ employee?.User.name }` }
                                        buttonText={ 'Open KTP' }
            />

            <EmployeeShowDocumentSingle employee={ employee }
                                        imageUrl={ employee?.photoIjazah }
                                        title={ `Ijazah ${ employee?.User.name }` }
                                        buttonText={ 'Open Ijazah' }
            />
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
