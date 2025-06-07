// import { Employees, LetterEmployees } from "@prisma/client";

export type LetterForm = {
    id: string;
    // employeesId: string;
    interviewDate: string
    interviewDay: string
    interviewTime: string
    interviewLocation: string
    dressCode: string
    signerName: string
    createdAt: Date
    // LetterEmployees: LetterEmployees[]
}

// export type LetterEmployee = Omit<LetterForm, 'LetterEmployees'> & { Employees: Employees[] };
// export type CombineLatterEmployees = LetterForm & {
//     LetterEmployees: ( LetterEmployees & {
//         employee: EmployeeUserClient | undefined
//
//     } )[]
// }
