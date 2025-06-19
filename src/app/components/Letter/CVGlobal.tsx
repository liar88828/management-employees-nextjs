'use client'

import { modalClose, modalOpen } from "@/app/components/ui/ModalComponent";
import { nextPublicBaseUrl } from "@/config/nextPublicBaseUrl";
import { usePrint } from "@/hook/usePrint";
import { TEmployeeDB } from "@/interface/model";
import { toDateIndo } from "@/utils/toDate";
import { toPhone } from "@/utils/toPhone";
import { Printer, XIcon } from "lucide-react";
import React from "react";


export function CVEmployeeBase(
	{ employee, ref }:
	{ employee: TEmployeeDB, ref: React.Ref<HTMLDivElement> }
) {
	const imageProfile = `${ nextPublicBaseUrl }${ employee?.ImageEmployee?.photoProfile }`;
	return (
		<div ref={ ref } className="card w-full max-w-3xl bg-white shadow-lg print:shadow-none">
			<div className="card-body">
				<div className="p-6">
					<div className="flex">
						<div className="flex items-center space-x-4">
							<div className="w-20 h-20 avatar">
								<picture>
									<img
										loading="lazy"
										className="rounded-full"
										src={ imageProfile }
										alt={ employee.User.name }
									/>
								</picture>
							</div>
							<div>
								<div className="card-title sm:text-2xl text-xl">{ employee.User.name }</div>
								{/* <p className="sm:text-sm text-xs text-muted-foreground">{employee.id}</p> */ }
							</div>
						</div>
					</div>

					<div className="divider my-4"></div>

					<div className="grid gap-6 mt-2">
						<section>
							<h3 className="font-semibold mb-2">Informasi Kontak</h3>
							<div className="grid gap-2 text-sm">
								<p><strong>Email:</strong> { employee.User.email }</p>
								<p><strong>No. Telepon:</strong> { toPhone(employee.User.phone) }</p>
								<p><strong>Tanggal Lahir:</strong> { toDateIndo(employee.dateOfBirth) }</p>
								<p><strong>Alamat:</strong> { employee.address }</p>
								<p><strong>Kota:</strong> { employee.city }</p>
							</div>
						</section>

						{/* <section>
          <h3 className="font-semibold mb-2">Detail Profesional</h3>
          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            <p><strong>Tanggal Masuk:</strong> {toDateIndo(employee.hireDate)}</p>
            <p><strong>Posisi/Jabatan:</strong> {employee.jobTitle}</p>
          </div>
        </section> */ }
					</div>

					{/*<div className="divider my-1"></div>*/ }

					<div className="grid gap-4 mt-5">
						<section>
							<h3 className="font-semibold mb-2">Riwayat Pendidikan</h3>
							<ul className="list-decimal list-inside text-sm space-y-1">
								{ employee.Educations && employee.Educations.map(({ text }, index) => (
									<li key={ index }>{ text }</li>
								)) }
							</ul>
						</section>

						<section className="mt-2">
							<h3 className="font-semibold mb-2">Keahlian Kerja</h3>
							<ul className="list-decimal list-inside text-sm space-y-1">
								{ employee.Skills && employee.Skills.map(({ text }, index) => (
									<li key={ index }>{ text }</li>
								)) }
							</ul>
						</section>

						<section className="mt-2">
							<h3 className="font-semibold mb-2">Pengalaman Kerja</h3>
							<ul className="list-decimal list-inside text-sm space-y-1">
								{ employee.Experiences && employee.Experiences.map(({ text }, index) => (
									<li key={ index }>{ text }</li>
								)) }
							</ul>
						</section>
					</div>
				</div>
			</div>
		</div>

	);
}

export function UserEmployeeCVModal({ employee }: { employee: TEmployeeDB | null }) {
	const { isPrinting, handlePrint, contentRef } = usePrint()
	const keyModal = `my_modal_cv_${ employee?.id }`;
	const titleButton = 'Show CV'
	const title = `CV ${ employee?.User.name }`

	if (!employee) {
		return <button type={ 'button' } className="btn btn-info btn-disabled"
			// onClick={ () => modalOpen(keyModal) }
		>
			{ titleButton }
		</button>
	}

	return (
		<>
			<button type={ 'button' }
			        className="btn btn-info"
			        onClick={ () => modalOpen(keyModal) }
			>
				{ titleButton }
			</button>
			{/*modal-bottom sm:modal-middle */ }
			<dialog id={ keyModal } className="modal ">
				<div className="modal-box w-full max-w-3xl bg-base-200 ">
					<div className="flex justify-between mb-4">
						<h1>{ title }</h1>
						<button
							className="btn btn-sm  btn-ghost btn-circle "
							onClick={ () => modalClose(keyModal) }
						>
							<XIcon />
						</button>
					</div>
					<div className="overflow-y-scroll h-96 sm:h-fit">
						<CVEmployeeBase employee={ employee } ref={ contentRef } />
					</div>
					<div className="modal-action">
						<button
							onClick={ handlePrint }
							disabled={ isPrinting }
							className={ 'btn btn-info' }
						>
							{ isPrinting ? 'Printing...' : <><Printer /> PDF </> }
						</button>
						<button
							onClick={ () => modalClose(keyModal) }
							className={ 'btn btn-neutral' }
						>
							Close
						</button>
					</div>
				</div>

				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</ >
	);
}

export function CVEmployeePrint({ employee }: { employee: TEmployeeDB }) {
	const { isPrinting, handlePrint, contentRef } = usePrint()
	return (
		<div>
			<CVEmployeeBase employee={ employee } ref={ contentRef } />
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
