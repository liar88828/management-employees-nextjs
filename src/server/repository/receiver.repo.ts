import { prisma } from "@/config/prisma";
import { CustomerSearch, TReceiverCreate } from "@/interface/entity/receiver.model";
import { InterfaceRepository, ParamsApi } from "@/interface/server/InterfaceRepository";
import { Customers, Users } from "@prisma/client";

export type CustomerParams = ParamsApi<CustomerSearch>
export default class CustomerRepository implements InterfaceRepository<TReceiverCreate> {

    async findAll({ filter, pagination: { page = 1, limit = 20 } }: Required<CustomerParams>) {

		const skip = (page - 1) * limit;
		const take = limit;
		const data = await prisma.customers.findMany({
			where: {
				AND: [
					{
						...(filter.name ? { name: { contains: filter.name, } } : {}),
						...(filter.address ? { address: { contains: filter.address, } } : {}),
						...(filter.phone ? { phone: { contains: filter.phone, } } : {}),
					}
				],
			},
			skip,
			take,
		});
		return { data: data, page, limit: limit };

	}

	async findById(id: string): Promise<any> {
		return prisma.customers.findUnique({ where: { id } });
	}

    async findUser(user: Users): Promise<Customers> {
        return prisma.$transaction(async (tx) => {
            const found = await tx.customers.findUnique({ where: { id: user.id } });

            if (!found) {
                return tx.customers.create({
                    data: {
                        address: user.address,
                        phone: user.phone,
                        name: user.name,
                        id: user.id,
                    }
                });
            }
            return found;
        })
    }

	async createOne(data: TReceiverCreate): Promise<any> {
		return prisma.customers.create({ data: { ...data } });
	}

	async updateOne(data: TReceiverCreate, id: string): Promise<any> {
		return prisma.customers.update({ data: { ...data }, where: { id } });
	}

	async deleteOne(id: string): Promise<any> {
		return prisma.customers.delete({ where: { id } });
	}

	setOne(d: (TReceiverCreate) & { id?: string }) {
		return {
			// ...(d.id ? { id: d.id, } : {}),
			name: d.name,
			address: d.address,
			phone: d.phone,
		}
	}

	setMany(data: TReceiverCreate[]): any[] {
		return data.map((d) => (this.setOne(d)))
	}

	async updateMany(data: TReceiverCreate[], id: string) {
		return prisma.customers.updateMany({
			where: { id: id },
			data: this.setMany(data)
		})
	}
}
