import React from "react";
import { Companys, Employees } from "@prisma/client";
import { toDateIndo } from "@/utils/toDate";
import Image from "next/image";

export const EmployeeIDCard = ({ employee, company }: { company: Companys, employee: Employees }) => (
    <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="">
            <h1>Depan</h1>
            <div className="card card-compact bg-white h-[10.2cm] w-[6.5cm] shadow-lg print:shadow-none">
                <div className="card-body ">
                    <div className="flex gap-6 items-center">
                        <Image
                            src={ company.img }
                            width={ 80 }
                            height={ 80 }
                            alt="logo"
                            className="size-12 rounded-full object-contain"
                        />
                        <h1 className={ 'text-sm font-bold' }>Cv. Pudji Lestari Sentosa</h1>
                        {/*<p className={''}>Maju Bersama</p>*/ }

                    </div>
                    <div className="flex justify-center mb-4 ">
                        <Image
                            src={ employee.img }
                            width={ 100 }
                            height={ 100 }
                            alt="Employee"
                            className="size-24 rounded-full "
                            // border-2 border-gray-300
                        />
                    </div>
                    <div className="text-center ">
                        <h2 className="text-lg font-bold text-gray-800 capitalize">{ employee.name }</h2>
                        <p className="text-xs ">{ employee.jobTitle } - { employee.department }</p>
                    </div>
                    <div className="mt-4 text-xs text-gray-600">
                        <div className="grid grid-cols-2  ">
                            <p>Phone :</p>
                            <p>{ employee.phone }</p>
                        </div>

                        <div className="grid grid-cols-2  ">
                            <p>Email :</p>
                            <p>{ employee.email }</p>
                        </div>


                        {/*<div className="flex justify-between text-xs text-gray-600 gap-10">*/ }
                        {/*    <p className={'text-nowrap'}>Address :</p>*/ }
                        {/*    <p className={'text-right'}>{ employee.address }, { employee.city }, { employee.postalCode }</p>*/ }
                        {/*</div>*/ }
                        {/*<div className="py-2"></div>*/ }

                        <div className="grid grid-cols-2">
                            <p>Hire Date:</p>
                            <p>{ toDateIndo(employee.hireDate) }</p>
                        </div>
                    </div>

                    <div className="mt-4 text-[9px] text-base/50 text-right h-full flex items-end justify-end ">
                        <p>{ employee.id }</p>
                    </div>
                    {/*<div className="mt-4 text-xs text-base/50 text-right">*/ }
                    {/*    <p>Created At: { toDateIndo(employee.createdAt) }</p>*/ }
                    {/*    <p>Updated At: { toDateIndo(employee.updatedAt) }</p>*/ }
                    {/*</div>*/ }
                </div>
            </div>
        </div>

        <div className="">
            <h1>Belakang</h1>
            <div className="card card-compact bg-white h-[10.2cm] w-[6.5cm] print:shadow-none">
                <div className="card-body ">
                    <h2 className="text-lg font-bold text-center text-blue-600 ">Visi & Misi PT. Maju Bangsa</h2>
                    <div className=" text-[9px] text-gray-600 space-y-2">
                        <div className=" ">
                            <h3 className=" text-sm font-bold text-gray-800">Visi</h3>
                            <p className=" mt-2">
                                Menjadi perusahaan terkemuka yang inovatif dan berdaya saing global dalam menciptakan
                                solusi
                                terbaik bagi masyarakat.
                            </p>
                        </div>
                        <div>
                            <h3 className=" text-sm font-bold text-gray-800">Misi</h3>
                            <ul className="list-disc list-inside  mt-2 space-y-2">
                                <li>Mengembangkan produk dan layanan berkualitas tinggi yang berorientasi pada kepuasan
                                    pelanggan.
                                </li>
                                <li>Meningkatkan kompetensi sumber daya manusia untuk menghadapi tantangan global.</li>
                                <li>Berinovasi dalam teknologi dan proses bisnis guna menciptakan efisiensi dan nilai
                                    tambah.
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        </div>
    </div>
);

