'use client'
import { modalClose, modalOpen } from "@/app/components/ui/ModalComponent";
import { exampleCompany } from "@/assets/company";
import { usePrint } from "@/hook/usePrint";
import { TEmployeeDB } from "@/interface/model";
import { toDateIndo } from "@/utils/toDate";
import { Printer, XIcon } from 'lucide-react';
import React from "react";
import JobApplication from "@/app/components/Letter/JobApplication";


export default function EmployeeIDCardGlobal(
	{ employee, contentRef }:
	Readonly<{ employee: TEmployeeDB, contentRef: React.Ref<HTMLDivElement> }>
) {
	// const { isPrinting, handlePrint, contentRef } = usePrint()
	const company = exampleCompany
	const imageProfile = employee?.ImageEmployee?.photoProfile ?? '';

	return (
		<div>
			<p>12cm x 9.5cm</p>
			<div
				className="p-2 space-y-2"
			>
				<div
					ref={ contentRef }
					// border border-black
					className=" w-[9.5cm] print:h-[13cm] print:w-[9.5cm]
                     print:shadow-none
                     bg-white rounded-lg shadow-lg overflow-hidden"
				>

					{/* Card Header */ }
					<div className="bg-blue-600 p-4 text-center">
						<h1 className="text-white text-2xl font-bold">{ company.name }</h1>
						<p className="text-blue-100">Employee Interview</p>
					</div>

					{/* Card Body */ }
					<div className="p-6">
						{/* Photo and Edit Button */ }
						<div className="flex justify-center items-center mb-6">
							<picture>
								<img
									src={ imageProfile }
									alt="Profile"
									className="w-32 h-32 rounded-lg object-cover border-2 border-gray-300"
								/>
							</picture>
						</div>

						<div className="space-y-4">
							<div className="text-4xl font-bold text-center">{ employee.User.name }</div>
							{/*<div className="text-gray-600">{employee.role}</div>*/ }
							<div className="border-t border-b border-gray-200 py-3 space-y-2">
								{/*<div className="flex justify-between">*/ }
								{/*    <span className="text-gray-500">ID:</span>*/ }
								{/*    <span className="font-medium">{employee.id}</span>*/ }
								{/*</div>*/ }
								<div className="flex justify-between">
									<span className="text-gray-500">Job:</span>
									<span className="font-medium">{ employee.jobTitle }</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-500">Join :</span>
									<span className="font-medium">{ toDateIndo(employee.createdAt) }</span>
								</div>
							</div>
						</div>
					</div>

					{/*/!* Card Footer *!/*/ }
					{/*<div className="bg-gray-50 p-4 text-center border-t border-gray-200">*/ }
					{/*    <div className="text-sm text-gray-500">*/ }
					{/*        This ID card is the property of Company Name.<br/>*/ }
					{/*        If found, please return to 123 Company Street.*/ }
					{/*    </div>*/ }
					{/*</div>*/ }
				</div>
				{/*<button*/ }
				{/*	onClick={ handlePrint }*/ }
				{/*	disabled={ isPrinting }*/ }
				{/*	className={ 'btn btn-info' }*/ }
				{/*>*/ }
				{/*	{ isPrinting ? 'Printing...' : <Printer /> }*/ }
				{/*</button>*/ }
			</div>
		</div>

	);
}

export function EmployeeIDCardModal(
	{ employee, }:
	Readonly<{ employee: TEmployeeDB | null, }>
) {

	const { isPrinting, handlePrint, contentRef } = usePrint()

	if (!employee) {
		return <button type={ 'button' }
		               disabled={ true }
		               className="btn btn-info"
		               onClick={ () => modalOpen(keyModal) }
		>
			Show ID Card
		</button>

	}

	const keyModal = `my_modal_id_card_${ employee.id }`;

	return (
		<>
			<button type={ 'button' }
			        className="btn btn-info"
			        onClick={ () => modalOpen(keyModal) }
			>
				Show ID Card
			</button>
			{/*modal-bottom sm:modal-middle */ }
			<dialog id={ keyModal } className="modal ">
				<div className="modal-box w-full max-w-3xl bg-base-200 ">
					<div className="flex justify-between mb-4">
						<h1>ID Card { employee.User.name }</h1>
						<button
							className="btn btn-sm  btn-ghost btn-circle "
							onClick={ () => modalClose(keyModal) }
						>
							<XIcon />
						</button>
					</div>
					<div className="overflow-y-scroll h-96 sm:h-fit">
						<EmployeeIDCardGlobal employee={ employee } contentRef={ contentRef } />
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

export function EmployeeJobApplicationModal(
	{ employee, }:
	Readonly<{ employee: TEmployeeDB | null, }>
) {

	const { isPrinting, handlePrint, contentRef } = usePrint()

	if (!employee) {
		return <button type={ 'button' }
		               disabled={ true }
		               className="btn btn-info"
		               onClick={ () => modalOpen(keyModal) }
		>
			Show Job Application
		</button>

	}

	const keyModal = `my_modal_job_application_${ employee.id }`;

	return (
		<>
			<button type={ 'button' }
			        className="btn btn-info"
			        onClick={ () => modalOpen(keyModal) }
			>
				Show Job Application
			</button>
			{/*modal-bottom sm:modal-middle */ }
			<dialog id={ keyModal } className="modal ">
				<div className="modal-box w-full max-w-4xl bg-base-200 ">
					<div className="flex justify-between mb-4">
						<h1>ID Card { employee.User.name }</h1>
						<button
							className="btn btn-sm  btn-ghost btn-circle "
							onClick={ () => modalClose(keyModal) }
						>
							<XIcon />
						</button>
					</div>
					<div className="overflow-y-scroll h-96 sm:h-fit">
						<JobApplication employee={ employee } contentRef={ contentRef } />
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
