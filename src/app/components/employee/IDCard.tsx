'use client'
import {Camera, Printer} from 'lucide-react';
import {TEmployeeDB} from "@/interface/entity/employee.model";
import {toDateIndo} from "@/utils/toDate";
import {usePrint} from "@/hook/usePrint";
import React from "react";

interface IDCardProps {
    employee: TEmployeeDB
}

export default function EmployeeIDCardInterview({employee}: IDCardProps) {
    const {isPrinting, handlePrint, contentRef} = usePrint()
    return (
        <div>
            <p>12cm x 9.5cm</p>
            <div ref={contentRef}
                 className="p-2 space-y-2">
                <div
                    className="h-[12cm] w-[9.5cm] bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Card Header */}
                    <div className="bg-blue-600 p-4 text-center">
                        <h1 className="text-white text-2xl font-bold">COMPANY NAME</h1>
                        <p className="text-blue-100">Employee Interview</p>
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                        {/* Photo and Edit Button */}
                        <div className="flex justify-between items-start mb-6">
                            <div className="relative">
                                {employee.phone ? (
                                    <img
                                        src={employee.phone}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-lg object-cover border-2 border-gray-300"
                                    />
                                ) : (
                                    <div
                                        className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center border-2 border-gray-300">
                                        <Camera size={48} className="text-gray-400"/>
                                    </div>
                                )}
                            </div>
                        </div>


                        <div className="space-y-4">
                            <div className="text-4xl font-bold">{employee.name}</div>
                            {/*<div className="text-gray-600">{employee.role}</div>*/}
                            <div className="border-t border-b border-gray-200 py-3 space-y-2">
                                {/*<div className="flex justify-between">*/}
                                {/*    <span className="text-gray-500">ID:</span>*/}
                                {/*    <span className="font-medium">{employee.id}</span>*/}
                                {/*</div>*/}
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Job:</span>
                                    <span className="font-medium">{employee.jobTitle}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Join :</span>
                                    <span className="font-medium">{toDateIndo(employee.createdAt)}</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/*/!* Card Footer *!/*/}
                    {/*<div className="bg-gray-50 p-4 text-center border-t border-gray-200">*/}
                    {/*    <div className="text-sm text-gray-500">*/}
                    {/*        This ID card is the property of Company Name.<br/>*/}
                    {/*        If found, please return to 123 Company Street.*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                <button
                    onClick={handlePrint}
                    disabled={isPrinting}
                    className={'btn btn-info'}
                >
                    {isPrinting ? 'Printing...' : <Printer/>}
                </button>
            </div>
        </div>


    );
}