import { Employees } from "@prisma/client";
import { TEmployeeDB } from "@/interface/entity/employee.model";

export type EmployeeClientExample = Employees & {
    educations: { text: string } [],
    skills: { text: string }[],
};
export const _employeeClientExample = {
    userId: "",
    // userName: "John Doe",
    // email: "johndoe@example.com",
    // phone: "+1-123-456-7890",
    gender: "Male",
    dateOfBirth: new Date("1990-01-15"),
    hireDate: new Date("2022-06-01"),
    jobTitle: "Software Engineer",
    // position: "IT",
    salary: 75000,
    // managerId: 101,
    status: "Active",
    address: "123 Elm Street",
    city: "Springfield",
    postalCode: "12345",
    workTime: "Full-Time",
    notes: "Great team player with excellent problem-solving skills.",
    img: "https://example.com/images/johndoe.jpg",
    // country: "USA",
    educations: [
        { text: "Bachelor's Degree in Computer Science", },
    ],
    skills: [
        { text: "JavaScript" },
        { text: "TypeScript" },
        { text: "React" },
    ],
    // languages: [
    //     { text: "English" },
    //     { text: "Spanish" },
    // ],
};
// : RegistrationDatabaseCreateServer & { status: 'Create' }
export const employeeServerExample: TEmployeeDB = {
    userId: "",
    // userName: "Jane Doe",
    // email: "janedoe@example.com",
    // phone: "082-987-654-3210",
    gender: "Female", // Example gender value
    dateOfBirth: new Date("1988-03-25"),
    hireDate: new Date("2023-01-15"),
    jobTitle: "Senior Developer",
    // position: "Engineering",
    salary: 95000,
    status: "Create", // Must be one of: 'Fail', 'Complete', 'Pending', 'Active', 'Disabled'
    address: "456 Oak Avenue",
    city: "Metropolis",
    postalCode: "54321",
    workTime: "Full-Time", // Example value
    notes: "Detail-oriented and highly skilled in software development.",
    img: "https://example.com/images/janedoe.jpg",
    // country: "USA",
    registration: false,
    photo_iv: "",
    id: "",
    photoKtp: "",
    photoIjazah: "",
    createdAt: new Date(),
    sendEmail: 123,
    updatedAt: new Date(),
    User: {
        id: "",
        status: "",
        phone: "",
        role: "",
        name: "",
        email: "",
    },
    Educations: [
        {
            text: "",
            id: 1,
            employeesId: ""
        },
    ],
    Skills: [
        {
            text: "Python",
            employeesId: "",
            id: 1,
        },
        {
            text: "Machine Learning",
            employeesId: "",
            id: 1,
        },
        {
            text: "Data Analysis",
            employeesId: "",
            id: 1,
        },
    ],
    // languages: [
    //     { text: "English" },
    //     { text: "German" },
    // ],

}
