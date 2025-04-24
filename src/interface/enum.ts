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
    Create = 'Create',
    Registration = 'Registration',
    Registration_False = 'Registration_False',
    Interview = 'Interview',
    Interview_Accept = 'Interview_Accept',
    Interview_Reject = 'Interview_Reject',
    Active = 'Active',
    Disabled = 'Disabled',
    Resign = 'Resign',
}

// export const employeeList = [ 'Pending', 'Fail', 'Complete', 'Active', 'Disabled' ]
export const employeeListStatus = [
    'Registration',
    'Registration_False',
    'Interview',
    'Interview_Accept',
    'Interview_Reject',
    'Active',
    'Disabled',
    'Resign', ];

export const EmployeeCompletePhoto =
    {
        'Select All': 'Select All',
        'Complete': 'Complete',
        'Not Completed': 'Not Completed',
    }
export type EmployeeCompletePhotoType = keyof typeof EmployeeCompletePhoto
