'use client'
import { adminRegistrationUpdateAction } from "@/action/admin-registration-action";
import { UserEmployeeDocumentModal } from "@/app/components/AdminEmployeeDetailPage";
import { UserEmployeeCVModal } from "@/app/components/Letter/CVGlobal";
import { InputNum, InputSelect, InputText, InputTextArea } from "@/app/components/ui/FormComponent";
import { StatusEmployeeList } from "@/interface/enum";
import { TEmployeeDB } from "@/interface/model";
import { adminRegistrationSchema, AdminRegistrationSchemaType } from "@/schema/admin-registration-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { EmployeeJobApplicationModal } from "@/app/components/Letter/IDCardEmployeeGlobal";


export function AdminRegistrationDetailPage({ employee }: { employee: TEmployeeDB }) {
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
			reset()
			toast.success(response.message);
			setMessage(response.message)
		} else {
			toast.error(response.message);
			setError(response.message)
		}
	}

	return (
		<div className={ 'space-y-4' }>
			<FormProvider { ...methods }>
				<form onSubmit={ handleSubmit(onSubmit) } className={ 'card max-w-4xl bg-base-200' }>

					<div className="card-body ">
						<div className="">
							<h1 className={ 'card-title' }>Registration { employee.User.name }</h1>
							<p className={ 'text-sm text-success' }>{ message }</p>
							<p className={ 'text-sm text-error' }>{ error }</p>
						</div>
						<input type="hidden" value={ employee.id } name={ 'id' } />
						<div className="grid grid-cols-2 gap-5">

							<InputText
								title={ "Job Title" }
								keys={ 'jobTitle' }
							/>

							<InputSelect
								keys={ 'status' }
								title={ 'Status' }
								lists={ StatusEmployeeList }
							/>

							<InputNum
								title={ "Salary" }
								keys={ "salary" }
							/>

							<InputTextArea
								keys={ 'notes' }
								title={ 'Notes' }
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
			<div className="space-x-4">
				<Link href={ '/admin/registration' } className={ 'btn' }>Back</Link>
				<UserEmployeeCVModal employee={ employee } />
				<UserEmployeeDocumentModal employee={ employee } />
				<EmployeeJobApplicationModal employee={ employee } />

			</div>
		</div>
	);
}
