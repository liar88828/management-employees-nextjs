import { PaymentParams, TPaymentCreate, } from "@/interface/entity/payment.model";
import { prisma } from "@/config/prisma";
import { InterfaceRepository } from "@/interface/server/InterfaceRepository";

export class PaymentRepository implements InterfaceRepository<TPaymentCreate> {

    async findAll({ filter, pagination: { page = 1, limit = 20 } }: Required<PaymentParams>) {
		const skip = (page - 1) * limit;
		const take = limit;
		const payments = await prisma.payments.findMany(
			{
				skip,
				take,
				where: {
					AND: [
						{
							...(filter.address ? { address: { contains: filter.address, } } : {}),
							...(filter.name ? { name: { contains: filter.name, } } : {}),
							...(filter.type ? { type: { contains: filter.type, } } : {}),
						}
					],
				}
			}
		);
		return { data: payments, page, limit };

    }

    async findOne(id: string) {
		return prisma.payments.findFirst({ where: { id } });
	}

    async findById(id: string) {
		return prisma.payments.findUnique({ where: { id } });
	}

    async deleteOne(id: string) {
		return prisma.payments.delete({ where: { id } })
	}

    async createOne(data: TPaymentCreate) {
		return prisma.payments.create({ data: { ...data } })
	}

    async updateOne(data: TPaymentCreate, id: string) {
		return prisma.payments.update({
			where: { id: id }, data: { ...data }
		})
	}

    async createMany(data: TPaymentCreate[]) {
		return prisma.payments.createMany({
			data: this.setMany(data)
		});
	}

    async destroyMany(id: string) {
		return prisma.payments.deleteMany({ where: { id } })
	}

    async updateMany(data: TPaymentCreate[], id: string) {
		return prisma.payments.updateMany({
			where: { id: id },
			data: this.setMany(data)
		})
	}

    setOne(d: TPaymentCreate & { id?: string }) {
		return {
			// ...(d.id ? { id: d.id } : {}),
			type: d.type,
			address: d.address,
			desc: d.desc,
			name: d.name,
			accounting: d.accounting,
			phone: d.phone,
			img: d.img || "https://dummyimage.com/200x200/000/fff.jpg&text=not+found",
		}
	}

    setMany(data: TPaymentCreate[]) {
		return data.map((d) => (this.setOne(d)))
	}

}
