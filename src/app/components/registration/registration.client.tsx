'use client'
import { UserDB } from "@/interface/entity/user.model";
import { TEmployeeDB } from "@/interface/entity/employee.model";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeCreateClient, EmployeeCreateZodClient } from "@/schema/employee.valid";
import { Departements } from ".prisma/client";
import { onUpsertDataUser } from "@/server/action/employee.client";
import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import useFormPersist from "react-hook-form-persist";
import { InputTextDynamic } from "@/app/components/form";

export function EmployeeFormClientUser({ employee, method, user, departments }: {
    user: UserDB,
    employee?: TEmployeeDB,
    method: "POST" | 'PUT',
    departments: Departements[]
}) {
    const router = useRouter();
    const [ previewImage, setPreviewImage ] = useState<string>(employee?.img ? `${ employee.img }` : "https://dummyimage.com/400x400/000/fff.jpg");
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };
    const methods = useForm<EmployeeCreateZodClient>({
        resolver: zodResolver(employeeCreateClient),
        // @ts-ignore
        defaultValues: employee
            ? {
                ...employee,
                hireDate: employee
                    ? new Date(employee.hireDate).toISOString().split('T')[0]
                    : "", // Format date to YYYY-MM-DD
                dateOfBirth: employee
                    ? new Date(employee.dateOfBirth).toISOString().split('T')[0]
                    : "" // Format date to YYYY-MM-DD
            } : {
                name: user.name,
                email: user.email,
                phone: user.phone,
            }
    });
    const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = methods
    const { clear } = useFormPersist("form-registration", { watch, setValue });

    const onSubmit = async (data: any) => {
        const idToast = toast.loading('Loading...')
        try {
            // console.log("data : ",data)
            data.userId = user.id
            data.registration = employee?.registration
            await onUpsertDataUser(method, data, employee?.id);
            clear()
            toast.success('Successfully created');
            console.log('is successfully');
            // router.push("/home")
        } catch (e) {
            // console.log('is error')
            // // console.log(e.message)
            // if (e instanceof ErrorValidation) {
            //     // console.log('is ErrorValidation')
            //     // console.log('---------')
            //     // console.log(e,'ErrorValidation')
            //     // console.log('---------')
            // }
            if (e instanceof Error) {
                toast.error(e.message);
            }
        } finally {
            toast.dismiss(idToast)
        }
    };

    return (
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
                            { ...register('name', {
                                value: user.name,
                                // disabled: true
                            }) }
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
                            { ...register('email', {
                                // disabled: true
                                }
                            ) }
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
                            { ...register('phone', {
                                // disabled: true
                                }
                            ) }
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

                    {/*// console.log(employee.dateOfBirth)*/ }
                    {/*// Wed Aug 31 1988 07:00:00 GMT+0700 (Indochina Time)*/ }
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date of Birth</span>
                        </label>
                        <input
                            type="date"
                            { ...register('dateOfBirth',
                            ) }
                            className="input input-bordered"
                            defaultValue={ employee ? new Date(employee.dateOfBirth).toISOString().split('T')[0] : '' }
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

                        <select
                            { ...register('department') }
                            className={ `select select-bordered ${ errors.gender ? 'select-error' : '' }` }
                        >
                            <option value="">Select Department</option>
                            { departments.map(item => (
                                <option key={ item.id } value={ item.position }>{ item.position }</option>
                            )) }
                        </select>
                        { errors.department
                            && <p className="text-error text-sm mt-1">{ errors.department.message }</p>
                        }
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

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <input
                            type="text"
                            { ...register('address',
                                {
                                    // disabled: true
                                }
                            ) }
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

                    {/*<div className="form-control">*/ }
                    {/*    <label className="label">*/ }
                    {/*        <span className="label-text">Education</span>*/ }
                    {/*    </label>*/ }
                    {/*    <input*/ }
                    {/*        { ...register('educations') }*/ }
                    {/*        className="input input-bordered"*/ }
                    {/*        placeholder="Additional notes"*/ }
                    {/*    />*/ }
                    {/*    { errors.educations && <p className="text-error text-sm mt-1">{ errors.educations.message }</p> }*/ }
                    {/*</div>*/ }

                    <InputTextDynamic keys={ 'educations' } label={ 'Educations' }/>
                    <InputTextDynamic keys={ 'skills' } label={ 'Skills' }/>
                    <InputTextDynamic keys={ 'languages' } label={ 'Languages' }/>
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
                                ...register('img',) }
                            onChange={ handleImageChange } // Handle image preview
                            className="file-input file-input-bordered w-full"
                        />
                        {/* @ts-ignore */
                            errors.img && <p className="text-error text-sm mt-1">{ errors.img.message }</p> }

                        {/* eslint-disable-next-line @next/next/no-img-element */ }
                        <img src={ previewImage }
                             alt="Image Employee"
                             className="size-40 mt-2 rounded-lg border"
                        />
                    </div>

                    <div className="form-control mt-6">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            // disabled={ isPending }
                        >
                            { method === 'POST' ? 'Create' : 'Update' } Employee
                        </button>
                    </div>
                </form>
            </FormProvider>
    );
}