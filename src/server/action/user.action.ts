'use server'

import { prisma } from "@/config/prisma";
import { TUserCreate, UserClient, UserParams, } from "@/interface/entity/user.model";
import { ResponseAll } from "@/interface/server/param";
import { Users } from "@prisma/client";

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

export async function findAll(
    { filter, pagination: { page = 1, limit = 20 } }:
    Required<UserParams>): Promise<ResponseAll<Users>> {
    const skip = ( page - 1 ) * limit;
    const take = limit;
    const data = await prisma.users.findMany({
        where: {
            AND: [
                {
                    ...( filter.name ? { name: { contains: filter.name, } } : {} ),
                }
            ],
        },
        skip,
        take,
    });
    return { data, page, limit };

}

export async function findById(id: string): Promise<any> {
    return prisma.users.findUnique({ where: { id } });
}

export async function userFindByIdValid(id?: string) {
    const response = await prisma.users.findUnique({ where: { id } });
    if (!response) {
        throw new Error("User does not exist");
    }
    return response;
}

export async function userCreateOne(data: TUserCreate): Promise<Users> {
    return prisma.users.create({ data: { ...data } });
}

export async function userUpdateOne(data: TUserCreate, id: string): Promise<any> {
    return prisma.users.update({ data: { ...data }, where: { id } });
}

export async function deleteOne(id: string): Promise<any> {
    return prisma.users.delete({ where: { id } });
}

export async function updateMany(data: TUserCreate[], id: string) {

}
