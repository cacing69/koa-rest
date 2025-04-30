import { PrismaClient } from '@prisma/client';
import { ulid } from 'ulid';

const prisma = new PrismaClient();

export async function createUser(data: { name: string; email: string }) {
    const id = ulid();
    return prisma.user.create({
        id,
        ...data
    });
}

export async function getUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
}