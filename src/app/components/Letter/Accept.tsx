import type React from "react"
import { Companys, Employees } from "@prisma/client";
import { LetterForm } from "@/assets/letter";

const SuratPanggilanDiterimaKerja: React.FC<{

    company: Companys,
    employee: Employees,
    form: LetterForm

}> = ({ company, employee, form }) => {
    const currentDate = new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div className=" bg-white text-black shadow-lg card w-[210mm] h-[297mm] ">
            <div className="card-body">

                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-center mb-2">PT. { company.name }</h1>
                    <p className="text-center ">{ company.address }</p>
                    <p className="text-center ">Telp: { company.phone } |
                        Email: { company.email }</p>
                </div>

                <div className="mb-6">
                    <p className="text-right">{ currentDate }</p>
                </div>

                <div className="mb-6">
                    <p>Kepada Yth,</p>
                    <p>Sdr/i. { employee.name }</p>
                    <p>Di Tempat</p>
                </div>

                <div className="mb-6">
                    <p className="font-bold">Perihal: Surat Panggilan Diterima Kerja</p>
                </div>

                <div className="mb-6">
                    <p>Dengan hormat,</p>
                    <p className="mt-4">
                        Berdasarkan hasil seleksi yang telah dilakukan, dengan ini kami sampaikan bahwa Saudara/i telah
                        diterima untuk
                        bergabung dengan PT. { company.name } sebagai:
                    </p>
                    <p className="mt-2 font-bold">Posisi: { employee.department }</p>
                    <p className="mt-4">Kami mengundang Anda untuk hadir pada:</p>
                    <div className="mt-2 pl-4">
                        <p>Hari/Tanggal : { form.interviewDay }, { form.interviewDate }</p>
                        <p>Waktu : { form.interviewTime }</p>
                        <p>Tempat : { form.interviewLocation }</p>
                        <p>Dress Code : { form.dressCode }</p>
                    </div>
                    <p className="mt-4">Mohon membawa berkas-berkas berikut:</p>
                    <ol className="list-decimal pl-8 mt-2">
                        <li>Fotokopi KTP</li>
                        <li>Fotokopi Ijazah terakhir</li>
                        <li>Curriculum Vitae (CV) terbaru</li>
                        <li>Pas foto terbaru ukuran 4x6 (2 lembar)</li>
                    </ol>
                </div>

                <div>
                    <p>
                        Kami mengucapkan selamat atas bergabungnya Anda dengan tim kami. Kami berharap Anda dapat
                        memberikan
                        kontribusi terbaik bagi perusahaan.
                    </p>
                    <p className="mt-4">Jika ada pertanyaan, silakan hubungi kami di nomor telepon yang tertera di
                        atas.</p>
                </div>

                <div className="mt-10">
                    <p>Hormat kami,</p>
                    <p className="mt-12 font-bold">{ form.signerName }</p>
                    <p>HRD Manager</p>
                    <p>PT. { company.name }</p>
                </div>
            </div>
        </div>

    );
};

export default SuratPanggilanDiterimaKerja;
