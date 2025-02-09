import { describe, expect, test } from "vitest"
import { orderCreateServer } from "../../../src/validation/order.valid"
import { OrderProductTransaction } from "../../../src/validation/orderProduct.valid"
import { ReceiverCreate } from "../../../src/validation/receiver.valid"
import { TOrderTransactionCreate } from "../../../src/interface/entity/transaction.model"
import { exampleOrderCreate, exampleOrderProductCreate, exampleReceiver } from "../../../src/assets/ExampleOrder";

describe("test Order all", () => {
	test("Order test ", () => {
        const data = orderCreateServer.parse(exampleOrderCreate)
        expect(data).toEqual(exampleOrderCreate)
	})

	test("OrderProduct test ", () => {

        const data = OrderProductTransaction.parse(exampleOrderProductCreate)
        expect(data).toEqual(exampleOrderProductCreate)
	})

	test("Receiver test ", () => {
        const data = ReceiverCreate.parse(exampleReceiver)
        expect(data).toEqual(exampleReceiver)
	})

    test("order complete", () => {
        const json: TOrderTransactionCreate = {
            orderReceiver: exampleReceiver,
            orderTrolley: exampleOrderProductCreate,
            order: exampleOrderCreate
		}

        const data: TOrderTransactionCreate = {
			order: orderCreateServer.parse(json.order),
			orderTrolley: OrderProductTransaction.parse(json.orderTrolley),
			orderReceiver: ReceiverCreate.parse(json.orderReceiver),
		}
		expect(data).toEqual(json)
	})
})
