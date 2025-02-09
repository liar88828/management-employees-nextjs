import { prisma } from "@/config/prisma";
import OrderRepository from "@/server/repository/order.repo";
import { faker } from "@faker-js/faker";
import { toRepeat } from "@/utils/toRepeat";
import { MonthlyTotal } from "@/interface/entity/order.model";

class TestRepo {
    async getMonthlyTotals(year: number) {
        const startDate = new Date(year, 0, 1); // January 1st
        const endDate = new Date(year + 1, 0, 1); // Next year January 1st

        const result = await prisma.orders.groupBy({
            by: [
                'orderTime',
            ],
            _sum: {
                totalAll: true,
            },
            where: {
                orderTime: {
                    gte: startDate,
                    lt: endDate,
                },
            },
        });

        const months = [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
        ];

        // Initialize all months with 0
        const monthlyTotals = months.reduce((acc, month) => {
            // @ts-ignore
            acc[month] = 0;
            return acc;
        }, {});

        // Fill in actual values
        result.forEach((entry) => {
            const date = new Date(entry.orderTime);
            const monthName = months[date.getMonth()];
            // @ts-ignore
            monthlyTotals[monthName] = entry._sum.totalAll || 0;
        });

        return monthlyTotals;
    }

    async getMonthlyTotal() {
        const monthlyTotals = await prisma.orders.groupBy({
            by: [ 'orderTime' ],
            _sum: {
                totalAll: true,
            },
            where: {
                orderTime: {
                    gte: new Date('2023-01-01'),
                    lt: new Date('2024-01-01'),
                },
            },
        });

// Sanitize the data to group by month
        const dataMonth: MonthlyTotal[] = monthlyTotals.reduce<MonthlyTotal[]>((acc, { _sum, orderTime }) => {
            // Extract the month name from the orderTime
            const monthName = new Date(orderTime).toLocaleString('default', { month: 'long' });

            // Find the existing entry for this month or create a new one
            const existingMonth = acc.find(item => item.month === monthName);
            if (existingMonth) {
                // @ts-ignore
                existingMonth.total += _sum.totalAll;
            } else {
                // @ts-ignore
                acc.push({ month: monthName, total: _sum.totalAll });
            }

            return acc;
        }, []);

        console.log(dataMonth);
        return dataMonth;
    }

    async newGetMonthlyTotal() {
        return await prisma.orders.groupBy({
            by: [ 'orderTime' ],
            _sum: {
                totalAll: true
            },
            where: {
                orderTime: {
                    gte: new Date('2023-01-01'),
                    lt: new Date('2024-01-01')
                }
            },
        }).then(results =>
            results.map(result => ( {
                month: new Date(result.orderTime).toLocaleString('en-US', { month: 'long' }),
                total_all: result._sum.totalAll || 0
            } ))
        );
    }

    async seedOrder() {
        const orderRepository = new OrderRepository()
        const user = await prisma.users.findMany()
        const delivery = await prisma.deliverys.findMany()
        const payment = await prisma.payments.findMany()
        const product = await prisma.products.findMany()

        for await (const i of toRepeat(10000)) {
            // console.log(idCustomer)
            const idCustomer = faker.helpers.arrayElement(user.map(item => item.id)) ?? '';
            const idDelivery = faker.helpers.arrayElement(delivery.map(item => item.id)) ?? '';
            const idPayment = faker.helpers.arrayElement(payment.map(item => item.id)) ?? '';
            const idProduct = faker.helpers.arrayElement(product.map(item => item.id)) ?? '';

            await orderRepository.createOne({
                "order": {
                    id_customer: idCustomer,
                    address: faker.location.streetAddress(),
                    "desc": "Order of electronics including headphones and chargers.",
                    "id_delivery": idDelivery,
                    "id_payment": idPayment,
                    "nameDelivery": faker.person.fullName(),
                    "orderTime": faker.date.between({ from: '2023-01-01', to: '2025-01-01', }),
                    "sendTime": faker.date.between({ from: '2023-01-01', to: '2025-01-01', }),
                    "phoneDelivery": faker.phone.number(),
                    "priceDelivery": faker.number.int(100),
                    "status": faker.helpers.fake([ 'Pending', 'Fail', 'Complete' ]),
                    "totalAll": faker.number.int(100),
                    "totalPayment": faker.number.int(100)
                },
                "orderTrolley":
                    [
                        {
                            id: "",// to delete
                            "qty_at_buy": faker.number.int(10),
                            // "price_at_buy": faker.number.int(10000),
                            "id_user": idCustomer,
                            "id_product": idProduct,
                        }
                    ],
                "orderReceiver":
                    {
                        // id: idCustomer,
                        "address": "456 Elm Street, Springfield, USA",
                        "name": faker.finance.accountName(),
                        "phone": faker.phone.number()
                    }
            })
        }
        return 'success'
    }

    async seedProduct() {
        for await (const i of toRepeat(1000)) {
            await prisma.products.create({
                data: {
                    "desc": faker.food.description(),
                    "img": "tidak ada ",
                    "location": faker.location.city(),
                    "name": faker.food.meat(),
                    "price": faker.number.int(1000000),
                    "qty": faker.number.int({ min: 100000, max: 1000000 }),
                    "type": faker.food.adjective()
                }
            })
        }
        return 'success'
    }

    async seedUser() {
        await prisma.users.create({
            data: {
                id: faker.string.uuid(),
                name: faker.person.fullName(),
                phone: faker.phone.number(),
                address: faker.location.streetAddress(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                role: faker.helpers.arrayElement([ "USER" ]),
                otp: faker.number.int(6).toString(),
                otpCount: 0,
                otpRegenerate: new Date(),
                otpExpired: new Date(),
                status: faker.helpers.arrayElement([ 'OTP', 'RESET', 'COMPLETED' ]),
            }
        })
        return 'success'
    }

    async seedDelivery() {
        for await (const i of toRepeat(200)) {
            await prisma.deliverys.create({
                data: {
                    "desc": faker.food.description(),
                    "img": "tidak ada ",
                    "name": faker.company.name(),
                    "price": faker.number.int(10000),
                    "type": faker.food.adjective(),
                    phone: faker.phone.number(),
                    address: faker.location.streetAddress(),
                }
            })
        }
        return 'success'
    }

    async seedPayment() {
        for await (const i of toRepeat(200)) {
            await prisma.payments.create({
                data: {
                    accounting: faker.finance.accountNumber(),
                    "desc": faker.food.description(),
                    "img": "tidak ada ",
                    "name": faker.company.name(),
                    "type": faker.food.adjective(),
                    phone: faker.phone.number(),
                    address: faker.location.streetAddress(),

                }
            })
        }
        return 'success'
    }
}

export const testRepositories = new TestRepo()
