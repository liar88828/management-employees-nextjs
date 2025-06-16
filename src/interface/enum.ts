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


export const STATUS_EMPLOYEES = {
	Create: 'Create',
	Registration: 'Registration',
	Reject: 'Reject',
	Accept: 'Accept',
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
export type ToModel =
	"table"
	| "payment"
	| "orderan"
	| "product"
	| "travel"
	| "dashboard"
	| 'order'
	| 'transaction'
	| 'not implement'
	| 'delivery'
	| 'trolley'
	| 'receiver'
	| 'employee'
	| "user"
	| 'ceremony'
	| 'test'
	| "auth"
	| 'otp'
export type TMethod = "PUT" | "POST" | "GET" | "DELETE" | "PATCH";
// noinspection JSUnusedGlobalSymbols
export type TStatusOrder = 'Fail' | 'Complete' | 'Pending'

export  type MethodProps = 'POST' | "PUT"
