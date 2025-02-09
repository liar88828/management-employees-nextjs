import { TOrderCreate } from "@/interface/entity/order.model"
import { TCustomersDB } from "@/interface/entity/receiver.model";
import { TOrderTrolleyTransaction, TTrolleyProductUser } from "@/interface/entity/trolley.model";
import { TOrderTransactionDB } from "@/interface/entity/transaction.model";
import { productExampleComplete } from "@/assets/product.example";

export const TrolleyExamples: TTrolleyProductUser[] = [
    {
        "id": "575fe63d-6ffb-4560-8082-6dafc3bf792c",
        // "id_order": "712ec142-b620-4315-8571-877c84634642",
        "id_product": "cb34c9fc-1c93-4e0b-a213-75d96489b54b",
        "qty_at_buy": 1,
        "price_at_buy": 20000,
        "id_user": "cb34c9fc-1c93-4e0b-a213-75d96489b54b",
        "Product": {
            update_stock: new Date(),
            sold: 0,
            "id": "cb34c9fc-1c93-4e0b-a213-75d96489b54b",
            "name": "tahu ayam",
            "location": "Semarang",
            "type": "orderan",
            "img": "tidak ada ",
            "price": 20000,
            "qty": 86,
            "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            "created_at": new Date(),
            "updated_at": new Date()
        }
    },
    {
        "id": "48db427b-401f-4d6a-a2bb-2a379f944813",
        // "id_order": "712ec142-b620-4315-8571-877c84634642",
        "id_product": "229b54ec-54ac-40bc-9571-90b9494bd672",
        "qty_at_buy": 1,
        "price_at_buy": 20000,
        "id_user": "229b54ec-54ac-40bc-9571-90b9494bd672",
        "Product": productExampleComplete
    }
]

export const exampleOrderCreate: TOrderCreate = {
    id_customer: "550e8400-e29b-41d4-a716-446655440000",
	sendTime: new Date("2024-12-05T10:00:00Z"), // ISO 8601 formatted date
	orderTime: new Date("2024-12-04T15:30:00Z"),
	desc: "Order of electronics including headphones and chargers.",
	address: "123 Main St, Springfield, USA",
	// travel
	id_delivery: "550e8400-e29b-41d4-a716-446655440000", // UUID format
	nameDelivery: "Express Logistics",
    phoneDelivery: "08234567890",
	priceDelivery: 4999, // Example price in cents (4999 cents = 49.99 currency units)
	// payment
	id_payment: "660e8400-e29b-41d4-a716-556655440111", // UUID format
	totalPayment: 10499, // Total payment amount (e.g., in cents)
	totalAll: 15498, // Sum of total payment and delivery price
	status: "Pending", // Example status

	// id_receiver: "770e8400-e29b-41d4-a716-666655440222", // UUID format
}

export const exampleOrderProductCreate: TOrderTrolleyTransaction[] = [
	{
		id_product: "prod-001",
		qty_at_buy: 1,
		price_at_buy: 1,
		id_user: "asdas",
		id: "12341342",
	},
	{
		qty_at_buy: 1,
		price_at_buy: 1,
		id_product: "prod-002",
		id_user: "2345234",
		id: "2342342",
	},
	{
		id_product: "prod-003",
		qty_at_buy: 1,
		price_at_buy: 1,
		id_user: "23452345",
		id: "dsa245623456sda",
	},
]

export const exampleReceiver: TCustomersDB = {
	id: "123e4567-e89b-12d3-a456-426614174000", // Valid UUID
	name: "Alice Johnson",
	address: "456 Elm Street, Springfield, USA",
    phone: "+62876543210", // Valid phone string
}

export const dataOrderTransactions: TOrderTransactionDB[] = [
    {
        updated_at: new Date(),
        created_at: new Date(),
        "id": "712ec142-b620-4315-8571-877c84634642",
        "orderTime": new Date(),
        "sendTime": new Date(),
        "desc": "Order of electronics including headphones and chargers.",
        "address": "123 Main St, Springfield, USA",
        "id_delivery": "d278edcd-6ec4-445f-9a3e-98edc950f597",
        "nameDelivery": "Express Logistics",
        "phoneDelivery": "+1234567890",
        "priceDelivery": 4999,
        "id_payment": "dde29f69-1fcd-49f8-8f1a-3d40a544e0c5",
        "totalPayment": 10499,
        "totalAll": 15498,
        "status": "Completed",
        "id_customer": "a9f16705-a957-4edb-bb09-0bc4787d95e2",
        "Trolleys": TrolleyExamples,
        "Customers": exampleReceiver,
        "Deliverys": {
            "id": "d278edcd-6ec4-445f-9a3e-98edc950f597",
            "name": "Astra Holt",
            "phone": "+1 (334) 471-9017",
            "address": "Nam nihil ducimus r",
            "type": "Ad mollit voluptatem",
            "price": 882,
            "img": "https://www.dowawyracekebaj.jpg",
            "desc": "Error dolor eaque qu",
            "created_at": new Date(),
            "updated_at": new Date()

        },
        "Payments": {
            "id": "dde29f69-1fcd-49f8-8f1a-3d40a544e0c5",
            "name": "mandiri",
            "phone": "test1",
            "accounting": "asdasdas",
            "address": "Semrang",
            "type": "Kredit",
            "img": "https://logowik.com/content/uploads/images/cash2548.jpg",
            "desc": "orak jelas",
            "created_at": new Date(),
            "updated_at": new Date()
        }
    }
]

// export const defaultValues: TOrder = {
// 	//data orang
// 	pengirim: "Kantor Tahu Baxo",
// 	hpPengirim: "0123456789",
// 	penerima: "",
// 	alamatPenerima: "",
// 	hpPenerima: "",
// 	// waktu
// 	pesan: defaultDate(),
// 	kirim: defaultDate(),
// 	waktuKirim: getTime(),
// 	// product
// 	listOrderan: [],
// 	listItem: [],
// 	semuaProduct: [],
// 	//keterangan
// 	// guna  : "Untuk apa ??",
// 	lokasi: "Semarang",
// 	//travel
// 	namaPengiriman: "Kantor Tahu Baxo ",
// 	ongkir: 0,
// 	//transaksi
// 	id: "",
// 	typePembayaran: "CASH",
// 	totalBayar: 0,
// 	totalPenjualan: 0,
// 	status: "Di terima",
// 	guna: "",
// }