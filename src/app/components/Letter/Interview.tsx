import React from "react";
import { Companys, Employees } from "@prisma/client";
import { LetterForm } from "@/assets/letter";
import Image from "next/image";
import { toDateIndo } from "@/utils/toDate";

export function LetterInterview({ company, employee, form }: {
    company: Companys,
    employee: Employees,
    form: LetterForm
}) {
    return (
        <div className=" bg-white text-black shadow-lg card w-[210mm] h-[297mm] ">
                <div className=" card-body">
                    {/* Company Letterhead */ }
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center">
                            <Image
                                width={ 100 }
                                height={ 100 }
                                src={ company.img } alt="logo"
                                className={ ' m-2' }
                            />
                            <div>
                                <h1 className="text-2xl font-bold">{ company.name }</h1>
                                <p className="text-sm ">{ company.address }</p>
                            </div>
                        </div>
                        <div className="text-right text-sm ">
                            <p>Telp: { company.phone }</p>
                            <p>Email: { company.email }</p>
                            <p>Jakarta, { toDateIndo(new Date()) }</p>
                        </div>
                    </div>

                    {/* Recipient's Address */ }
                    <div className="mb-8">
                        <p>Kepada Yth,</p>
                        <p>Sdr/i. { employee.name }</p>
                        <p>{ employee.address }</p>
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
                            <p>Hari/Tanggal : { form.interviewDay }, { form.interviewDate }</p>
                            <p>Waktu : { form.interviewTime }</p>
                            <p>Tempat : { form.interviewLocation }</p>
                            <p>Dress Code : { form.dressCode }</p>
                        </div>
                        <p>Mohon untuk membawa dokumen berikut:</p>
                        <ul className="list-disc pl-8">
                            <li>Fotokopi KTP</li>
                            <li>Curriculum Vitae (CV) terbaru</li>
                            <li>Pas foto terbaru ukuran 4x6 (2 lembar)</li>
                            <li>Fotokopi ijazah dan transkrip nilai terakhir</li>
                        </ul>
                        <p>
                            Jika ada perubahan atau Anda tidak dapat hadir pada waktu yang telah ditentukan, mohon
                            segera menghubungi
                            kami di nomor telepon yang tertera di atas.
                        </p>
                    </div>

                    {/* Closing */ }
                    <div className="mb-10">
                        <p>Atas perhatian dan kehadirannya, kami ucapkan terima kasih.</p>
                    </div>

                    {/* Signature */ }
                    <div className="text-right">
                        <p className="mb-16">Hormat kami,</p>
                        <p className="font-bold">{ form.signerName }</p>
                        <p>HRD Manager</p>
                        <p>PT. { company.name }</p>
                    </div>
                </div>
        </div>
    );
}
