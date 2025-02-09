export type TPagination = { page?: number, limit?: number }
export type ParamsApi<T> = { filter?: T, pagination: TPagination }

export interface InterfaceRepository<T> {

	findAll(params:ParamsApi<object>): Promise<any>;

    findById(id: string | number): Promise<any>;

	createOne(data: T,): Promise<any>;

    updateOne(data: T | any, id: string | number): Promise<any>;

    deleteOne(id: string | number): Promise<any>;

}