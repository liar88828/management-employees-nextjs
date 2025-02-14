export type TResponse<T> = {
  msg: string,
  success: boolean,
  data: any | T,
  code: number
};

export interface ResponseData<T = any> {
    success: boolean
    data: T
    message: string
}