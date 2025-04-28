'use client'
import { EmployeeUserClientLatter } from "@/interface/entity/employee.model";
import { Department } from "@/interface/entity/departement.model";
import { useSendStore } from "@/store/send";
import Form from "next/form";
import { EmployeeCompletePhoto } from "@/interface/enum";
import React from "react";

export function SendFormTableEmployees({ employees, departments }: {
    employees: EmployeeUserClientLatter[],
    departments: Department[]
}) {
    const { setStore, setSelectEmployee, setSelectAllEmployee, getEmployeeExist, message } = useSendStore()

    return (
        <section className="card card-body bg-base-200 mt-2">
            <div className="">

                <h1 className={ 'card-title' }>Select Employee
                    { message &&
                        <span className={ 'text-error' }>{ message }</span>
                    }
                </h1>

            </div>
            {/*<h1>Please Select Want To Send Letter</h1>*/ }
            <Form action="/admin/send/create"
                  className={ 'flex flex-wrap gap-1' }
            >

                <input
                    onChange={ (e) => setStore({ name: e.target.value }) }
                    type="text"
                    name={ 'name' }
                    className="input input-bordered "
                    placeholder="Search Name"
                />

                <select
                    onChange={ (e) => setStore({ complete: e.target.value }) }
                    name={ 'complete' }
                    className="select select-bordered "
                >
                    <option value={ EmployeeCompletePhoto["Select All"] }>Select Complete Document</option>
                    <option>{ EmployeeCompletePhoto.Complete }</option>
                    <option>{ EmployeeCompletePhoto["Not Completed"] }</option>
                </select>

                <select
                    onChange={ (e) => setStore({ department: e.target.value }) }
                    name={ 'department' }
                    className="select select-bordered "
                >
                    <option value={ '' }>Select Department</option>
                    { departments.map(department => (
                        <option key={ department.id }>{ department.position }</option>
                    )) }
                </select>

                <button className={ 'btn btn-info' }>Search</button>

            </Form>

            <div className="overflow-x-auto">
                <table className="my-table bg-base-100">
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
                        <th>Count</th>
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
                            <td className={ 'text-nowrap' }>{ employee.User.phone }</td>
                            <td>{ employee.department }</td>
                            <td>{ employee.status }</td>
                            <td>{ employee.LetterEmployees.length }</td>
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
