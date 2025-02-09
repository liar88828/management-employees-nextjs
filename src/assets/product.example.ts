import { TProductCreate, TProductDB } from "@/interface/entity/product.model"

export const productExample: TProductCreate = {
    price: 99, // A valid price for the product
    img: "https://example.com/product-image.jpg", // A sample image URL
    type: "Electronics", // A product type, e.g., Electronics, Clothing, etc.
    qty: 50, // Quantity of the product in stock
    desc: "A high-quality wireless mouse with ergonomic design.", // Description of the product
    location: "Warehouse A", // The location where the product is stored
    name: "Wireless Mouse", // Name of the product
}

export const productExampleComplete: TProductDB = {
    update_stock: new Date(),
    sold: 0,
    "id": "229b54ec-54ac-40bc-9571-90b9494bd672",
    "name": "tahu baxo",
    "location": "Semarang",
    "type": "orderan",
    "img": "tidak ada ",
    "price": 20000,
    "qty": 86,
    "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    "created_at": new Date(),
    "updated_at": new Date()
}