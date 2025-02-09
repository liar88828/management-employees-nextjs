import { describe, expect, test } from "vitest"
import { setIdBank, setIdDelivery, setIdOrderan, setIdProduct } from "../../../src/utils/toId";
import { deliveryExample } from "../../../src/assets/deliveryExample";
import { productExample } from "../../../src/assets/product.example";
import { examplePayment } from "../../../src/assets/ExamplePayment";
import { dataOrderTransactions } from "../../../src/assets/ExampleOrder";

describe('ToId Tests Utils', () => {

    test("setIdDelivery test", () => {

        const data = setIdDelivery(deliveryExample)
        const testText = data.split('1').shift()
        expect(testText).toContain('Lu_+')
    })

    test("setIdProduct test", () => {
        const data = setIdProduct(productExample)
        const testText = data.split('1').shift()
        expect(testText).toContain('Wi_99_Wa_El_A _')
    })

    test("setIdBank test", () => {
        const data = setIdBank(examplePayment)
        const testText = data.split('1').shift()
        expect(testText).toContain('Jo_Tr_+6_')
    })

    test("setIdOrderan test", () => {
        const data = setIdOrderan(dataOrderTransactions[0])
        const testText = data.split('1').shift()
        expect(testText).toContain('Alice_456__pr+6287')
    })

})
