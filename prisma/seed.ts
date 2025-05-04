import { PrismaClient } from '../src/shared/prisma/client';
import { seedUsers } from './seeders/user.seeder';
const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');
    await seedUsers();
    console.log('Seeding complete!');
}

main()
    .catch((e) => {
        console.error('Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
