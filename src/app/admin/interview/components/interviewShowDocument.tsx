'use client'
import { TEmployeeDB } from "@/interface/entity/employee.model";
import { XIcon } from "lucide-react";
import { EmployeePhotos } from "@/app/components/employee/employeePhotos";
import React from "react";

export function InterviewShowDocument({ employee }: { employee: TEmployeeDB | null }) {
    if (!employee) {
        return <button
            className="btn btn-info btn-disabled"
            onClick={ () => {
                const modal = document.getElementById('my_modal_document')
                if (modal instanceof HTMLDialogElement) {
                    modal.showModal();
                }
            } }
        >
            Show Document

        </button>
    }
    const disabledButton = employee.photoKtp !== null || employee.photoIjazah !== null;
    return (
        <>
            <button
                disabled={ disabledButton }
                className="btn btn-info"
                onClick={ () => {
                    const modal = document.getElementById('my_modal_document')
                    if (modal instanceof HTMLDialogElement) {
                        modal.showModal();
                    }
                } }
            >
                Show Document
            </button>
            <dialog id="my_modal_document" className="modal">
                <div className="modal-box w-11/12 max-w-4xl bg-base-200/50">
                    <div className="flex justify-between mb-4">
                        <h1></h1>
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost "><XIcon /></button>
                        </form>
                    </div>
                    <EmployeePhotos employee={ employee } />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}
