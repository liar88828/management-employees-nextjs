import { expect, test } from "vitest";
import { productExample } from "../../../src/assets/product.example";
import { ProductCreate } from "../../../src/validation/product.valid";

test("Product valid test", () => {
    const data = ProductCreate.parse(productExample)
    expect(data).toEqual(productExample)
})
