'use client'
import { useRouter } from "next/navigation";
import { STATUS_EMPLOYEE } from "@/interface/enum";
import toast from "react-hot-toast";
import { CVEmployeePrint } from "@/app/components/Letter/CVGlobal";
import React from "react";
import { TEmployeeDB } from "@/interface/model";
import { EmployeeIDCardPrint } from "@/app/components/Letter/IDCardEmployeeGlobal";


export function UserInterviewPage({ employee }: {
    employee: TEmployeeDB,
}) {
    const router = useRouter();

    if (employee.statusEmployee === STATUS_EMPLOYEE.Registration) {
        toast.error('Silakan lengkapi proses pendaftaran');
        router.push('/user');
    }

    return (
        <>
            <h1 className="text-xl font-bold">Wawancara</h1>
            <p>Silakan cetak ini untuk keperluan wawancara</p>
            <div>
                <div className="flex flex-col md:flex-row gap-2">
                    <EmployeeIDCardPrint employee={ employee } />
                    <CVEmployeePrint employee={ employee } />
                </div>
                <div>
                    <div className="divider"></div>
                    <h1>Catatan</h1>

                    <textarea
                        disabled
                        className="textarea textarea-bordered w-full"
                        defaultValue={ employee.notes }
                    ></textarea>
                </div>
            </div>
        </>
    );
}
