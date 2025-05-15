export type TypeProperty<T, K extends keyof T> = T[K];
interface typeObject {
  name: string,
  age: number,
}

// const name_: TypeProperty<typeObject, "userName"> = "brian";
// const age: TypeProperty<typeObject, "age">    = 20;

export type PropertyMap<T> = { [K in keyof T]: any };
