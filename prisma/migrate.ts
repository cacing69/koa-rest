import { execSync } from 'child_process';

const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '');
const name = `migrate_${timestamp}`;

console.log(`Running migration: ${name}`);

execSync(`npx prisma migrate dev --name ${name}`, { stdio: 'inherit' });
