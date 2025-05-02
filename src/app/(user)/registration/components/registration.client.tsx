'use client'
import React, { useState } from "react";
import toast from "react-hot-toast";
import useFormPersist from "react-hook-form-persist";
import { UserDB } from "@/interface/entity/user.model";
import { TEmployeeDB } from "@/interface/entity/employee.model";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeRegistrationUserCreateClient, EmployeeRegistrationUserCreateClient } from "@/schema/employee.valid";
import { onUpsertDataUserAction } from "@/server/action/employee.client";
import { InputImage, InputTextDynamic } from "@/app/components/form/state";
import { ErrorValidation } from "@/utils/error/ErrorClass";

export function EmployeeFormClientUser({ employee, method, user }: {
    user: UserDB,
    employee?: TEmployeeDB,
    method: "POST" | 'PUT'
}) {
    // const router = useRouter();
    const [ errorImage, setErrorImage ] = useState<string | undefined>()

    const methods = useForm<EmployeeRegistrationUserCreateClient>({
        resolver: zodResolver(employeeRegistrationUserCreateClient),
        // @ts-ignore
        defaultValues: employee
            ? {
                ...employee,
                dateOfBirth: employee
                    ? new Date(employee.dateOfBirth).toISOString().split('T')[0]
                    : "" // Format date to YYYY-MM-DD
            } : {
                name: user.name,
                email: user.email,
                phone: user.phone,
                // userId: user.id
            }
    });
    const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = methods
    const { clear } = useFormPersist("form-registration-user", { watch, setValue });
    // console.log(errors)
    const onSubmit = async (data: any) => {
        const idToast = toast.loading('Loading...')
        setErrorImage(undefined)
        try {
            // console.log("data : ",data)
            // data.userId = user.id
            // data.registration = false
            const response = await onUpsertDataUserAction(method, data, user.id, employee?.id);
            if (response?.success) {
                clear()
                reset()
                toast.success('Successfully created');
                console.log('is successfully');
                // router.push("/home")
            }
            throw new Error('Something went wrong');
        } catch (e) {
            console.log('is errors')
            // // console.log(e.message)
            if (e instanceof ErrorValidation) {
                console.log('e instanceof ErrorValidation')
                // console.log('---------')
                // console.log(e,'ErrorValidation')
                // console.log('---------')
            }
            if (e instanceof Error) {
                console.log('e instanceof Error')
                // console.log(e.message)
                // toast.errors(e.message);
                console.log(e.message.toLowerCase())
                if (e.message.toLowerCase().includes('image')) {
                    console.log('execute')
                    setErrorImage(e.message)
                }
            }
            // toast.errors(e);

        } finally {
            toast.dismiss(idToast)
        }
    };

    // @ts-ignore
    return (
        <FormProvider { ...methods }>
            <form onSubmit={ handleSubmit(onSubmit) } className="space-y-4">
                {/*<input*/ }
                {/*    type="hidden"*/ }
                {/*    { ...register('status',*/ }
                {/*        {*/ }
                {/*            value: 'Registration',*/ }
                {/*        }*/ }
                {/*    ) }*/ }
                {/*/>*/ }
                <div className="grid grid-cols-2 gap-4">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            { ...register(
                                //  @ts-expect-errors
                                'name', {
                                    value: user.name,
                                    disabled: true
                                }) }
                            className={ `input input-bordered ` }
                            placeholder="Employee Name"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            { ...register(
                                //  @ts-expect-errors
                                'email', {
                                    disabled: true
                                }
                            ) }
                            className={ `input input-bordered  ` }
                            placeholder="employee@company.com"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone</span>
                        </label>
                        <input
                            type="tel"
                            { ...register(
                                //  @ts-expect-errors
                                'phone', {
                                    disabled: true
                                }
                            ) }
                            className="input input-bordered"
                            placeholder="Phone Number"
                        />
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
                    {/*        { ...register('hireDate') }*/ }
                    {/*        className="input input-bordered"*/ }
                    {/*    />*/ }
                    {/*    { errors.hireDate && <p className="text-errors text-sm mt-1">{ errors.hireDate.message }</p> }*/ }
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

                    {/*<div className="form-control">*/ }
                    {/*    <label className="label">*/ }
                    {/*        <span className="label-text">Position</span>*/ }
                    {/*    </label>*/ }

                    {/*    <select*/ }
                    {/*        { ...register('positions') }*/ }
                    {/*        className={ `select select-bordered ${ errors.gender ? 'select-errors' : '' }` }*/ }
                    {/*    >*/ }
                    {/*        <option value="">Select Position</option>*/ }
                    {/*        { positions.map(item => (*/ }
                    {/*            <option key={ item.id } value={ item.position }>{ item.position }</option>*/ }
                    {/*        )) }*/ }
                    {/*    </select>*/ }
                    {/*    { errors.positions*/ }
                    {/*        && <p className="text-errors text-sm mt-1">{ errors.positions.message }</p>*/ }
                    {/*    }*/ }
                    {/*</div>*/ }

                    {/*<div className="form-control">*/ }
                    {/*    <label className="label">*/ }
                    {/*        <span className="label-text">Salary</span>*/ }
                    {/*    </label>*/ }
                    {/*    <input*/ }
                    {/*        type="number"*/ }
                    {/*        { ...register('salary', { valueAsNumber: true }) }*/ }
                    {/*        className={ `input input-bordered ${ errors.salary ? 'input-errors' : '' }` }*/ }
                    {/*        placeholder="Salary"*/ }
                    {/*    />*/ }
                    {/*    { errors.salary && <p className="text-errors text-sm mt-1">{ errors.salary.message }</p> }*/ }
                    {/*</div>*/ }

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

                    {/*<div className="form-control">*/ }
                    {/*    <label className="label">*/ }
                    {/*        <span className="label-text">Country</span>*/ }
                    {/*    </label>*/ }
                    {/*    <input*/ }
                    {/*        { ...register('country') }*/ }
                    {/*        className="input input-bordered"*/ }
                    {/*        placeholder="Additional notes"*/ }
                    {/*    />*/ }
                    {/*    { errors.country && <p className="text-errors text-sm mt-1">{ errors.country.message }</p> }*/ }
                    {/*</div>*/ }

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

                    {/*<div className="form-control">*/ }
                    {/*    <label className="label">*/ }
                    {/*        <span className="label-text">Notes</span>*/ }
                    {/*    </label>*/ }
                    {/*    <textarea*/ }
                    {/*        { ...register('notes') }*/ }
                    {/*        className="textarea textarea-bordered"*/ }
                    {/*        placeholder="Additional notes"*/ }
                    {/*    ></textarea>*/ }
                    {/*    { errors.notes && <p className="text-errors text-sm mt-1">{ errors.notes.message }</p> }*/ }
                    {/*</div>*/ }
                </div>

                {/*<div className="form-control">*/ }
                {/*    <title className="title">*/ }
                {/*        <span className="title-text">Education</span>*/ }
                {/*    </title>*/ }
                {/*    <input*/ }
                {/*        { ...register('educations') }*/ }
                {/*        className="input input-bordered"*/ }
                {/*        placeholder="Additional notes"*/ }
                {/*    />*/ }
                {/*    { errors.educations && <p className="text-errors text-sm mt-1">{ errors.educations.message }</p> }*/ }
                {/*</div>*/ }
                <div className="grid grid-cols-2 gap-4">
                    <InputTextDynamic keys={ 'educations' } title={ 'Educations' } />
                    <InputTextDynamic keys={ 'skills' } title={ 'Skills' } />
                </div>
                {/*<InputTextDynamic keys={ 'languages' } title={ 'Languages' } />*/ }
                {/*<EmployeeFormContextClientAdmin keys={ 'certifications' } title={ 'Certifications' }/>*/ }
                {/*<EmployeeFormContextClientAdmin keys={ 'projects' } title={ 'Projects' }/>*/ }
                <InputImage img={ employee?.img } title={ 'Image Company' } errorText={ errorImage } />

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
