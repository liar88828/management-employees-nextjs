'use client'
import React from "react";
import { TEmployeeDB } from "@/interface/entity/employee.model";
import { FormProvider, useForm } from "react-hook-form";
import { employeeCreateClient, EmployeeCreateZodClient } from "@/validation/employee.valid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UserDB } from "@/interface/entity/user.model";
import { useRouter } from "next/navigation";
import { formDate } from "@/utils/toDate";
import { useFormImage } from "@/hook/useFormImage";

import { EmployeeFormContextClientAdmin } from "@/app/components/employee/employee.client.admin";
import { Departements } from ".prisma/client";
import { onUpsertDataUser } from "@/server/action/employee.client";

export function EmployeeFormClientUser({ employee, method, user, departments }: {
    user: UserDB
    employee?: TEmployeeDB,
    departments: Departements[]
    method: "POST" | 'PUT',
}) {
    const router = useRouter();
    const { previewImage, handleImageChange } = useFormImage(employee?.img)
    const methods = useForm<EmployeeCreateZodClient>({
        resolver: zodResolver(employeeCreateClient),
        defaultValues: employee
            ? {
                ...employee,
                userId: undefined,
                hireDate: employee ? formDate(employee.hireDate) : formDate(new Date()),
                dateOfBirth: employee ? formDate(employee.dateOfBirth) : formDate(new Date)
            } : {
                name: user.name,
                email: user.email,
                phone: user.phone,
            }
    });

    const {register, handleSubmit, formState: {errors}} = methods
    // console.log(errors)
    const {isPending, mutate} = useMutation({
        onMutate: () => {
            return {idToast: toast.loading('Loading...')}
        },
        onSuccess: () => {
            toast.success("Employee created");
            // router.replace('/home');
        },
        onError: (error) => {
            toast.error(error.message);
        },
        onSettled: (_data, __error, ___variables, context) => {
            toast.dismiss(context?.idToast)
        },
        mutationFn: async (data: EmployeeCreateZodClient) => {
            // console.log(data)
            return onUpsertDataUser(method, data, employee?.id)
        }
    })

    return (
        <div className="container mx-auto p-4 pb-20">
            <FormProvider {...methods}>
                <form onSubmit={ handleSubmit((data) => mutate(data)) } className="space-y-4">
                    <input type="hidden" { ...register('userId', {
                        value: user.id
                    }) }/>
                    <input type="hidden"{ ...register('status', {
                        value: employee?.status ?? 'Pending'
                    }) }/>
                    {/*// defaultValue={ new Date().toISOString().split('T')[0] }*/ }
                    {/*        // .toISOString().split('T')[0],*/ }
                    <input type="hidden"{ ...register('hireDate', {
                        value: employee?.hireDate ?? new Date(),
                        valueAsDate: true
                    }) }/>
                    <input type="hidden"{ ...register('salary', {
                        valueAsNumber: true,
                        value: employee?.salary ?? 0
                    }) }/>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input

                            type="text"
                            { ...register('name', {
                                value: user.name,
                                disabled: true
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
                                    disabled: true
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
                                    disabled: true
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


                    {/*<div className="form-control">*/ }
                    {/*    <label className="label">*/ }
                    {/*        <span className="label-text">Hire Date</span>*/ }
                    {/*    </label>*/ }
                    {/*    <input*/ }
                    {/*        type="date"*/ }
                    {/*        {...register('hireDate')}*/ }
                    {/*        className="input input-bordered"*/ }
                    {/*    />*/ }
                    {/*    {errors.hireDate && <p className="text-error text-sm mt-1">{errors.hireDate.message}</p>}*/ }
                    {/*</div>*/ }

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

                    {/*<div className="form-control">*/ }
                    {/*    <label className="label">*/ }
                    {/*        <span className="label-text">Salary</span>*/ }
                    {/*    </label>*/ }
                    {/*    <input*/ }
                    {/*        type="number"*/ }
                    {/*        { ...register('salary', { valueAsNumber: true }) }*/ }
                    {/*        className={ `input input-bordered ${ errors.salary ? 'input-error' : '' }` }*/ }
                    {/*        placeholder="Salary"*/ }
                    {/*    />*/ }
                    {/*    { errors.salary && <p className="text-error text-sm mt-1">{ errors.salary.message }</p> }*/ }
                    {/*</div>*/ }

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <input
                            type="text"
                            { ...register('address',
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

                    <EmployeeFormContextClientAdmin keys={ 'educations' } label={ 'Education' }/>
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
                            onChange={ handleImageChange } // Handle image preview
                            className="file-input file-input-bordered w-full"
                        />
                        {/* @ts-ignore */
                            errors.img && <p className="text-error text-sm mt-1">{ errors.img.message }</p> }
                        <img src={ previewImage }
                             alt="Image Employee"
                             className="size-40 mt-2 rounded-lg border"
                        />
                    </div>

                    <div className="form-control mt-6">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={ isPending }
                        >
                            Submit Employee
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}