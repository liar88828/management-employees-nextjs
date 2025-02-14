export enum ROLE {
    USER = "USER",
    ADMIN = "ADMIN"
}

export enum USER_STATUS {
    OTP = 'OTP',
    RESET = 'RESET',
    COMPLETED = 'COMPLETED',
}

export enum EMPLOYEE_STATUS {
    Pending = 'Pending',
    Interview = 'Interview',
    Complete = 'Complete',
    Fail = 'Fail',
    Active = 'Active',
    Disabled = 'Disabled',
}

// export const employeeList = [ 'Pending', 'Fail', 'Complete', 'Active', 'Disabled' ]
export const employeeListStatus = [ 'Pending', "Interview", "Complete", "Active", "Disabled", ];