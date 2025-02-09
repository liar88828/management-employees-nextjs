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


export type TMethod = "PUT" | "POST" | "GET" | "DELETE" | "PATCH";
export type TRes<T> = { msg: string, data: T }
export type TStatusOrder = 'Fail' | 'Complete' | 'Pending'
export type STATUS_EMPLOYEE = 'Fail' | 'Complete' | 'Pending' | 'Active' | 'Disabled'
// const data = <T extends ToModel>( to: T ): T => {
//   return to;
// };
// data<'table'>( 'table' )

export enum ROLE {
    USER = "USER",
    ADMIN = "ADMIN"
}

export enum USER_STATUS {
    OTP = 'OTP',
    RESET = 'RESET',
    COMPLETED = 'COMPLETED',
}

export type SearchParams = { searchParams: { page?: string, take?: string, id?: string } };

