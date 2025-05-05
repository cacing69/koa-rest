import { PrismaClient } from '../prisma/client';
import bcrypt from 'bcryptjs';
import { UserCreateValidation } from '../validations/user-create.validation';
import { UserUpdateValidation } from '../validations/user-update.validation';
import { PaginateValidation } from '../validations/paginate.validation';

const prisma = new PrismaClient();

export const paginateUser = async (paginate: PaginateValidation) => {
    const results =  await prisma.user.findMany({
        take: parseInt(`${paginate.limit}`),
        skip: paginate.cursor ? 1 : 0,
        cursor: paginate.cursor ? { id: paginate.cursor as string } : undefined,
        orderBy: { id: `asc` }
    });

    return results.map((row) => ({
        id: row.id,
        firstName: row.firstName,
        email: row.email,
        createdAt: row.createdAt,
    }));
}

export const findUserById = (id: string) => {
    return prisma.user.findUnique({ where: { id } });
}

export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({ where: { email } });
}

export const createUser = async (data: UserCreateValidation) => {
    const hashedPassword = await hashPassword(data.password);
    return prisma.user.create({
        data: {
            ...data,
            password: hashedPassword
        }
    });
};

export const updateUser = async (id: string, data: UserUpdateValidation) => {
    const updatedData: any = { ...data, updatedAt: new Date() };

    if (data.password) {
        const hashedPassword = await hashPassword(data.password);
        updatedData.password = hashedPassword;
    }

    return prisma.user.update({
        where: { id },
        data: updatedData,
    });
}

export const deleteUser = (id: string) => {
    return prisma.user.update({
        where: { id },
        data: {
            deletedAt: new Date()
        }
    });
}

// Verifikasi password
export const verifyPassword = async (
    inputPassword: string,
    hashedPassword: string
): Promise<boolean> => {
    return bcrypt.compare(inputPassword, hashedPassword);
};

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
}