import {
    ForgetFormSchemaType,
    ResetFormSchemaType,
    SignInFormSchemaType,
    SignUpFormSchemaType
} from "@/validation/auth.valid";

export const signUpExample: SignUpFormSchemaType = {
    id: "677a4c56-4bb8-8013-9ecf-f55b8dd2414c", // Optional
    address: "123 Main Street, Springfield, USA",
    email: "user@example.com",
    name: "John Doe",
    password: "securePassword123",
    confirm: "securePassword123",
    phone: "+62-234-567-8901",
}

export const signInExample: SignInFormSchemaType = {
    email: "user@example.com",
    password: "securePassword123",
}

export const forgetExample: ForgetFormSchemaType = {
    email: "user@example.com",
}

export const resetExample: ResetFormSchemaType = {
    email: "user@example.com",
    password: 'password12345',
    confirm: 'password12345'
}


