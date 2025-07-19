'use client'
import { deleteEmployee, updateStatus } from "@/action/admin-employee-action";
import { UserEmployeeCVModal } from "@/app/components/Letter/CVGlobal";
import { ImageStream } from "@/app/components/ui/imageStream";
import { modalClose, modalOpen } from "@/app/components/ui/ModalComponent";
import { url_fastapi } from "@/config/nextPublicBaseUrl";
import { StatusEmployeeList } from "@/interface/enum";
import { EmployeeUserPhotoClient, photoKtp, TEmployeeDB } from "@/interface/model";
import { XIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { EmployeeIDCardModal, EmployeeJobApplicationModal } from "@/app/components/Letter/IDCardEmployeeGlobal";
import { FormProvider, useForm } from "react-hook-form";
import { adminRegistrationSchema, AdminRegistrationSchemaType } from "@/schema/admin-registration-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminRegistrationUpdateAction } from "@/action/admin-registration-action";
import { InputNum, InputNumPrice, InputSelect, InputText, InputTextArea } from "@/app/components/ui/FormComponent";
import Link from "next/link";
import { useRouter } from "next/navigation";


export function EmployeeShowDocumentSingle(
	{ imageUrl, title, buttonText, employee, }
	: { imageUrl?: string | null, title: string, buttonText: string, employee: EmployeeUserPhotoClient | null }) {
	const [ open, setOpen ] = useState(false)
	// const [loading, setLoading] = useState(true)

	const isPhotoData = imageUrl ? `${ url_fastapi }${ imageUrl }` : photoKtp
	// console.log(isPhotoData, '--------------------')
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
const router = useRouter();
	const [ message, setMessage ] = useState('')
	const [ error, setError ] = useState('')
	const methods = useForm<AdminRegistrationSchemaType>({
		resolver: zodResolver(adminRegistrationSchema),
		defaultValues: {
			id: employee.id,
			salary: employee.salary,
			jobTitle: employee.jobTitle,
			status: employee.statusEmployee,
			notes: employee.notes
		} satisfies  AdminRegistrationSchemaType
	});

	const { handleSubmit, formState: { isLoading, errors }, reset } = methods
	const onSubmit = async (data: AdminRegistrationSchemaType) => {
		const response = await adminRegistrationUpdateAction(data);
		if (response.success) {
			// reset()
			toast.success(response.message);
			setMessage(response.message)
		} else {
			toast.error(response.message);
			setError(response.message)
		}
	}

	// const {isPrinting, handlePrint, contentRef} = usePrint()
	return (
		<div className={ 'space-y-4 w-auto max-w-4xl ' }>

			<FormProvider { ...methods }>
				<form onSubmit={ handleSubmit(onSubmit) } className={ 'card max-w-4xl bg-base-200' }>

					<div className="card-body ">
						<div className="">
							<h1 className={ 'card-title' }>Detail { employee.User.name }</h1>
							<p className={ 'text-sm text-success' }>{ message }</p>
							<p className={ 'text-sm text-error' }>{ error }</p>
						</div>
						<input type="hidden" value={ employee.id } name={ 'id' } />
						<div className="grid grid-cols-2 gap-5">
							<InputText
								title={ "Nama Pekerjaan" }
								keys={ 'jobTitle' }
							/>

							<InputSelect
								keys={ 'status' }
								title={ 'Status' }
								lists={ StatusEmployeeList }
							/>

							<InputNumPrice
								title={ "Gaji" }
								keys={ "salary" }
							/>

							<InputTextArea
								keys={ 'notes' }
								title={ 'Catatan' }
							/>

						</div>
						<div className="card-actions">
							<button
								type="submit"
								disabled={ isLoading }
								className={ 'btn btn-info btn-block' }
							>
								Submit
							</button>

						</div>
					</div>

				</form>
			</FormProvider>

			<div className=" flex justify-end flex-wrap gap-4 ">
				<UserEmployeeCVModal employee={ employee } />
				<UserEmployeeDocumentModal employee={ employee } />
				<EmployeeIDCardModal employee={ employee } />
				<EmployeeJobApplicationModal employee={ employee } />
				<EmployeeDelete employee={ employee } />
				{/*<EmployeeUpdateStatus employee={employee}/>*/ }
				{/*<Link href={ '/admin/registration' } className={ 'btn' }>Back</Link>*/}
				<button onClick={()=>router.back()} className={ 'btn' }>Back</button>

			</div>

		</div>
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

export function EmployeeDelete(
	{ employee, }:
	Readonly<{ employee: TEmployeeDB | null, }>
) {
	const router = useRouter()
	const buttonTitle = "Delete Karyawan"
	const title = `ID Card ${ employee?.User.name }`
	const keyModal = `my_modal_delete_${ employee?.id }`;
	const [ isLoading, setIsLoading ] = useState(false);

	if (!employee) {
		return <button type={ 'button' }
		               disabled={ true }
		               className="btn btn-error"
		               onClick={ () => modalOpen(keyModal) }
		>
			{ buttonTitle } (Admin Acc)
		</button>
	}
	const handleDeleteEmployee = async () => {
		setIsLoading(true)
		const response = await deleteEmployee(employee)
		if (response.success) {
			toast.success(response.message)
			router.push('/admin/employee')
		} else {
			toast.error(response.message)
		}
		setIsLoading(false)
	}
	return (
		<>
			<button type={ 'button' }
			        className="btn btn-error"
			        onClick={ () => modalOpen(keyModal) }
			>
				{ buttonTitle }
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
						Apakah Anda Yakin Untuk Menghapus : { employee.User.name }
					</div>
					<div className="modal-action">
						<button
							onClick={ handleDeleteEmployee }
							disabled={ isLoading }
							className={ 'btn btn-error' }
						>
							{ isLoading ? 'Sedang Menghapus...' : "Hapus" }
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
