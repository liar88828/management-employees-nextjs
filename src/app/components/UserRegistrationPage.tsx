'use client'
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { registrationCreateClientUser, RegistrationUserCreateClient } from "@/schema/registration-user-sanitizer";
import { zodResolver } from "@hookform/resolvers/zod";
import { setDateForm } from "@/utils/setDateForm";
import toast from "react-hot-toast";
import {
	InputDate,
	InputImage,
	InputSelect,
	InputText,
	InputTextArea,
	InputTextDynamic
} from "@/app/components/ui/FormComponent";
import { constantGender, constantWorkTime } from "@/assets/constant";
import { UploadDocument } from "@/app/components/ui/upload-document";
import { employeeUpsertUserAction, registrationFinishedState } from "@/action/user-registration-action";
import { RegistrationError } from "@/app/components/ui/ErrorComponent";
import { TEmployeeDB, UserAuth } from "@/interface/model";


export function UserRegistrationPage({ employee, method, user, type, error }: {
	user: UserAuth,
	employee: TEmployeeDB | null,
	method: "POST" | 'PUT',
	error: string,
	type: string
}) {
	// console.log(employee,'RegistrationFormClientUser')
	// const router = useRouter();
	const [ loading, setLoading ] = useState(false);
	const [ errorMessage, setErrorMessage ] = useState('');
	// const [ message, setMessage ] = useState('');
	const [ errorImage, setErrorImage ] = useState<string | undefined>()

	const methods = useForm<RegistrationUserCreateClient & {
		name: string,
		phone: string,
		email: string,
	}>({
		resolver: zodResolver(registrationCreateClientUser),
		defaultValues: {
			address: employee?.address ?? '',
			city: employee?.city ?? '',
			gender: employee?.gender ?? 'Male',
			jobTitle: employee?.jobTitle ?? '',
			postalCode: employee?.postalCode ?? '',
			workTime: employee?.workTime ?? 'Part-Time',
			skills: employee?.Skills.map((item) => ( { text: item.text ?? '' } )) ?? [ { text: '' } ],
			educations: employee?.Educations.map((item) => ( { text: item.text ?? '' } )) ?? [ { text: '(2007 - 2014) SDN Ngijo 1 ' } ],
			experiences: employee?.Experiences.map((item) => ( { text: item.text ?? '' } )) ?? [ { text: '(2020 - 2021) Bekerja di PT...' } ],
			dateOfBirth: setDateForm(employee?.dateOfBirth) ?? '',
			name: user.name,
			email: user.email,
			phone: user.phone
		} satisfies RegistrationUserCreateClient
	});

	const { handleSubmit, formState: { errors, isLoading }, watch, setValue, reset } = methods
	// const { clear } = useFormPersist("form-registration-user", { watch, setValue });

	const onSubmit = async (data: any) => {
		setLoading(true);
		setErrorImage(undefined)
		setErrorMessage('')
		const response = await employeeUpsertUserAction(data, user, employee?.id);
		if (response.success) {
			// clear()
			// reset()
			toast.success(response.message);
			// setMessage(response.message)
			setLoading(false);

		} else {
			toast.error(response.message);
			setErrorMessage(response.message)
			setLoading(false);

		}
		setLoading(false);
	}

	// const actionRegistrationFinished = registrationFinishedAction.bind(null, { userId: user.id })

	async function onComplete() {
		setLoading(true);
		const response = await registrationFinishedState({ userId: user.id })
		if (response.success) {
			toast.success(response.message);
		} else {
			toast.error(response.message);
		}
		setLoading(false);
	}

	return (
		<div className={ 'card bg-base-200' }>
			<div className="card-body ">
				<div className="">
					<h1 className={ 'card-title' }>Registration User </h1>
					<p className={ 'text-error text-sm' }>{ errorMessage }</p>
					{/*<p className={ 'text-success text-sm' }>{ message }</p>*/ }
				</div>
				<div className="flex flex-col gap-5">
					{ error && type === 'form' && <RegistrationError error={ error } /> }
					<FormProvider { ...methods }>
						<form onSubmit={ handleSubmit(onSubmit) } className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<InputText title={ 'name' } keys={ 'name' } isDisable={ false } />
								<InputText title={ 'email' } keys={ 'email' } isDisable={ true } />
								<InputText title={ 'phone' } keys={ 'phone' } isDisable={ false } />
								<InputSelect keys={ 'gender' } title={ 'gender' } lists={ constantGender } />
								<InputDate keys={ 'dateOfBirth' } title={ 'Date Birth' } />
								<InputText title={ 'Job Title' } keys={ 'jobTitle' } />
								<InputTextArea title={ 'address' } keys={ 'address' } />
								<InputText title={ 'city' } keys={ 'city' } />
								<InputText title={ 'postal code' } keys={ 'postalCode' } />
								<InputSelect keys={ 'workTime' } title={ 'Work Time' } lists={ constantWorkTime } />
								<InputTextDynamic keys={ 'educations' } title={ 'Educations' } />
								<InputTextDynamic keys={ 'skills' } title={ 'Skills' } />
								<InputTextDynamic keys={ 'experiences' } title={ 'Experiences' } />
							</div>

							<div className="form-control mt-6">
								<button
									type="submit"
									className="btn btn-primary"
									disabled={ isLoading || loading }
								>
									{ method === 'POST' ? 'Create' : 'Update' } Employee
								</button>
							</div>
						</form>
					</FormProvider>
					{ ( employee ) && <>
						<InputImage imageData={ employee?.ImageEmployee?.photoProfile } title={ 'Image Profile' }
									idUser={ employee.userId } method={ 'POST' }
						/>

						{ error && type === "ktp" && <RegistrationError error={ error } /> }
						<UploadDocument user={ user } imageData={ employee?.ImageEmployee?.photoKtp } title={ 'KTP' } />

						{ error && type === "ijazah" && <RegistrationError error={ error } /> }
						<UploadDocument user={ user } imageData={ employee?.ImageEmployee?.photoIjazah }
										title={ 'Ijazah' }
						/>
					</> }

					<button
						type="button"
						onClick={ onComplete }
						className={ 'btn btn-success btn-block' }
						disabled={ employee?.registration }
					>
						{ employee?.registration && employee.statusEmployee === 'Accept' ?
							'Accept'
							: employee?.registration ? 'Wait Validation From Admin'
								: 'Submit'
						}
					</button>

				</div>
			</div>
		</div>
	);
}
