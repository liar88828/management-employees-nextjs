import { TEmployeeDB } from "@/interface/entity/employee.model";
import { usePrint } from "@/hook/usePrint";
import { Printer } from "lucide-react";
import React from "react";
import { EmployeeCVPageClient } from "@/app/components/Letter/cv/employeeCVPageClient";
export default function EmployeeInterviewCVUser({ employee }: { employee: TEmployeeDB }) {
    const { isPrinting, handlePrint, contentRef } = usePrint()
    return (
        <div ref={ contentRef }>
            <EmployeeCVPageClient employee={ employee } />
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
