import { DeliveryParams, TDeliveryCreate, } from "@/interface/entity/delivery.model";
import { prisma } from "@/config/prisma";
import { InterfaceRepository } from "@/interface/server/InterfaceRepository";

// getAll data from database
export default class DeliveryRepository implements InterfaceRepository<TDeliveryCreate> {

    async findAll({ filter, pagination: { page = 1, limit = 20 } }: Required<DeliveryParams>) {
        const skip = ( page - 1 ) * limit;
        const take = limit;
        const delivery = await prisma.deliverys.findMany(
            {
                skip,
                take,
                where: {
                    AND: [
                        {
                            ...( filter.address ? { address: { contains: filter.address, } } : {} ),
                            ...( filter.name ? { name: { contains: filter.name, } } : {} ),
                            ...( filter.type ? { type: { contains: filter.type, } } : {} ),
                        }
                    ],
                }
            }
        );
        return { data: delivery, page, limit };
    }

    async findById(id: string) {
        return prisma.deliverys.findUnique({ where: { id } });
    }

    async createOne(data: TDeliveryCreate) {
        return prisma.deliverys.create({ data: { ...data } });
    }

    async updateOne(data: any, id: string) {
        return prisma.deliverys.update({ data: { ...data }, where: { id } });

    }

    async deleteOne(id: string) {
        return prisma.deliverys.delete({ where: { id } });
    }

    setOne(d: ( TDeliveryCreate ) & { id?: string }) {
        return {
            // ...(d.id ? { id: d.id } : {}),
            type: d.type,
            price: d.price,
            address: d.address,
            desc: d.desc,
            name: d.name,
            phone: d.phone,
            img: d.img || "https://dummyimage.com/200x200/000/fff.jpg&text=not+found",
        }
    }

    setMany(data: TDeliveryCreate []) {
        return data.map((d) => ( this.setOne(d) ))
    }

    async createMany(data: TDeliveryCreate[]) {
        return prisma.deliverys.createMany({
            data: this.setMany(data)
        });
    }

    async updateMany(data: TDeliveryCreate[], id: string) {
        return prisma.deliverys.updateMany({
            where: { id },
            data: this.setMany(data)
        })
    }

    async deleteMany(id: string) {
        return prisma.deliverys.deleteMany({ where: { id } })

    }

}
