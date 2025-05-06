'use client'
import { TEmployeeDB } from "@/interface/entity/employee.model";
import { FormProvider, useForm } from "react-hook-form";
import { employeeCreateClientAdmin, EmployeeCreateClientAdmin } from "@/schema/employee.valid";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { onUpsertDataAdminAction } from "@/server/action/employee-admin.action";
import { InputTextDynamic } from "@/app/components/form/state";
import React from "react";

export function EmployeeFormClientAdmin({ employee, method, userId, }: {
    userId: string,
    employee?: TEmployeeDB,
    method: "POST" | 'PUT',
    // positions: Positions[]
}) {

    const methods = useForm<EmployeeCreateClientAdmin>({
        resolver: zodResolver(employeeCreateClientAdmin),
        defaultValues: employee ? {
            ...employee,
            userId,
            position: employee.position ?? undefined,
        } : undefined
    });

    const { register, handleSubmit, formState: { errors } } = methods

    const onSubmit = async (data: EmployeeCreateClientAdmin) => {
        const idToast = toast.loading('Updating...')
        try {
            await onUpsertDataAdminAction(method, data)
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
                    {/*<div className="form-control">*/ }
                    {/*    <label className="label">*/ }
                    {/*        <span className="label-text">Name</span>*/ }
                    {/*    </label>*/ }
                    {/*    <input*/ }
                    {/*        type="text"*/ }
                    {/*        { ...registerAction('name') }*/ }
                    {/*        className={ `input input-bordered ${ errors.name ? 'input-errors' : '' }` }*/ }
                    {/*        placeholder="Employee Name"*/ }
                    {/*    />*/ }
                    {/*    { errors.name && <p className="text-errors text-sm mt-1">{ errors.name.message }</p> }*/ }
                    {/*</div>*/ }

                    {/*<div className="form-control">*/ }
                    {/*    <label className="label">*/ }
                    {/*        <span className="label-text">Email</span>*/ }
                    {/*    </label>*/ }
                    {/*    <input*/ }
                    {/*        type="email"*/ }
                    {/*        { ...registerAction('email') }*/ }
                    {/*        className={ `input input-bordered ${ errors.email ? 'input-errors' : '' }` }*/ }
                    {/*        placeholder="employee@company.com"*/ }
                    {/*    />*/ }
                    {/*    { errors.email && <p className="text-errors text-sm mt-1">{ errors.email.message }</p> }*/ }
                    {/*</div>*/ }

                    {/*<div className="form-control">*/ }
                    {/*    <label className="label">*/ }
                    {/*        <span className="label-text">Phone</span>*/ }
                    {/*    </label>*/ }
                    {/*    <input*/ }
                    {/*        type="tel"*/ }
                    {/*        { ...registerAction('phone') }*/ }
                    {/*        className="input input-bordered"*/ }
                    {/*        placeholder="Phone Number"*/ }
                    {/*    />*/ }
                    {/*    { errors.phone && <p className="text-errors text-sm mt-1">{ errors.phone.message }</p> }*/ }
                    {/*</div>*/ }

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
                            <span className="label-text">Position</span>
                        </label>
                        <input
                            type="text"
                            { ...register('position') }
                            className="input input-bordered"
                            placeholder="Position"
                        />
                        { errors.position &&
                            <p className="text-error text-sm mt-1">{ errors.position.message }</p> }
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
                    {/*	<title className="title">*/ }
                    {/*		<span className="title-text">Manager ID (Optional)</span>*/ }
                    {/*	</title>*/ }
                    {/*	<input*/ }
                    {/*		type="number"*/ }
                    {/*		{...registerAction('managerId', { valueAsNumber: true })}*/ }
                    {/*		className="input input-bordered"*/ }
                    {/*		placeholder="Manager ID"*/ }
                    {/*	/>*/ }
                    {/*	{errors.salary && <p className="text-errors text-sm mt-1">{errors.salary.message}</p>}*/ }
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
                            <span className="label-text">Work Time</span>
                        </label>
                        <select { ...register("workTime") } className="select select-bordered">
                            <option value="">Select Type</option>
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                        </select>
                        { errors.workTime &&
                            <p className="text-error text-sm mt-1">{ errors.workTime.message }</p> }
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

                    <InputTextDynamic keys={ 'skills' } title={ 'Skills' } />
                    <InputTextDynamic keys={ 'languages' } title={ 'Languages' } />
                    {/*<EmployeeFormContextClientAdmin keys={ 'certifications' } title={ 'Certifications' }/>*/ }
                    {/*<EmployeeFormContextClientAdmin keys={ 'projects' } title={ 'Projects' }/>*/ }

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
