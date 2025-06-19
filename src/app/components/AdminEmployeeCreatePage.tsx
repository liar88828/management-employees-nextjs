'use client'
import { employeeUpsertUserAction, registrationFinishedState } from "@/action/user-registration-action";
import { RegistrationError } from "@/app/components/ui/ErrorComponent";
import {
	InputDate,
	InputImage,
	InputSelect,
	InputText,
	InputTextArea,
	InputTextDynamic
} from "@/app/components/ui/FormComponent";
import { UploadDocument } from "@/app/components/ui/upload-document";
import { constantGender, constantWorkTime } from "@/assets/constant";
import { TEmployeeDB, UserClient } from "@/interface/model";
import { registrationCreateClientUser, RegistrationUserCreateClient } from "@/schema/registration-user-sanitizer";
import { setDateForm } from "@/utils/setDateForm";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";


export function AdminRegistrationPage({ employee, user, type, error }: {
	user: UserClient,
	employee: TEmployeeDB,
	error: string,
	type: string
}) {
// console.log(employee,'RegistrationFormClientUser')
	// const router = useRouter();
	const [ loading, setLoading ] = useState(false);
	const [ errorImage, setErrorImage ] = useState<string | undefined>()

	const methods = useForm<RegistrationUserCreateClient & {
		name: string,
		phone: string,
		email: string,
	}>({
		resolver: zodResolver(registrationCreateClientUser),
		defaultValues: {
			address: employee?.address,
			city: employee?.city,
			gender: employee?.gender,
			jobTitle: employee?.jobTitle,
			postalCode: employee?.postalCode,
			workTime: employee?.workTime,
			skills: employee?.Skills.map((item) => ( { text: item.text } )) ?? [ { text: '' } ],
			educations: employee?.Educations.map((item) => ( { text: item.text } )) ?? [ { text: '' } ],
			experiences: employee?.Experiences.map((item) => ( { text: item.text } )) ?? [ { text: '' } ],
			dateOfBirth: setDateForm(employee?.dateOfBirth),
			name: user.name,
			email: user.email,
			phone: user.phone
		} satisfies RegistrationUserCreateClient
	});
	const { handleSubmit, formState: { isLoading } } = methods
	const onSubmit = async (data: any) => {
		setLoading(true);
		setErrorImage(undefined)
		const response = await employeeUpsertUserAction(data, user, employee.id,)
		if (response.success) {
			toast.success(response.message);
		} else {
			toast.error(response.message);
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

	const statusUser = employee?.registration && employee.statusEmployee === 'Accept' ? 'Accept' : employee?.registration ? 'Wait Validation From Admin' : 'Submit';

	return ( <div className="flex flex-col gap-5">
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
					</div>

					<div className="form-control mt-6">
						<button
							type="submit"
							className="btn btn-primary"
							disabled={ isLoading || loading }
						>
							Update Employee
						</button>
					</div>
				</form>
			</FormProvider>
			{ ( employee.ImageEmployee || employee ) && <>
				<InputImage imageData={ employee?.ImageEmployee?.photoProfile } title={ 'Image Profile' }
							method={ 'POST' }
							idUser={ employee.userId }
				/>

				{ error && type === "ktp" && <RegistrationError error={ error } /> }
				<UploadDocument user={ user } imageData={ employee?.ImageEmployee?.photoKtp } title={ 'KTP' } />

				{ error && type === "ijazah" && <RegistrationError error={ error } /> }
				<UploadDocument user={ user } imageData={ employee?.ImageEmployee?.photoIjazah } title={ 'Ijazah' } />
			</>
			}

			<button
				type="button"
				onClick={ onComplete }
				className={ 'btn btn-success btn-block' }
				disabled={ employee?.registration }
			>
				{ statusUser }
			</button>

		</div>
	);
}
