import { Certifications, Employees, Languages, Projects, Skills } from "@prisma/client";
import { STATUS_EMPLOYEE } from "@/interface/Utils";

export type TEmployeeDB = Employees & {
    status: STATUS_EMPLOYEE;
    skills: Skills[];
    languages: Languages[];
    certifications: Certifications[];
    projects: Projects[];
    createdAt: Date;
    updatedAt: Date;
};

export type TEmployeeSearch = {
    name: string
    status: STATUS_EMPLOYEE | string
} & { page?: number };


export type EmployeeCreate =
    Omit<Employees, 'updatedAt' | 'createdAt' | 'id' | 'managerId' | 'photoKtp' | 'photo3x4'
        | 'status'
    >
    & {
    status: STATUS_EMPLOYEE
    skills: Pick<Skills, 'text'>[];
    languages: Pick<Languages, 'text'>[];
    certifications: Pick<Certifications, 'text'>[];
    projects: Pick<Projects, 'text'>[];
};

export interface EmployeeCVProps {
    employee: TEmployeeDB;
}

export const ktp = 'https://dummyimage.com/400x300/000/ffffff.jpg';
export const i3x4 = 'https://dummyimage.com/300x400/000/ffffff.jpg';

export enum EMPLOYEE {
    KEY = "employee_query",
}
