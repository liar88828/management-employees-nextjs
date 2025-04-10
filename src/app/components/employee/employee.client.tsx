'use client'
import Form from "next/form";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { EmployeePhotoPageAdmin } from "@/app/components/employee/employee.page";
import { FormProvider, useFieldArray, useForm, useFormContext } from "react-hook-form";
import { TypeFile, uploadFile } from "@/server/action/upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Departements } from ".prisma/client";
import { TEmployeeDB } from "@/interface/entity/employee.model";
import { employeeCreateClient, EmployeeCreateZodClient } from "@/schema/employee.valid";
import { onUpsertDataUser } from "@/server/action/employee.client";
import toast from "react-hot-toast";

export function EmployeeFormContextClientAdmin({ label, keys }: { label: string, keys: string }) {
    const { register, control } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        control,
        name: keys
    });

    return (
        <div className="form-control ">
            <div className="flex justify-between mb-1">
                <label className="label items-end ">
                    <span className="label-text">{ label }</span>

                </label>
                <button
                    className="btn btn-info btn-square"
                    type="button"
                    onClick={ () => append({ text: "" }) }
                >
                    <Plus/>
                </button>
            </div>
            <div className="space-y-2">
                { fields.map((item, index) => (
                    <div key={ item.id } className="flex gap-2">
                        <input
                            className="input input-bordered w-full"
                            { ...register(`${ keys }.${ index }.text`) } />
                        <button
                            className={ 'btn btn-error btn-square' }
                            type="button"
                            onClick={ () => remove(index) }
                        >
                            <Minus/>
                        </button>
                    </div>
                )) }
            </div>
        </div>
    );
}

export function EmployeeFormClientAdmin({ employee, method, userId, departments }: {
    userId: string,
    employee?: TEmployeeDB,
    method: "POST" | 'PUT',
    departments: Departements[]
}) {

    const methods = useForm<EmployeeCreateZodClient>({
        resolver: zodResolver(employeeCreateClient),
        defaultValues: employee ? { ...employee, userId } : undefined
    });

    const { register, handleSubmit, formState: { errors } } = methods

    const onSubmit = async (data: EmployeeCreateZodClient) => {
        const idToast = toast.loading('Updating...')
        try {
            await onUpsertDataUser(method, data)
            toast.success("Updating success")
        } catch (e) {
            if (e instanceof Error) toast.error(`Error updating user : ${ e.message }`)
        } finally {
            toast.dismiss(idToast)
        }
    };
    console.log(methods.formState.errors)
    return (
        <div className="container mx-auto p-4 pb-20">
            <FormProvider { ...methods }>
                <form onSubmit={ handleSubmit(onSubmit) } className="space-y-4">
                    <input
                        type="hidden"
                        { ...register('status',
                            {
                                value: 'Pending'
                            }
                        ) }
                    />
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            { ...register('name') }
                            className={ `input input-bordered ${ errors.name ? 'input-error' : '' }` }
                            placeholder="Employee Name"
                        />
                        { errors.name && <p className="text-error text-sm mt-1">{ errors.name.message }</p> }
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            { ...register('email') }
                            className={ `input input-bordered ${ errors.email ? 'input-error' : '' }` }
                            placeholder="employee@company.com"
                        />
                        { errors.email && <p className="text-error text-sm mt-1">{ errors.email.message }</p> }
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone</span>
                        </label>
                        <input
                            type="tel"
                            { ...register('phone') }
                            className="input input-bordered"
                            placeholder="Phone Number"
                        />
                        { errors.phone && <p className="text-error text-sm mt-1">{ errors.phone.message }</p> }
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Gender</span>
                        </label>

                        <select
                            { ...register('gender') }
                            className={ `select select-bordered ${ errors.gender ? 'select-error' : '' }` }
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        { errors.gender && <p className="text-error text-sm mt-1">{ errors.gender.message }</p> }
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date of Birth</span>
                        </label>
                        <input
                            type="date"
                            { ...register('dateOfBirth') }
                            className="input input-bordered"
                        />
                        { errors.dateOfBirth &&
													<p className="text-error text-sm mt-1">{ errors.dateOfBirth.message }</p> }

                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Hire Date</span>
                        </label>
                        <input
                            type="date"
                            { ...register('hireDate') }
                            className="input input-bordered"
                        />
                        { errors.hireDate && <p className="text-error text-sm mt-1">{ errors.hireDate.message }</p> }

                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Job Title</span>
                        </label>
                        <input
                            type="text"
                            { ...register('jobTitle') }
                            className={ `input input-bordered ${ errors.jobTitle ? 'input-error' : '' }` }
                            placeholder="Job Title"
                        />
                        { errors.jobTitle && <p className="text-error text-sm mt-1">{ errors.jobTitle.message }</p> }
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Department</span>
                        </label>
                        <input
                            type="text"
                            { ...register('department') }
                            className="input input-bordered"
                            placeholder="Department"
                        />
                        { errors.department &&
													<p className="text-error text-sm mt-1">{ errors.department.message }</p> }

                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Salary</span>
                        </label>
                        <input
                            type="number"
                            { ...register('salary', { valueAsNumber: true }) }
                            className={ `input input-bordered ${ errors.salary ? 'input-error' : '' }` }
                            placeholder="Salary"
                        />
                        { errors.salary && <p className="text-error text-sm mt-1">{ errors.salary.message }</p> }
                    </div>

                    {/*<div className="form-control">*/ }
                    {/*	<label className="label">*/ }
                    {/*		<span className="label-text">Manager ID (Optional)</span>*/ }
                    {/*	</label>*/ }
                    {/*	<input*/ }
                    {/*		type="number"*/ }
                    {/*		{...register('managerId', { valueAsNumber: true })}*/ }
                    {/*		className="input input-bordered"*/ }
                    {/*		placeholder="Manager ID"*/ }
                    {/*	/>*/ }
                    {/*	{errors.salary && <p className="text-error text-sm mt-1">{errors.salary.message}</p>}*/ }
                    {/*	*/ }
                    {/*</div>*/ }

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <input
                            type="text"
                            { ...register('address') }
                            className="input input-bordered"
                            placeholder="Street Address"
                        />
                        { errors.address && <p className="text-error text-sm mt-1">{ errors.address.message }</p> }

                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">City</span>
                        </label>
                        <input
                            type="text"
                            { ...register('city') }
                            className="input input-bordered"
                            placeholder="City"
                        />
                        { errors.city && <p className="text-error text-sm mt-1">{ errors.city.message }</p> }

                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Postal Code</span>
                        </label>
                        <input
                            type="text"
                            { ...register('postalCode') }
                            className="input input-bordered"
                            placeholder="Postal Code"
                        />
                        { errors.postalCode &&
													<p className="text-error text-sm mt-1">{ errors.postalCode.message }</p> }
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Country</span>
                        </label>
                        <input
                            { ...register('country') }
                            className="input input-bordered"
                            placeholder="Additional notes"
                        />
                        { errors.country && <p className="text-error text-sm mt-1">{ errors.country.message }</p> }
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Employment Type</span>
                        </label>
                        <select { ...register("employmentType") } className="select select-bordered">
                            <option value="">Select Type</option>
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                        </select>
                        { errors.employmentType &&
													<p className="text-error text-sm mt-1">{ errors.employmentType.message }</p> }
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Notes</span>
                        </label>
                        <textarea
                            { ...register('notes') }
                            className="textarea textarea-bordered"
                            placeholder="Additional notes"
                        ></textarea>
                        { errors.notes && <p className="text-error text-sm mt-1">{ errors.notes.message }</p> }
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Education</span>
                        </label>
                        <input
                            { ...register('educations') }
                            className="input input-bordered"
                            placeholder="Additional notes"
                        />
                        { errors.educations &&
													<p className="text-error text-sm mt-1">{ errors.educations.message }</p> }
                    </div>

                    <EmployeeFormContextClientAdmin keys={ 'skills' } label={ 'Skills' }/>
                    <EmployeeFormContextClientAdmin keys={ 'languages' } label={ 'Languages' }/>
                    {/*<EmployeeFormContextClientAdmin keys={ 'certifications' } label={ 'Certifications' }/>*/ }
                    {/*<EmployeeFormContextClientAdmin keys={ 'projects' } label={ 'Projects' }/>*/ }

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Employee Image</span>
                        </label>
                        <input
                            type="file"

                            {
                                // @ts-ignore
                                ...register('img') }
                            className="file-input file-input-bordered w-full"
                        />
                        {/* @ts-ignore */
                            errors.img && <p className="text-error text-sm mt-1">{ errors.img.message }</p> }
                    </div>

                    <div className="form-control mt-6">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            // disabled={ isPending }
                        >
                            Submit Employee
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}

interface EmployeeCVProps {
    employee: TEmployeeDB,
    type: string,
}

export function EmployeePhotosUploadClientAdmin({ employee, type }: EmployeeCVProps & { type: TypeFile }) {
    const [ imagePreview, setImagePreview ] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setImagePreview(previewURL);
        }
    };
    const uploadImage = uploadFile.bind(null, {
        id: employee.id,
        from: 'employee',
        typeFile: type
    })

    return (
        <EmployeePhotoPageAdmin
            type={ type }
            imagePreview={ imagePreview }
            employee={ employee }
            action={ uploadImage }
            onChange={ handleFileChange }
        />
    )
}

export function EmployeeSearchClientAdmin({ children }: { children: React.ReactNode }) {
    const { setFilter, filter } = useEmployeeStore();

    return (
        <>
            <div className="flex justify-between gap-2">
                <Form action={ '/admin/employee' } className="join w-full">
                    <input
                        onChange={ e => setFilter({ name: e.target.value }) }
                        type="text"
                        className={ 'input input-bordered join-item w-full' }
                        name={ 'search' }
                        value={ filter.name }
                    />
                    <select className="select select-bordered join-item w-fit"
                            defaultValue={ '' }
                            onChange={ e => setFilter({ status: e.target.value }) }
                            name={ 'status' }
                    >
                        <option disabled value={ '' }>Filter</option>
                        {/*<option value={ '' }>All</option>*/ }
                        <option>Pending</option>
                        <option>Fail</option>
                        <option>Complete</option>
                        <option>Active</option>
                        <option>Disabled</option>
                    </select>
                </Form>
                <Link href={ '/admin/employee/create' } className={ 'btn btn-square' }>
                    <Plus/>
                </Link>
            </div>
            { children }
        </>
    );
}

function useEmployeeStore(): { setFilter: any; filter: any; } {
    throw new Error("Function not implemented.");
}

