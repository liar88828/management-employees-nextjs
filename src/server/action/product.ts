'use server'
import { prisma } from "@/config/prisma";

export async function addStock(previousState: string, formData: FormData) {
    try {
        const stock = Number(formData.get('stock') ?? '0')
        await prisma.products.update({
            where: { id: previousState },
            data: {
                update_stock: new Date(),
                qty: { increment: stock }
            }
        })
        return 'success'
    } catch (err) {
        console.error(err);
        return 'Error adding stock'
    }

}