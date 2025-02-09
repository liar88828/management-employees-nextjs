import { TOrderTransactionCreate, TOrderTransactionDB } from "@/interface/entity/transaction.model";
import { OrderCreateAdmin } from "@/validation/order.valid";
import { OrderFormAdmin } from "@/store/order";

export const orderSanitize = (data: TOrderTransactionDB | undefined): OrderCreateAdmin | undefined => {
    if (!data || !data.Customers) return undefined; // Handle missing Customers gracefully

    const newData: OrderCreateAdmin = {
        id: data.id,
        id_customer: data.Customers.id,
        nameCs: data.Customers.name,
        phoneCs: data.Customers.phone,
        addressCs: data.address,
        desc: data.desc,
        nameDelivery: data.nameDelivery,
        phoneDelivery: data.phoneDelivery,
        priceDelivery: data.priceDelivery,
        namePayment: data.Payments?.name || 'N/A', // Ensure Payments exists
        // @ts-ignore
        orderTime: new Date(data.orderTime).toISOString().slice(0, 16),
        // @ts-ignore
        sendTime: new Date(data.sendTime).toISOString().slice(0, 16),
        status: data.status,
        totalPayment: data.totalPayment,
        totalProduct: data.Trolleys?.reduce((total, item) => {
            total = total + (item.Product.price * item.qty_at_buy);
            return total;
        }, 0) || 0, // Ensure Trolleys exists
        totalAll: data.totalAll,
    };

    return newData;
    // return {
    //     phoneCs: "",
    //     nameCs: "",
    //     id: '',
    //     id_customer: "",
    //     addressCs: '',
    //     desc: '',
    //     nameDelivery: '',
    //     phoneDelivery: '',
    //     priceDelivery: 0,
    //     namePayment: '',
    //     orderTime: new Date(),
    //     sendTime: new Date(),
    //     status: '',
    //     totalPayment: 0,
    //     totalAll: 0,
    //     totalProduct: 0,
    // }
}

export function orderTransactionSanitize(
    { delivery, order, receiver, payment, product }
    : OrderFormAdmin): TOrderTransactionCreate {

    if (!payment || !payment.id) {
        throw new Error('Payment is not complete');
    }
    if (!delivery || !delivery.id) {
        throw new Error('Delivery is not complete');
    }
    if (product.length === 0) {
        throw new Error('product is Empty');
    }
    return {
        orderReceiver: receiver,
        orderTrolley: product.map(d => (
            {
                id: d.id,
                qty_at_buy: d.qty_at_buy,
                price_at_buy: d.price_at_buy,
                id_user: order.id_customer,
                id_product: d.id_product
            } )),
        order: {
            id_customer: order.id_customer,
            address: order.addressCs,
            desc: order.desc,
            orderTime: order.orderTime,
            sendTime: order.sendTime,
            //
            id_delivery: delivery.id,
            nameDelivery: order.nameDelivery,
            phoneDelivery: order.phoneDelivery,
            priceDelivery: order.priceDelivery,
            //
            id_payment: payment.id,
            totalPayment: order.totalPayment,
            //
            totalAll: order.totalAll,
            status: order.status,
        }
    }
}
