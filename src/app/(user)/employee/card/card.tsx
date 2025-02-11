import React from "react";
import { Employees } from "@prisma/client";
import { toDateIndo } from "@/utils/toDate";

export const EmployeeIDCard = ({ employee }: { employee: Employees }) => {
    return (
        <div className="h-[10.2cm] w-[6.5cm] mx-auto bg-white border border-gray-300 rounded-lg shadow-lg p-4 ">
            <div className="">
                <div className="flex gap-6 items-center">
                    <img
                        src='/logo.png'
                        alt="logo"
                        className="size-16 rounded-full  object-contain"
                    />

                    <h1 className={ 'text-sm font-bold' }>Cv. Pudji Lestari Sentosa</h1>
                    {/*<p className={''}>Maju Bersama</p>*/ }

                </div>
                <div className="flex justify-center mb-4 ">
                    <img
                        src={ employee.img }
                        alt="Employee"
                        className="w-24 h-24 rounded-full border-2 border-gray-300"
                    />
                </div>
                <h2 className="text-lg font-semibold text-center text-gray-800">{ employee.name }</h2>
                <p className="text-center text-sm text-gray-500">{ employee.jobTitle } - { employee.department }</p>

                <div className="mt-4">


                    <div className="flex justify-between text-xs text-gray-600">
                        <p>Phone :</p>
                        <p>{ employee.phone }</p>
                    </div>

                    <div className="flex justify-between text-xs text-gray-600">
                        <p>Email :</p>
                        <p>{ employee.email }</p>
                    </div>


                    {/*<div className="flex justify-between text-xs text-gray-600 gap-10">*/ }
                    {/*    <p className={'text-nowrap'}>Address :</p>*/ }
                    {/*    <p className={'text-right'}>{ employee.address }, { employee.city }, { employee.postalCode }</p>*/ }
                    {/*</div>*/ }
                    {/*<div className="py-2"></div>*/ }

                    <div className="flex justify-between text-xs text-gray-600">
                        <p>Hire Date:</p>
                        <p>{ toDateIndo(employee.hireDate) }</p>
                    </div>
                </div>

                <div className="mt-4 text-[10px] text-base/50 text-right ">
                    <p>{ employee.id }</p>
                </div>
                {/*<div className="mt-4 text-xs text-base/50 text-right">*/ }
                {/*    <p>Created At: { toDateIndo(employee.createdAt) }</p>*/ }
                {/*    <p>Updated At: { toDateIndo(employee.updatedAt) }</p>*/ }
                {/*</div>*/ }
            </div>
        </div>

    );
};

export const employeeData = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    gender: 'Male',
    dateOfBirth: new Date('1990-05-15T00:00:00Z'),
    hireDate: new Date('2015-06-01T00:00:00Z'),
    jobTitle: 'Software Engineer',
    department: 'Engineering',
    salary: 80000,
    managerId: 2,
    status: 'Active',
    address: '123 Main St, Apartment 4B',
    city: 'New York',
    postalCode: '10001',
    employmentType: 'Full-time',
    notes: 'N/A',
    img: 'https://randomuser.me/api/portraits/men/1.jpg',
    country: 'USA',
    education: 'Bachelor of Science in Computer Science',
    photoKtp: '',
    photo3x4: '',
    photoIjasah: '',
    userId: 'user123',
    createdAt: new Date('2015-06-01T12:00:00Z'),
    updatedAt: new Date('2025-02-11T15:00:00Z'),
};