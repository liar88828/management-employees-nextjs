'use client'
import { TEmployeeDB } from "@/interface/entity/employee.model";
import { usePrint } from "@/hook/usePrint";
import { Printer } from "lucide-react";
import React from "react";
import { EmployeeCVGlobal } from "@/app/components/Letter/cv/EmployeeCVGlobal";

export default function EmployeeInterviewCVUser({ employee }: { employee: TEmployeeDB }) {
    const { isPrinting, handlePrint, contentRef } = usePrint()
    return (
        <div ref={ contentRef }>
            <EmployeeCVGlobal employee={ employee } />
            <div className=" print:hidden gap-2 mt-2 flex items-center">
                <button
                    onClick={ handlePrint }
                    disabled={ isPrinting }
                    className={ 'btn btn-info' }
                >
                    { isPrinting ? 'Printing...' : <Printer /> }
                </button>
            </div>
        </div>
    );
}
