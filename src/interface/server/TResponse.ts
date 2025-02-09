export type TResponse<T> = {
  msg: string,
  success: boolean,
  data: any | T,
  code: number
};