'use server'

import { prisma } from "@/config/prisma";
import { UserClient } from "@/interface/entity/user.model";

export async function userByID(userId: string): Promise<UserClient | null> {
    return prisma.users.findUnique({
        where: { id: userId },
        omit: {
            password: true,
            otpExpired: true,
            otp: true,
        }
    })
}
