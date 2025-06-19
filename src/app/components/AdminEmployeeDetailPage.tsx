'use client'
import { updateStatus } from "@/action/admin-employee-action";
import { CVEmployeeBase, UserEmployeeCVModal } from "@/app/components/Letter/CVGlobal";
import { ImageStream } from "@/app/components/ui/imageStream";
import { modalClose, modalOpen } from "@/app/components/ui/ModalComponent";
import { url_fastapi } from "@/config/nextPublicBaseUrl";
import { usePrint } from "@/hook/usePrint";
import { StatusEmployeeList } from "@/interface/enum";
import { EmployeeUserPhotoClient, photoKtp, TEmployeeDB } from "@/interface/model";
import { Printer, XIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { EmployeeIDCardModal, EmployeeJobApplicationModal } from "@/app/components/Letter/IDCardEmployeeGlobal";


export function EmployeeShowDocumentSingle(
	{ imageUrl, title, buttonText, employee, }
	: { imageUrl?: string | null, title: string, buttonText: string, employee: EmployeeUserPhotoClient | null }) {
	const [ open, setOpen ] = useState(false)
	// const [loading, setLoading] = useState(true)

	const isPhotoData = imageUrl ? `${ url_fastapi }${ imageUrl }` : photoKtp
	const modal_key = `my_modal_document_${ title }`

	if (!imageUrl || !employee) {
		return <button
			type={ 'button' }
			className="btn btn-info btn-disabled"
			onClick={ () => modalOpen(modal_key) }
		>
			{ buttonText }
		</button>
	}

	return (
		<>
			<button
				className="btn btn-info"
				onClick={ () => {
					modalOpen(modal_key)
					setOpen(true)
				} }
			>
				{ buttonText }
			</button>
			<dialog id={ modal_key } className="modal">
				<div className="modal-box w-11/12 max-w-4xl space-y-4">
					<div className="flex justify-between">
						<h3 className="card-title">{ title }</h3>
						<button
							type="button"
							onClick={ () => {
								modalClose(modal_key)
								setOpen(false)
							} }
							className="btn btn-sm btn-circle "
						><XIcon />
						</button>
					</div>

					<div className="flex justify-center">
						{ open &&
							<picture>
								<ImageStream
									imgPass={ employee.User.imgPass }
									filename={ isPhotoData }
									classNames={ 'w-full h-auto' }
								/>
							</picture>
						}
					</div>
					<div className="flex justify-end">
						<button
							type="button"
							onClick={ () => {
								modalClose(`my_modal_document_${ title }`)
								setOpen(false)
							} }
							className="btn "
						>
							Close
						</button>
					</div>
				</div>

			</dialog>
		</>
	);
}

export function AdminEmployeeDetailPage({ employee }: { employee: TEmployeeDB }) {
	const { isPrinting, handlePrint, contentRef } = usePrint()
	return (
		<>
			<CVEmployeeBase employee={ employee } ref={ contentRef } />
			<div className=" print:hidden gap-2 mt-2 flex items-center">
				<button
					onClick={ handlePrint }
					disabled={ isPrinting }
					className={ 'btn btn-info' }
				>
					{ isPrinting ? 'Printing...' : <Printer /> }
				</button>
				<UserEmployeeCVModal employee={ employee } />
				<UserEmployeeDocumentModal employee={ employee } />
				<EmployeeIDCardModal employee={ employee } />
				<EmployeeJobApplicationModal employee={ employee } />
				<EmployeeUpdateStatus employee={ employee } />
			</div>
		</>
	);
}

export function UserEmployeeDocumentModal({ employee }: { employee: EmployeeUserPhotoClient | null }) {

	return ( <>
			<EmployeeShowDocumentSingle employee={ employee }
			                            imageUrl={ employee?.ImageEmployee?.photoKtp }
			                            title={ `KTP ${ employee?.User.name }` }
			                            buttonText={ 'Show KTP' }
			/>

			<EmployeeShowDocumentSingle employee={ employee }
			                            imageUrl={ employee?.ImageEmployee?.photoIjazah }
			                            title={ `Ijazah ${ employee?.User.name }` }
			                            buttonText={ 'Show Ijazah' }
			/>
		</>
	)
}

export function EmployeeUpdateStatus({ employee }: { employee: EmployeeUserPhotoClient }) {

	const [ changePosition, setChangePosition ] = useState<string>(employee.statusEmployee)

	const onSubmit = async () => {
		const response = await updateStatus(employee, changePosition)
		if (response.success) {
			toast.success(response.message)
		} else {
			toast.error(response.message)
		}
	}

	return (
		<>
			<button className="btn btn-info" onClick={ () => {
				const modal = document.getElementById('my_modal_position')
				if (modal instanceof HTMLDialogElement) {
					modal.showModal();
				}
			} }
			>Update Status
			</button>
			<dialog id="my_modal_position" className="modal">
				<div className="modal-box w-11/12 max-w-4xl">
					<div className="flex justify-between mb-4">
						<h1 className={ 'card-title' }>Change Status Employee : { changePosition }</h1>
						<form method="dialog">
							<button className="btn btn-sm btn-circle btn-ghost "><XIcon /></button>
						</form>
					</div>
					<div className="space-x-4 mt-4">
						<select className="select select-bordered join-item w-fit"
						        defaultValue={ employee.statusEmployee }
						        name={ 'status' }
						        onChange={ (e) => {
							        setChangePosition(e.target.value)
						        } }
						>
							<option disabled value={ '' }>Filter</option>
							{/*<option value={ '' }>All</option>*/ }
							{ StatusEmployeeList.map(item => (
								<option key={ item }>{ item }</option>
							)) }
						</select>
						<button
							className={ 'btn btn-success ' }
							onClick={ () => onSubmit() }
						>
							Change
						</button>
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</>
	);
}
