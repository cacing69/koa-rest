import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser(data: { name: string; email: string }) {
    return prisma.user.create({ data });
}

export async function getUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
}