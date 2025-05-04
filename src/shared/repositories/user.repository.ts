import { PrismaClient } from '../prisma/client';
import bcrypt from 'bcryptjs';
import { UserCreateValidation } from '../validations/user-create.validation';
import { UserUpdateValidation } from '../validations/user-update.validation';

const prisma = new PrismaClient();

export const getAllUsers = async () => {
    return prisma.user.findMany();
}

export const getUserById = (id: string) => {
    return prisma.user.findUnique({ where: { id } });
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

export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({ where: { email } });
}

// Verifikasi password
export const verifyPassword = async (
    inputPassword: string,
    hashedPassword: string
): Promise<boolean> => {
    return bcrypt.compare(inputPassword, hashedPassword);
};

export const deleteUser = (id: string) => {
    return prisma.user.update({
        where: { id },
        data: {
            deletedAt: new Date()
        }
    });
}

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
}