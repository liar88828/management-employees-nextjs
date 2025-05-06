'use client'
import { TEmployeeDB } from "@/interface/entity/employee.model";
import { XIcon } from "lucide-react";
import { EmployeeCV } from "@/app/components/Letter/cv/employeeCV";
import React from "react";

export function InterviewShowCVGlobal({ employee }: { employee: TEmployeeDB }) {
    return (
        <>
            <button
                type={ 'button' }
                className="btn btn-info" onClick={ () => {
                const modal = document.getElementById('my_modal_cv');
                if (modal instanceof HTMLDialogElement) {
                    modal.showModal();
                }
            } }
            >Show CV
            </button>
            <dialog id="my_modal_cv" className="modal">
                <div className="modal-box w-11/12 max-w-4xl bg-base-200/50">
                    <div className="flex justify-between mb-4">
                        <h1></h1>
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost "><XIcon /></button>
                        </form>
                    </div>
                    <EmployeeCV employee={ employee } />

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </ >
    );
}
