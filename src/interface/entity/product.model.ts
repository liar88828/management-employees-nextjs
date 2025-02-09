import { Products } from "@prisma/client";
import { ParamsApi } from "@/interface/server/InterfaceRepository";

export type TProductDB = Products
export type ProductParams = ParamsApi<ProductSearch>
export type ResponseProductType = { type: string }
export type TProductCreate = Omit<Products, 'id' | "created_at" | "updated_at" | 'sold' | 'update_stock'>;

export type ProductSearch = {
    location?: string,
    type?: string,
    name?: string,
    price?: PRODUCT_FILTER_PRICE,
    // related?:boolean,
    popular?: boolean,
    new?: boolean,
};

export type UpdateStock = Pick<TProductDB, 'qty' | 'id'>;
export type ProductHomeUser = {
    // newProduct: TProductDB[],
    popularProduct: TProductDB[],
    lowPriceProduct: TProductDB[],
};
// export type TProductUpdate = Omit<Products, "created_at" | "updated_at">;

export enum PRODUCT {
    KEY = 'product_query',
    TYPE = 'type'
}

export enum PRODUCT_FILTER_PRICE {
    NORMAL = "NORMAL",
    HIGH = "HIGH",
    LOW = "LOW",
}
