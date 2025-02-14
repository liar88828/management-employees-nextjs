import { TEmployeeDB } from "@/interface/entity/employee.model";
import { Companys } from "@prisma/client";
import { toDateIndo } from "@/utils/toDate";

export default function JobApplication({ employee, company }: { employee: TEmployeeDB, company: Companys }) {
    return (
        <div className=" bg-white text-black shadow-lg card w-[210mm] h-[297mm] ">
            <div className="card-body">
                <h2 className="text-center text-3xl font-bold mb-6">Surat Lamaran Kerja</h2>
                <p className="text-right">{ employee.city }, { toDateIndo(new Date()) }</p>
                <p className="mt-4 font-semibold">Hal: Lamaran Kerja</p>
                <div className="">
                    <p className="mt-2">Kepada Yth,</p>
                    <p>Manager Personalia</p>
                    <p>PT { company.name }</p>
                    <p>{ company.address }</p>
                    <br/>
                </div>
                <p>Dengan hormat,</p>
                <p className="mt-4">
                    Sesuai dengan iklan lowongan pekerjaan dari PT { company.name },
                    saya mengajukan diri untuk bergabung sebagai { employee.jobTitle } di PT { employee.name }.
                </p>
                <p className="mt-4">Adapun data diri saya sebagai berikut:</p>
                <ul className="list-disc ml-6 mt-2">
                    <li>Nama: { employee.name }</li>
                    <li>Tempat/Tanggal Lahir: { toDateIndo(employee.dateOfBirth) }</li>
                    <li>Nomor Telepon (HP): { employee.phone }</li>
                    <li>Alamat: { employee.address }</li>
                </ul>
                <p className="mt-4">
                    Saya dalam kondisi sehat jasmani dan rohani, serta lancar berbahasa Inggris secara lisan dan
                    tertulis.
                    {/*Saya memiliki pengalaman kerja selama { employee.experience } tahun*/ }
                    {/*sebagai { employee.jobTitle}.*/ }
                </p>
                <p className="mt-4">Sebagai bahan pertimbangan, saya lampirkan:</p>
                <ul className="list-disc ml-6 mt-2">
                    <li>Daftar Riwayat Hidup</li>
                    <li>Fotokopi ijazah S1 dan transkrip nilai</li>
                    <li>Fotokopi sertifikat kursus/pelatihan</li>
                    <li>Pas foto terbaru</li>
                </ul>
                <p className="mt-4">
                    Besar harapan saya Bapak/Ibu bersedia memberikan kesempatan wawancara,
                    sehingga saya dapat menjelaskan lebih lanjut tentang potensi saya.
                </p>
                <p className="mt-6">Hormat saya,</p>
                <p className="mt-2">{ employee.name }</p>
            </div>
        </div>
    );
}
