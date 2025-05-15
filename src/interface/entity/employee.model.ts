import { Educations, Employees, Skills } from "@prisma/client";
import { STATUS_EMPLOYEE } from "@/interface/Utils";
import { UserClient } from "@/interface/entity/user.model";
import { ParamsApi } from "@/interface/server/InterfaceRepository";

export type TEmployeeSearch = {
    name: string
    status: STATUS_EMPLOYEE | string
} & { page?: number };

export type EmployeeCreate =
    Omit<Employees, 'updatedAt' | 'createdAt' | 'id' | 'managerId' | 'photoKtp' | 'photo3x4' | "photoIjazah" | 'userId'>
    &
    {
        phone: string
        email: string,
        name: string,
        userId: string
        status: string | STATUS_EMPLOYEE
        skills: Pick<Skills, 'text'>[];
        // languages: Pick<Languages, 'text'>[];
        educations: Pick<Educations, 'text'>[];
    }

export const imageDefault = 'https://dummyimage.com/300x300/000/ffffff.jpg';
export const photoKtp = 'https://dummyimage.com/400x300/000/ffffff.jpg';
export const i3x4 = 'https://dummyimage.com/300x400/000/ffffff.jpg';
export const photoIjazah = 'https://dummyimage.com/297x210/000/ffffff.jpg';

type EmployeeClient = Employees & UserClient

export type EmployeeUserClient = Employees & { User: UserClient }

export type EmployeeUserClientLatter = Employees & {
    User: UserClient
    // LetterEmployees: LetterEmployees[]
}

export type TEmployeeDB = EmployeeUserClient & {
    status: string | STATUS_EMPLOYEE;
    Skills: Skills[];
    Educations: Educations[];
    // languages: Languages[];
    createdAt: Date;
    updatedAt: Date;
}
export type EmployeeParams = ParamsApi<TEmployeeSearch>
