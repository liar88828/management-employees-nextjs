import { toDateIndo } from "@/utils/toDate";
import { exampleCompany } from "@/assets/company";
import { TEmployeeDB } from "@/interface/model";
import React from "react";

export default function JobApplication(
	{ employee, contentRef }:
	{ employee: TEmployeeDB, contentRef: React.Ref<HTMLDivElement> }
) {
	const company = exampleCompany
	return (
		<div ref={ contentRef } className=" bg-white text-black shadow-lg card w-[210mm] h-[297mm] ">
			<div className="card-body">
				<div className="p-6">
					<h2 className="text-center text-3xl font-bold mb-6">Surat Lamaran Kerja</h2>
					<p className="text-right  mb-4">{ employee.city }, { toDateIndo(employee.hireDate) }</p>
					<div className="mb-4">
						{/*mt-4 font-semibold*/ }
						<p className="">Hal: Lamaran Kerja</p>
					</div>
					<div className="mb-4">
						<p>Kepada Yth,</p>
						{/*<p>Manager Personalia</p>*/ }
						<p>{ company.name }</p>
						<p>{ company.address }</p>
						<br />
					</div>
					<div className="mb-4">
						<p>Dengan hormat,</p>
						<p className="mt-4 text-justify">
							Sesuai dengan iklan lowongan pekerjaan dari { company.name },
							Perusahaan Bapak/Ibu membuka lowongan pekerjaan di bidang { employee.jobTitle }. Melalui
							surat lamaran ini, saya ingin mengajukan diri untuk melamar di instansi
							yang Bapak/Ibu pimpin guna mengisi posisi yang dibutuhkan saat ini.
						</p>
						<div className="mt-10">
							<p>Adapun data diri saya sebagai berikut:</p>
							<ol className="list-disc list-inside ml-6 mt-2 ">
								<li>Nama: { employee.User.name }</li>
								<li>Tempat/Tanggal Lahir: { toDateIndo(employee.dateOfBirth) }</li>
								<li>Nomor Telepon (HP): { employee.User.phone }</li>
								<li>Alamat: { employee.address }</li>
							</ol>
						</div>
						{/*<p className="mt-4">*/ }
						{/*	Saya dalam kondisi sehat jasmani dan rohani, serta lancar berbahasa Inggris secara lisan dan tertulis. Saya memiliki pengalaman kerja selama { employee.experience } tahun sebagai { employee.jobTitle}.*/ }
						{/*</p>*/ }
						<div className="mt-10">
							<p className=" text-justify">
								Berikut ini saya lampirkan beberapa surat keterangan yang sekiranya dapat
								dijadikan bahan pertimbangan oleh Bapak/Ibu pimpinan:

							</p>
							<ol className="list-decimal list-inside mt-2 ml-6">
								{/*<li>Daftar Riwayat Hidup</li>*/ }
								<li>Surat lamaran pekerjaan;</li>
								<li>Daftar Riwayat hidup;</li>
								<li>Fotokopi ijazah</li>
								<li>Fotokopi sertifikat kursus/pelatihan</li>
								<li>Fotokopi SKCK;</li>
								<li>Pas foto berukuran 3x4.</li>
							</ol>
						</div>

						<p className="mt-10 text-justify">
							Demikian surat lamaran pekerjaan ini saya buat dengan sebenar-benarnya dan
							sejujur-jujurnya. Atas perhatian Bapak/Ibu pimpinan, saya mengucapkan
							terima kasih.
						</p>
						<p className="mt-10">Hormat saya,</p>
						<p className="mt-10">{ employee.User.name }</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export function JobApplicationLetter() {
	return (
		<div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-2xl text-gray-800">
			<div className="text-right mb-4">Tangerang, 7 Agustus 2023</div>

			<div className="mb-4">
				<p>Lampiran: Enam lembar</p>
				<p>Hal: Lamaran pekerjaan</p>
			</div>

			<div className="mb-4">
				<p>Yth.</p>
				<p>Kepala CV Chandra Putra Jaya (CPJ)</p>
				<p>Surabaya, Jawa Timur</p>
			</div>

			<div className="mb-4">
				<p>Dengan Hormat,</p>
				<p className="mt-2">
					Berdasarkan informasi yang saya peroleh melalui website <em>loker.id</em>,
					Perusahaan Bapak/Ibu membuka lowongan pekerjaan di bidang admin. Melalui
					surat lamaran ini, saya ingin mengajukan diri untuk melamar di instansi
					yang Bapak/Ibu pimpin guna mengisi posisi yang dibutuhkan saat ini. Saya
					yang bertanda tangan di bawah ini:
				</p>
				<ul className="list-disc list-inside mt-2">
					<li>nama: Kenisha Nindhyatyas Nugroho</li>
					<li>alamat: Jalan Jenderal Sudirman</li>
					<li>tempat dan tanggal lahir: Jakarta, 15 Juni 2002</li>
					<li>pendidikan terakhir: SMA</li>
					<li>nomor telepon: 081267549899</li>
				</ul>
			</div>

			<div className="mb-4">
				<p>
					Berikut ini saya lampirkan beberapa surat keterangan yang sekiranya dapat
					dijadikan bahan pertimbangan oleh Bapak/Ibu pimpinan:
				</p>
				<ol className="list-decimal list-inside mt-2">
					<li>surat lamaran pekerjaan;</li>
					<li>daftar Riwayat hidup;</li>
					<li>fotokopi KTP;</li>
					<li>fotokopi ijazah;</li>
					<li>fotokopi SKCK;</li>
					<li>pasfoto berukuran 3x4.</li>
				</ol>
			</div>

			<div className="mb-4">
				<p>
					Demikian surat lamaran pekerjaan ini saya buat dengan sebenar-benarnya dan
					sejujur-jujurnya. Atas perhatian Bapak/Ibu pimpinan, saya mengucapkan
					terima kasih.
				</p>
			</div>

			<div className="text-right mt-8">
				<p>Hormat saya,</p>
				<div className="mt-16">Kenisha Nindhyatyas Nugroho</div>
			</div>
		</div>
	);
}
