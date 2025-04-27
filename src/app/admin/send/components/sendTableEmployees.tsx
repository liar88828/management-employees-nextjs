import { EmployeeUserClient } from "@/interface/entity/employee.model";
import { Department } from "@/interface/entity/departement.model";
import { useSendStore } from "@/store/send";
import Form from "next/form";
import { EmployeeCompletePhoto } from "@/interface/enum";
import React from "react";

export function SendTableEmployees({ employees, departments }: {
    employees: EmployeeUserClient[],
    departments: Department[]
}) {
    const { store, setStore, setSelectEmployee, setSelectAllEmployee, getEmployeeExist } = useSendStore()

    return (
        <section className="space-y-2 mt-4">
            {/*<h1>Please Select Want To Send Letter</h1>*/ }
            <Form action="/admin/send/create"
                  className={ 'space-x-4' }
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
                    <option>{ EmployeeCompletePhoto["Select All"] }</option>
                    <option>{ EmployeeCompletePhoto.Complete }</option>
                    <option>{ EmployeeCompletePhoto["Not Completed"] }</option>
                </select>

                <select
                    onChange={ (e) => setStore({ department: e.target.value }) }
                    name={ 'department' }
                    className="select select-bordered "
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
