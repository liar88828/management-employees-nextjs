import { TProductDB } from "@/interface/entity/product.model";
import { TDeliveryDB } from "@/interface/entity/delivery.model";
import { TPaymentDB } from "@/interface/entity/payment.model";
import { TOrderTransactionDB } from "@/interface/entity/transaction.model";

// Travel
export const setIdDelivery = (data: TDeliveryDB): string =>
    data.name.slice(0, 2) + "_" +
    data.phone.toString().slice(0, 2) + "_" +
    data.address.slice(0, 2) + "_" +
    data.type.slice(0, 2) + "_" +
    data.desc.slice(0, 2) + "_" +
    Date.now();

// product
export const setIdProduct = (data: TProductDB): string =>
    data.name.slice(0, 2) + "_" +
    data.price.toString().slice(0, 2) + "_" +
    data.location.slice(0, 2) + "_" +
    data.type.slice(0, 2) + "_" +
    data.desc.slice(0, 2) + "_" +
    Date.now();

// bank
export const setIdBank = (data: TPaymentDB): string =>
    data.name.slice(0, 2) + "_" +
    data.accounting.toString().slice(0, 2) + "_" +
    data.phone.toString().slice(0, 2) + "_" +
    data.address.slice(0, 2) + "_" +
    data.type.slice(0, 2) + "_" +
    data.desc.slice(0, 2) + "_" +
    Date.now();

function getNumbers(hpPenerima: string, hpPengirim: string) {
    return hpPenerima + hpPengirim
}

// Orderan
function setIdOrderanString(
    data: TOrderTransactionDB) {

    return (
        data.Customers.name.slice(0, 5) + "_" +
        data.Customers.address.toString().slice(0, 4) + "_" +
        data.nameDelivery.slice(2, 4) +
        getNumbers(data.Customers.phone, data.Deliverys.phone)
        .toString().slice(0, 5));
}

export const setIdOrderan = (data: TOrderTransactionDB): string =>
    setIdOrderanString(data).replaceAll(" ", "_")
