import { UserZodType } from "@/validation/user.valid";

export const userExample: UserZodType = {
    address: "123 Elm Street, Springfield, USA", // Example address
    email: "john.doe@example.com", // Example email
    name: "John Doe", // Valid name between 1 and 100 characters
    password: "StrongP@ssword123", // Example password
    phone: "+62-123-456-7890", // Example phone
    role: "Admin", // Example role
};
export const userExampleComplete =
    {
        name: "John Doe",
        id: "user_001",
        phone: "+1234567890",
        address: "123 Main Street, New York, NY",
        email: "john.doe@example.com",
        password: "hashed_password_123",
        role: "admin",
        otp: "123456",
        otpCount: 1,
        otpRegenerate: new Date("2025-01-15T10:00:00Z"),
        otpExpired: new Date("2025-01-15T10:05:00Z"),
        status: "active",
    }
