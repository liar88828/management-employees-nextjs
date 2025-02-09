import { expect, test } from "vitest"
import { exampleDeliveryCreate } from "../../../src/assets/deliveryExample"
import { DeliveryCreate } from "../../../src/validation/delivery.valid"

test("Delivery valid test", () => {
    const data = DeliveryCreate.parse(exampleDeliveryCreate)
    expect(data).toEqual(exampleDeliveryCreate)
})
