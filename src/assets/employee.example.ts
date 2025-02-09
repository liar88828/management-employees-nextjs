import { EmployeeCreateZodClient, EmployeeCreateZodServer } from "@/validation/employee.valid";

export const employeeClientExample: EmployeeCreateZodClient = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1-123-456-7890",
    gender: "Male",
    dateOfBirth: new Date("1990-01-15"),
    hireDate: new Date("2022-06-01"),
    jobTitle: "Software Engineer",
    department: "IT",
    salary: 75000,
    // managerId: 101,
    status: "Active",
    address: "123 Elm Street",
    city: "Springfield",
    postalCode: "12345",
    employmentType: "Full-Time",
    notes: "Great team player with excellent problem-solving skills.",
    img: "https://example.com/images/johndoe.jpg",
    country: "USA",
    education: "Bachelor's Degree in Computer Science",
    skills: [
        { text: "JavaScript" },
        { text: "TypeScript" },
        { text: "React" },
    ],
    languages: [
        { text: "English" },
        { text: "Spanish" },
    ],
    certifications: [
        { text: "AWS Certified Developer" },
        { text: "Certified Scrum Master" },
    ],
    projects: [
        { text: "E-commerce Platform Development" },
        { text: "Real-time Chat Application" },
    ],
};

export const employeeServerExample: EmployeeCreateZodServer = {
    name: "Jane Doe",
    email: "janedoe@example.com",
    phone: "082-987-654-3210",
    gender: "Female", // Example gender value
    dateOfBirth: new Date("1988-03-25"),
    hireDate: new Date("2023-01-15"),
    jobTitle: "Senior Developer",
    department: "Engineering",
    salary: 95000,
    status: "Active", // Must be one of: 'Fail', 'Complete', 'Pending', 'Active', 'Disabled'
    address: "456 Oak Avenue",
    city: "Metropolis",
    postalCode: "54321",
    employmentType: "Full-Time", // Example value
    notes: "Detail-oriented and highly skilled in software development.",
    img: "https://example.com/images/janedoe.jpg",
    country: "USA",
    education: "Master's Degree in Software Engineering",
    skills: [
        { text: "Python" },
        { text: "Machine Learning" },
        { text: "Data Analysis" },
    ],
    languages: [
        { text: "English" },
        { text: "German" },
    ],
    certifications: [
        { text: "Certified Kubernetes Administrator" },
        { text: "Google Professional Cloud Architect" },
    ],
    projects: [
        { text: "AI-Powered Recommendation System" },
        { text: "Cloud Infrastructure Automation" },
    ],
}
