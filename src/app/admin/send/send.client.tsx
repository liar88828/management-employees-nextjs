'use client';

import React, { useActionState } from "react";
import Link from "next/link";
import { Companys, Letters } from "@prisma/client";
import { InputDate, InputText, } from "@/app/components/form/state";
import { LoadingSpin } from "@/app/components/LoadingData";
import { LetterForm } from "@/assets/letter";
import { toDateIndo } from "@/utils/toDate";
import { EmployeeUserClient } from "@/interface/entity/employee.model";
import { useSendStore } from "@/store/send";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useFormPersist from "react-hook-form-persist";
import { LetterFormSchema, LetterFormSchemaType } from "@/schema/send.valid";
import { MyInput, MyInputDate } from "@/app/components/form/action";
import { Departements } from ".prisma/client";
import { EmployeeCompletePhoto, } from "@/interface/enum";
import Form from "next/form";
import { letterEmployeeActionFormData, letterEmployeeActionState } from "@/server/action/letter.action";
import toast from "react-hot-toast";
import { LetterInterview } from "@/app/components/Letter/Interview";

export function SendForm({ employees, letter }: { letter?: Letters, employees: EmployeeUserClient[] }) {
    const [ state, action, pending ] = useActionState(letterEmployeeActionFormData, undefined);
    // console.log(state)
    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-4xl card card-bordered bg-base-200 ">
                <form action={ action } className="card-body">
                    <h2 className="card-title">Create Form letter</h2>

                    { letter?.id && <input type="hidden" value={ letter?.id } name={ 'id' } /> }

                    <MyInput title={ "signerName" }
                             defaultValue={ state?.value.signerName ?? letter?.signerName }
                             error={ state?.errors?.dressCode }
                    />

                    <MyInputDate title={ "interviewDate" }
                                 defaultValue={ state?.value.interviewDate ?? letter?.interviewDate }
                                 error={ state?.errors?.interviewDate }
                    />

                    <MyInput title={ "interviewLocation" }
                             defaultValue={ state?.value.interviewLocation ?? letter?.interviewLocation }
                             error={ state?.errors?.interviewLocation }
                    />

                    <MyInput title={ "dressCode" }
                             defaultValue={ state?.value.dressCode ?? letter?.dressCode }
                             error={ state?.errors?.dressCode }
                    />
                    <hr className="my-4" />
                    {/*<div >*/ }
                    {/*    Select Employee Or Save as Template*/ }
                    {/*</div>*/ }
                    <div>
                        {/*<EmployeesSendTable employees={ employees } />*/ }
                    </div>

                    { state?.message && (
                        <p className={ `${ state.success ? 'text-success' : 'text-error' } text-sm mt-1` }>{ state.message }</p>
                    ) }
                    <div className="card-actions">
                        <button
                            disabled={ pending }
                            type="submit"
                            className={ `btn btn-primary w-full ${ pending ? "btn-disabled" : "" } mt-5` }
                        >
                            { pending && <LoadingSpin /> }Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export function SendFormStore(
    // { employees, letter }: { letter?: Letters, employees: EmployeeUserClient[] }
) {
    const methods = useForm<LetterFormSchemaType>({
        resolver: zodResolver(LetterFormSchema),
        // defaultValues: company

    });
    const { handleSubmit, watch, setValue, formState: { isLoading, errors }, reset } = methods
    const { clear } = useFormPersist("form-send", { watch, setValue });
    const store = useSendStore((state) => state.store)
    const onCreate = async (data: LetterFormSchemaType) => {
        const idToast = toast.loading('Loading...')
        try {
            const response = await letterEmployeeActionState(data, store.selectAll)
            console.log(response)
            clear()
            reset()
            toast.success("Successfully created.")

        } catch (error) {
            if (error instanceof Error) {
                toast.error(`Error creating letter form : ${ error.message }`)
            }
        } finally {
            toast.dismiss(idToast)
        }
    }
    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-4xl card card-bordered bg-base-200 ">
                <FormProvider { ...methods }>
                    <form onSubmit={ handleSubmit(onCreate) } className="card-body">
                        <h2 className="card-title">Create Form letter</h2>
                        {/*{ letter?.id && <input type="hidden" value={ letter?.id } name={ 'id' } /> }*/ }
                        <InputText keys={ "signerName" } title={ "Signer Name" } />
                        <InputDate keys={ 'interviewDate' } title={ 'Interview Date' } />
                        <InputText keys={ "interviewLocation" } title={ "Interview Location" } />
                        <InputText keys={ "dressCode" } title={ "Dress Code" } />
                        <div className="card-actions">
                            <button
                                disabled={ isLoading }
                                type="submit"
                                className={ `btn btn-primary w-full ${ isLoading ? "btn-disabled" : "" } mt-5` }
                            >
                                { isLoading && <LoadingSpin /> }Create
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}

export function EmployeesSendTable({ employees, departments }: {
    employees: EmployeeUserClient[],
    departments: Departements[]
}) {
    const { store, setStore, setSelectEmployee, setSelectAllEmployee, getEmployeeExist } = useSendStore()

    return (
        <section className="space-y-2">
            {/*<h1>Please Select Want To Send Letter</h1>*/ }
            <Form action="/admin/send/create">

                <input
                    onChange={ (e) => setStore({ name: e.target.value }) }
                    type="text"
                    name={ 'name' }
                    className="input input-bordered input-sm"
                    placeholder="Search Name"
                />

                <select
                    onChange={ (e) => setStore({ complete: e.target.value }) }
                    name={ 'complete' }
                    className="select select-bordered select-sm"
                >
                    <option>{ EmployeeCompletePhoto.SelectAll }</option>
                    <option>{ EmployeeCompletePhoto.Complete }</option>
                    <option>{ EmployeeCompletePhoto.NotCompleted }</option>
                </select>

                <select
                    onChange={ (e) => setStore({ department: e.target.value }) }
                    name={ 'department' }
                    className="select select-bordered select-sm"
                >
                    <option value={ '' }>Select All</option>
                    { departments.map(department => (
                        <option key={ department.id }>{ department.position }</option>
                    )) }
                </select>
                <button className={ 'btn btn-info' }>Search</button>
            </Form>

            <div className="overflow-x-auto">
                <table className="table bg-base-200 ">
                    <thead>
                    <tr className="text-left">
                        <th>
                            <input
                                type="checkbox"
                                className="checkbox"
                                // checked={ isAllSelected }
                                onChange={ () => setSelectAllEmployee(employees.map(item => item.id)) }
                            />
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Department</th>
                        <th>Status</th>
                        {/*<th >Action</th>*/ }
                    </tr>
                    </thead>
                    <tbody>
                    { employees.map((employee, index) => (
                        <tr key={ employee.id } className="hover:bg-gray-100/20">
                            <td>
                                <input
                                    checked={ getEmployeeExist(employee.id) }
                                    onChange={ () => setSelectEmployee(employee.id) }
                                    type="checkbox"
                                    name={ `check[${ index }]` }
                                    className="checkbox"
                                    value={ employee.id }
                                />
                            </td>
                            <td>{ employee.User.name }</td>
                            <td>{ employee.User.email }</td>
                            <td>{ employee.User.phone }</td>
                            <td>{ employee.department }</td>
                            <td>{ employee.status }</td>
                            {/*<td >*/ }
                            {/*    Action*/ }
                            {/*</td>*/ }
                        </tr>
                    )) }
                    </tbody>
                    <tfoot>
                    <tr>
                        <th></th>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </section>
    );
}

export function SendTableEmployee(
    { employees, letter, company }:
    { company: Companys, letter: LetterForm, employees: EmployeeUserClient[] }
) {
    return (
        <div className="overflow-x-auto p-4">
            <table className="table  bg-base-200">
                <thead>
                <tr>
                    <th className="p-2">Employee Name</th>
                    {/*<th className="p-2">Employee Phone</th>*/ }
                    <th className="p-2">Employee Email</th>
                    <th className="p-2">Employee Here</th>
                    {/*<th className="p-2">Employee Birth</th>*/ }
                    <th className="p-2">Employee Status</th>
                    <th className="p-2">Interview Date</th>
                    <th className="p-2">Interview Location</th>
                    <th className="p-2">Letter Create</th>
                    <th className="p-2">Action</th>

                </tr>
                </thead>
                <tbody>
                { employees.map((item, index) => (
                    <tr key={ index } className="hover:bg-gray-100/50">
                        {/*<td className="p-2 border">*/ }
                        {/*</td>*/ }
                        <td>{ item.User.name }</td>
                        {/*<td>{ item.User.phone }</td>*/ }
                        <td>{ item.User.email }</td>
                        <td>{ toDateIndo(item.hireDate) }</td>
                        {/*<td>{ toDateIndo(item.dateOfBirth) }</td>*/ }
                        <td>{ item.status }</td>
                        {/**/ }
                        <td>{ toDateIndo(letter.interviewDate) }</td>
                        <td>{ letter.interviewLocation }</td>
                        <td>{ toDateIndo(letter.createdAt) }</td>
                        <td>
                            <ModalLatter
                                keys={ item.id }
                                letter={ letter }
                                employee={ item }
                                company={ company }
                            />
                        </td>
                    </tr>
                )) }
                </tbody>
            </table>
        </div>
    );
}

export function SendTableLetter({ data }: { data: Letters[] }) {
    return (
        <div className="overflow-x-auto p-4">
            <table className="table w-full  bg-base-200">
                <thead>
                <tr>
                    <th>No</th>
                    <th>ID</th>
                    <th>Interview Date</th>
                    <th>Interview Location</th>
                    <th>Letter Create</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                { data.map((item, index) => (
                    <tr key={ index } className="hover:bg-gray-100/50">
                        <td>{ index + 1 }</td>
                        <td>{ item.id }</td>
                        <td>{ toDateIndo(item.interviewDate) }</td>
                        <td>{ item.interviewLocation }</td>
                        <td>{ toDateIndo(item?.createdAt) }</td>
                        <td>
                            <div>
                                <Link
                                    className="btn btn-info"
                                    href={ `/admin/send/${ item.id }`
                                    }
                                >
                                    Detail
                                </Link>
                            </div>
                        </td>
                    </tr>
                )) }
                </tbody>
            </table>
        </div>
    );
}

export function ModalLatter(
    { keys, employee, company, letter }: {
        keys: string,
        company: Companys,
        employee: EmployeeUserClient,
        letter: LetterForm
    }) {
    return ( <>
            {/* Open the modal using document.getElementById('ID').showModal() method */ }
            <button className="btn btn-info"
                    onClick={ () => ( document.getElementById(`my_modal_latter_${ keys }`) as HTMLDialogElement ).showModal() }
            >Detail
            </button>
            <dialog id={ `my_modal_latter_${ keys }` } className="modal ">
                <div className="modal-box w-11/12 max-w-5xl ">
                    <div className=" flex justify-center">
                        <LetterInterview employee={ employee } company={ company } form={ letter } />
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>

    );
}
