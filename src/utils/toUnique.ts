export function toUnique<T>(data1: T[], data2: T[]) {
 return [ ...new Set([ ...data1, ...data2 ]) ]
}
