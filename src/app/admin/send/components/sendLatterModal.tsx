'use client'
import { Companys } from "@/assets/company";
import { EmployeeUserClient } from "@/interface/entity/employee.model";
import { LetterForm } from "@/assets/letter";
import { LetterInterview } from "@/app/components/Letter/Interview";
import React from "react";

export function SendLatterModal(
    { keys, employee, company, letter }: {
        keys: string,
        company: Companys,
        employee: EmployeeUserClient,
        letter: LetterForm
    }) {
    return ( <>
            {/* Open the modal using document.getElementById('ID').showModal() method */ }
            <button className="btn btn-info"
                    onClick={ () => ( document.getElementById(`my_modal_latter_${ keys }`) as HTMLDialogElement ).showModal() }
            >Detail
            </button>
            <dialog id={ `my_modal_latter_${ keys }` } className="modal ">
                <div className="modal-box w-11/12 max-w-5xl bg-base-200/50">
                    <div className=" flex justify-center">
                        <LetterInterview employee={ employee } company={ company } form={ letter } />
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>

    );
}
