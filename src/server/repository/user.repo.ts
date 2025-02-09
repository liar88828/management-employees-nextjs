import { prisma } from "@/config/prisma";
import { ResponseAll } from "@/interface/server/param";
import { Users } from "@prisma/client";
import { TUserCreate, UserSearch } from "@/interface/entity/user.model";
import { InterfaceRepository, ParamsApi } from "@/interface/server/InterfaceRepository";

export type UserParams = ParamsApi<UserSearch>

export default class UserRepository implements InterfaceRepository<TUserCreate> {

    async findAll(
        { filter, pagination: { page = 1, limit = 20 } }:
        Required<UserParams>): Promise<ResponseAll<Users>> {
		const skip = (page - 1) * limit;
		const take = limit;
		const data = await prisma.users.findMany({
			where: {
				AND: [
					{
						...(filter.name ? { name: { contains: filter.name, } } : {}),
					}
				],
			},
			skip,
			take,
		});
		return { data, page, limit };

	}

	async findById(id: string): Promise<any> {
		return prisma.users.findUnique({where: {id}});
	}

    async findByIdValid(id?: string) {
        const response = await prisma.users.findUnique({ where: { id } });
        if (!response) {
            throw new Error("User does not exist");
        }
        return response;
    }

    async createOne(data: TUserCreate): Promise<Users> {
		return prisma.users.create({data: {...data}});
	}

	async updateOne(data: TUserCreate, id: string): Promise<any> {
		return prisma.users.update({data: {...data}, where: {id}});
	}

	async deleteOne(id: string): Promise<any> {
		return prisma.users.delete({where: {id}});
	}

    async updateMany(data: TUserCreate[], id: string) {

    }
}
