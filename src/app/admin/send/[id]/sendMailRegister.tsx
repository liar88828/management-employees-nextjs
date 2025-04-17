'use client'
import React from 'react';
import { nodemailerSendRegister } from "@/server/controller/nodemailer.controller";
import { EmployeeUserClient } from "@/interface/entity/employee.model";

function SendMailRegister({ employees }: { employees: EmployeeUserClient[] }) {
    return (
        <button
            className="btn btn-primary "
            onClick={ () => nodemailerSendRegister(employees) }
        >Send All Email </button>
    );
}

export default SendMailRegister;
