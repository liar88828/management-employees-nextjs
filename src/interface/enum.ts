export enum ROLE {
    USER = "USER",
    ADMIN = "ADMIN"
}

export enum STATUS_USER {
    OTP = 'OTP',
    RESET = 'RESET',
    COMPLETED = 'COMPLETED',
}

export enum STATUS_EMPLOYEE {
    Create = 'Create',
    Registration = 'Registration',
    Reject = 'Reject',
    Accept = 'Accept',
    // Interview = 'Interview',
    // Interview_Accept = 'Interview_Accept',
    // Interview_Reject = 'Interview_Reject',
    // Active = 'Active',
    // Disabled = 'Disabled',
    // Resign = 'Resign',
}

// export const employeeList = [ 'Pending', 'Fail', 'Complete', 'Active', 'Disabled' ]
export const StatusEmployeeList = [
    'Registration',
    // 'Reject',
    'Accept',
    // 'Interview',
    // 'Interview_Accept',
    // 'Interview_Reject',
    // 'Active',
    // 'Disabled',
    // 'Resign',
];

export const EmployeeCompletePhoto =
    {
        'Select All': 'Select All',
        'Complete': 'Complete',
        'Not Completed': 'Not Completed',
    }
export type EmployeeCompletePhotoType = keyof typeof EmployeeCompletePhoto
