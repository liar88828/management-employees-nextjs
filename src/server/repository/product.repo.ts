import {
    PRODUCT_FILTER_PRICE,
    ProductHomeUser,
    ProductParams,
    TProductCreate,
    TProductDB,
    UpdateStock
} from "@/interface/entity/product.model";
import { prisma } from "@/config/prisma";
import { ResponseAll } from "@/interface/server/param";
import { InterfaceRepository } from "@/interface/server/InterfaceRepository";

export default class ProductRepository implements InterfaceRepository<TProductCreate> {

    async findAll({
                      filter,
                      pagination: { page = 1, limit = 20 }
                  }: Required<ProductParams>,): Promise<ResponseAll<TProductDB>> {
        const skip = ( page - 1 ) * limit;
        const take = limit;
        const products = await prisma.products.findMany({
            orderBy: [
                filter.new ? { updated_at: 'desc' } : {},
                filter.popular ? { sold: 'desc' } : {},
                filter.price === PRODUCT_FILTER_PRICE.HIGH ? { price: 'desc' }
                    : filter.price === PRODUCT_FILTER_PRICE.LOW ? { price: 'asc' }
                        : {},
            ],
            where: {
                AND: [
                    {
                        ...( filter.location ? { location: { contains: filter.location, } } : {} ),
                        ...( filter.name ? { name: { contains: filter.name, } } : {} ),
                        ...( filter.type ? { type: { contains: filter.type, } } : {} ),
                    }
                ],
            },
            skip,
            take,
        });
        return { data: products, page, limit };

    }

    async findById(id: string): Promise<any> {
        return prisma.products.findUnique({ where: { id } });
    }

    async findRecent(): Promise<any> {
        return prisma.products.findMany({
            orderBy: {
                updated_at: 'desc'
            },
            take: 5
        });
    }

    async findHomeUser(): Promise<ProductHomeUser> {
        const popularProduct = await prisma.products.findMany({
            take: 20,
            orderBy: {
                sold: 'desc'
            }
        })
        const lowPriceProduct = await prisma.products.findMany({
            take: 20,
            orderBy: {
                price: 'asc'
            }
        })
        return {
            popularProduct,
            lowPriceProduct
        }
    }

    async createOne(data: TProductCreate): Promise<any> {
        return prisma.products.create({ data: { ...data } });
    }

    async updateOne(data: TProductCreate, id: string): Promise<any> {
        return prisma.products.update({ data: { ...data }, where: { id } });
    }

    async updateStock(data: UpdateStock): Promise<any> {
        return prisma.products.update({
            where: { id: data.id },
            data: {
                update_stock: new Date(),
                qty: { increment: data.qty }
            }
        })
    }

    async deleteOne(id: string): Promise<any> {
        return prisma.products.delete({ where: { id } });
    }

    setOne(d: ( TProductCreate ) & { id?: string }) {
        return {
            // ...(d.id ? { id: d.id, } : {}),
            name: d.name,
            type: d.type.replaceAll(" ", ""),
            location: d.location.replaceAll(" ", ""),
            price: d.price || 0,
            desc: d.desc,
            qty: d.qty || 0,
            img: d.img || "https://dummyimage.com/200x200/000/fff.jpg&text=not+found",
        }
    }

    setMany(data: TProductCreate[]): any[] {
        return data.map((d) => ( this.setOne(d) ))
    }

    async updateMany(data: TProductCreate[], id: string) {
        return prisma.products.updateMany({
            where: { id: id },
            data: this.setMany(data)
        })
    }
}
