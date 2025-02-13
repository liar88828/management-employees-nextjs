import { Employees, LetterEmployees } from "@prisma/client";

export const exampleData = {
    company: {
        name: "Tech Innovations Ltd.",
        address: "123 Silicon Valley, CA, USA",
        phone: "+1 555-1234-567",
        email: "contact@techinnovations.com",
    },
    employee: {
        name: "John Doe",
        address: "456 Maple Street, NY, USA",
    },
    form: {
        interviewDate: "2025-02-15",
        interviewDay: "Saturday",
        interviewTime: "10:00 AM",
        interviewLocation: "Tech Innovations HQ, Room 305",
        dressCode: "Business Formal",
        signerName: "Jane Smith",
    },
};

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
    LetterEmployees: LetterEmployees[]
}

export type LetterEmployee = Omit<LetterForm, 'LetterEmployees'> & { Employees: Employees[] };
