import { PrismaClient } from '../../src/shared/prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedUsers() {
    const password = "$2b$10$lD759vZ1m04nXUpT2GYhxOAef1uGy6DOKza.EZJFo65bstpb5MD.q"; // password^
    await prisma.user.createMany({
        data: [
            { email: 'ibnuul@gmail.com', firstName: 'Ibnul Mutaki', password: password},
            { email: 'developer@email.com', firstName: 'Developer', password: password},
        ],
    });


    const createRandomUser = () => {
        return {
            email: faker.internet.email(),
            firstName: faker.person.firstName(),
            password: password,
        };
    }

    const fakerUsers = faker.helpers.multiple(createRandomUser, {
        count: 500,
    });

    await prisma.user.createMany({
        data: fakerUsers,
    });
}
