import { TDeliveryCreate, TDeliveryDB } from "@/interface/entity/delivery.model"

export const deliveryExample: TDeliveryDB = {
    name: "Luxury Villa",
    id: "1",
    phone: "+1234567890",
    address: "123 Palm Street, Beverly Hills, CA",
    type: "Real Estate",
    price: 1200000,
    img: "https://example.com/images/villa.jpg",
    desc: "A stunning luxury villa with a private pool and garden.",
    created_at: new Date("2023-10-01"),
    updated_at: new Date("2023-12-15"),
}

export const exampleDeliveryCreate: TDeliveryCreate = {
    name: "John Doe",
    phone: "+6234567890",
    address: "123 Main St, Springfield, IL, 62701",
    type: "Standard",
    price: 20,
    img: "https://example.com/image.jpg",
    desc: "Standard delivery within 5-7 business days.",
}
