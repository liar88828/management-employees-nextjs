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
		<div ref={ ref } className="card w-full max-w-3xl bg-white shadow-lg print:shadow-none ">
			<div className="card-body">
				{/*justify-between items-center*/ }
				<div className="flex ">
					<div className="flex items-center space-x-4">
						<div className="w-20 h-20 avatar">
							<picture>
								<img
									loading="lazy"
									className="rounded-full"
									// src={ `https://api.dicebear.com/6.x/initials/svg?seed=${ employee.userName }` }
									src={ imageProfile }
									alt={ employee.User.name }
								/>
							</picture>
						</div>
						<div>
							<div className="card-title sm:text-2xl text-xl">{ employee.User.name }</div>
							<p className={ 'sm:text-sm text-xs text-muted-foreground' }>{ employee.id }</p>

						</div>
					</div>

				</div>
				<div className="divider my-1 "></div>

				<div className=" grid gap-6 mt-2">
					<section>
						<h3 className="font-semibold mb-2">Contact Information</h3>
						<div className="grid sm:grid-cols-2 gap-2 text-sm">
							<p><strong>Email:</strong> { employee.User.email }</p>
							<p><strong>Phone:</strong> { toPhone(employee.User.phone) }</p>
							<p><strong>Birth Date:</strong> { toDateIndo(employee.dateOfBirth) }</p>
							<p><strong>Address:</strong> { employee.address }</p>
							<p><strong>City:</strong> { employee.city }</p>
						</div>
					</section>

					<section>
						<h3 className="font-semibold mb-2 ">Professional Details</h3>
						<div className="grid sm:grid-cols-2 gap-2 text-sm">
							<p><strong>Hire Date :</strong> { toDateIndo(employee.hireDate) }</p>
							<p><strong>Job Title :</strong> { employee.jobTitle }</p>
						</div>

					</section>
				</div>
				<div className="divider my-1 "></div>
				<div className="grid sm:grid-cols-2">
					<section>
						<h3 className="font-semibold mb-2">Education</h3>
						<ul className="list-disc list-inside text-sm">
							{ employee.Educations && employee.Educations.map(({ text }, index) => (
								<li key={ index }>{ text }</li>
							)) }
						</ul>
					</section>
					<section className={ ' mt-2 sm:mt-0' }>
						<h3 className="font-semibold mb-2">Skills</h3>
						<ul className="list-disc list-inside text-sm">
							{ employee.Skills && employee.Skills.map(({ text }, index) => (
								<li key={ index }>{ text }</li>
							)) }
						</ul>
					</section>
				</div>

			</div>
		</div>

	);
}

export function UserEmployeeCVModal({ employee }: { employee: TEmployeeDB | null }) {
	const { isPrinting, handlePrint, contentRef } = usePrint()

	if (!employee) {
		return <button type={ 'button' } className="btn btn-info btn-disabled"
			// onClick={ () => modalOpen(keyModal) }
		>
			Show CV
		</button>
	}
	const keyModal = `my_modal_cv_${ employee.id }`;

	return (
		<>
			<button type={ 'button' }
			        className="btn btn-info"
			        onClick={ () => modalOpen(keyModal) }
			>
				Show CV
			</button>
			{/*modal-bottom sm:modal-middle */ }
			<dialog id={ keyModal } className="modal ">
				<div className="modal-box w-full max-w-3xl bg-base-200 ">
					<div className="flex justify-between mb-4">
						<h1>CV { employee.User.name }</h1>
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

export function CVEmployeeUser({ employee }: { employee: TEmployeeDB }) {
	const { isPrinting, handlePrint, contentRef } = usePrint()
	return (
		<div>
			<CVEmployeeBase
				employee={ employee }
				ref={ contentRef }
			/>
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
