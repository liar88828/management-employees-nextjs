import { test } from "vitest";
import { prisma } from "../../src/config/prisma";

test("Product Can find by all ", async () => {
    const res = await prisma.products.groupBy({
        by: [ 'type' ]
    })
    console.log(res)
})
