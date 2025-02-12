import React from "react";
import { Companys, Employees } from "@prisma/client";
import { LatterForm } from "@/assets/latter";

export function LatterInterview(props: {
    company: Companys,
    employee: Employees,
    form: LatterForm
}) {
    return (
        <div className="flex items-center justify-center">
            <div className=" bg-white shadow-lg card">
                <div className=" card-body">
                    {/* Company Letterhead */ }
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center">
                            <img src={ props.company.img } alt="logo"
                                 className={ 'size-20 m-2' }
                            />
                            <div>
                                <h1 className="text-2xl font-bold">{ props.company.name }</h1>
                                <p className="text-sm text-gray-600">{ props.company.address }</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600">Telp: { props.company.phone }</p>
                            <p className="text-sm text-gray-600">Email: { props.company.email }</p>
                        </div>
                    </div>

                    {/* Date */ }
                    <div className="mb-8">
                        <p className="text-right">
                            Jakarta, { new Date().toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        }) }
                        </p>
                    </div>

                    {/* Recipient's Address */ }
                    <div className="mb-8">
                        <p>Kepada Yth,</p>
                        <p>Sdr/i. { props.employee.name }</p>
                        <p>{ props.employee.address }</p>
                    </div>

                    {/* Subject */ }
                    <div className="mb-8">
                        <p className="font-bold">Perihal: Undangan Interview</p>
                    </div>

                    {/* Letter Body */ }
                    <div className="mb-8 space-y-4">
                        <p>Dengan hormat,</p>
                        <p>
                            Berdasarkan hasil seleksi administrasi yang telah kami lakukan, dengan ini kami mengundang
                            Saudara/i untuk mengikuti proses interview yang akan dilaksanakan pada:
                        </p>
                        <div className="pl-4">
                            <p>Hari/Tanggal : { props.form.interviewDay }, { props.form.interviewDate }</p>
                            <p>Waktu : { props.form.interviewTime }</p>
                            <p>Tempat : { props.form.interviewLocation }</p>
                            <p>Dress Code : { props.form.dressCode }</p>
                        </div>
                        <p>Mohon untuk membawa dokumen berikut:</p>
                        <ul className="list-disc pl-8">
                            <li>Curriculum Vitae (CV) terbaru</li>
                            <li>Fotokopi ijazah dan transkrip nilai terakhir</li>
                            <li>Fotokopi KTP</li>
                            <li>Pas foto terbaru ukuran 4x6 (2 lembar)</li>
                        </ul>
                        <p>
                            Jika ada perubahan atau Anda tidak dapat hadir pada waktu yang telah ditentukan, mohon
                            segera menghubungi
                            kami di nomor telepon yang tertera di atas.
                        </p>
                    </div>

                    {/* Closing */ }
                    <div className="mb-16">
                        <p>Atas perhatian dan kehadirannya, kami ucapkan terima kasih.</p>
                    </div>

                    {/* Signature */ }
                    <div className="text-right">
                        <p className="mb-16">Hormat kami,</p>
                        <p className="font-bold">{ props.form.signerName }</p>
                        <p>HRD Manager</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
