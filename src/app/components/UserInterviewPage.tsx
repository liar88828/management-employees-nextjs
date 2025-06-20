'use client'
import { useRouter } from "next/navigation";
import { STATUS_EMPLOYEE } from "@/interface/enum";
import toast from "react-hot-toast";
import React from "react";
import { TEmployeeDB } from "@/interface/model";


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
	        <ol className="list-decimal list-inline  ml-10">
		        <li>Surat Lamaran Pekerjaan</li>
		        <li>Riwayat hidup/CV</li>
		        <li>Fotokopi Ijazah</li>
		        <li>Fotokopi KTP</li>
		        <li>Pas foto berukuran 3x4</li>
		        <li>Cetak ID Card</li>
	        </ol>
            <div>
                <div className="flex flex-col md:flex-row gap-2">
	                {/*<IDCardEmployeePrint employee={ employee } />*/ }
	                {/*<CVEmployeePrint employee={ employee } />*/ }
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
