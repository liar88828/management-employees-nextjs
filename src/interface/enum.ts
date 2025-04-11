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
    Registration = 'Registration',
    Interview = 'Interview',
    Accept = 'Accept',
    Reject = 'Reject',
    Active = 'Active',
    Disabled = 'Disabled',
    Resign = 'Resign',
}

// export const employeeList = [ 'Pending', 'Fail', 'Complete', 'Active', 'Disabled' ]
export const employeeListStatus = [
    'Registration',
    'Interview',
    'Accept',
    'Reject',
    'Active',
    'Disabled',
    'Resign', ];