'use client'
import React from "react";
import { TEmployeeDB } from "@/interface/entity/employee.model";
import { usePrint } from "@/hook/usePrint";
import { Printer } from "lucide-react";
import { EmployeeUpdateStatus } from "@/app/admin/employee/components/EmployeeUpdateStatus";
import { InterviewShowDocument } from "@/app/components/Letter/interviewShowDocument";
import { EmployeeCVGlobal } from "@/app/components/Letter/cv/EmployeeCVGlobal";

export function EmployeeCVAdmin({ employee }: { employee: TEmployeeDB }) {
    const { isPrinting, handlePrint, contentRef } = usePrint()
    return (
        <>
            <EmployeeCVGlobal employee={ employee } ref={ contentRef } />
            <div className=" print:hidden gap-2 mt-2 flex items-center">
                <button
                    onClick={ handlePrint }
                    disabled={ isPrinting }
                    className={ 'btn btn-info' }
                >
                    { isPrinting ? 'Printing...' : <Printer /> }
                </button>
                <InterviewShowDocument employee={ employee } />
                <EmployeeUpdateStatus employee={ employee } />
            </div>
        </>
    );
}
