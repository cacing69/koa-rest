
import { PrismaClient } from '../../../generated/prisma/client';
import bcrypt from 'bcryptjs';
import { CreateUserRequest } from '../validations/user-create.validation';

const prisma = new PrismaClient();

export const createUser = async (user: CreateUserRequest) => {

    // Hash password sebelum simpan
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return prisma.user.create({
        data: {
            ...user,
            password: hashedPassword
        }
    });
};

export const findUserByEmail =  async (email: string) => {
    return prisma.user.findUnique({ where: { email } });
}

// Verifikasi password
export const verifyPassword = async (
    inputPassword: string,
    hashedPassword: string
): Promise<boolean> => {
    return bcrypt.compare(inputPassword, hashedPassword);
};