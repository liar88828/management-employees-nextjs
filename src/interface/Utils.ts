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
export type TRes<T> = { msg: string, data: T }
export type TStatusOrder = 'Fail' | 'Complete' | 'Pending'
export type STATUS_EMPLOYEE = 'UnRegister' | 'Register' | 'Interview' | 'Accept' | 'Reject'
// const data = <T extends ToModel>( to: T ): T => {
//   return to;
// };
// data<'table'>( 'table' )

export type SearchParams = { searchParams: { page?: string, take?: string, id?: string } };

