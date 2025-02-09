import { InterfaceController } from "@/interface/server/InterfaceController"
import { TContext } from "@/interface/server/param"
import { NextRequest } from "next/server"
import { getId, getJson, getParams, getParamsBool, getParamsValue } from "@/utils/requestHelper"
import { ProductCreate, ProductUpdateStock } from "@/validation/product.valid";
import { PRODUCT_FILTER_PRICE, ResponseProductType, UpdateStock } from "@/interface/entity/product.model";
import ProductRepository from "@/server/repository/product.repo";
import { prisma } from "@/config/prisma";
import { THistoryOrder } from "@/interface/entity/transaction.model";
import { authApi } from "@/server/lib/api";
import { UUIDSchema } from "@/validation/zod.valid";

export default class ProductController
    implements InterfaceController {
    constructor(private productRepository: ProductRepository) {
    }

    async findAll(request: NextRequest, __: TContext): Promise<any> {
        return this.productRepository.findAll({
                filter: {
                    location: getParams(request, "location"),
                    type: getParams(request, "type"),
                    name: getParams(request, "name"),
                    new: getParamsBool(request, "new"),
                    popular: getParamsBool(request, "popular"),
                    price: getParamsValue<PRODUCT_FILTER_PRICE>(request, "price", PRODUCT_FILTER_PRICE.NORMAL),
                    // related: getParamsBool(request, "related"),
                },
                pagination: {
                    page: Number(getParams(request, 'page') ?? "1"),
                    limit: Number(getParams(request, 'limit') ?? "100")
                }
            }
        )
    }

    async findHomeUser(request: NextRequest, _context: TContext): Promise<any> {
        return this.productRepository.findHomeUser()
    }

    async findById(_: NextRequest, context: TContext): Promise<any> {
        const id = await getId(context)
        return this.productRepository.findById(
            // id
            UUIDSchema.parse(id)
        )
    }

    async findHistory(_: NextRequest, context: TContext): Promise<THistoryOrder[]> {
        const id = await getId(context)
        return prisma.orders.findMany(
            {
                include: {
                    Customers: {
                        select: {
                            name: true
                        }
                    }
                },
                take: 10,
                where: {
                    Trolleys: {
                        every: {
                            id_product: id
                        }
                    }
                }
            }
        )
    }

    async findRecent(_: NextRequest, _context: TContext): Promise<any> {
        return this.productRepository.findRecent()
    }

    async findType(): Promise<ResponseProductType[]> {
        // @ts-ignore
        return prisma.products.groupBy({ by: [ 'type' ] });
    }

    async createOne(request: NextRequest, _context: TContext): Promise<any> {
        await authApi(request, true)
        const json = await getJson(request)
        return this.productRepository.createOne(ProductCreate.parse(json))
    }

    async updateOne(request: NextRequest, context: TContext): Promise<any> {
        await authApi(request, true)
        const id = await getId(context)
        const json = await getJson(request)
        return this.productRepository.updateOne(
            ProductCreate.parse(json),
            UUIDSchema.parse(id)
        )
    }

    async updateStock(request: NextRequest, context: TContext): Promise<any> {
        await authApi(request, true)
        const id: string = await getId(context)
        const json: Omit<UpdateStock, 'id'> = await getJson(request)
        return this.productRepository.updateStock(
            ProductUpdateStock.parse({ ...json, id }),
        )
    }

    async deleteOne(request: NextRequest, context: TContext) {
        await authApi(request, true)
        const id = await getId(context)
        // if (res) {
        // await fileSystem( res.img )
        // }
        return await this.productRepository.deleteOne(
            // UUIDSchema.parse(id)
            UUIDSchema.parse(id)
        )
    }
}
