import { execSync } from 'child_process';

const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '');
const name = `${timestamp}`;

console.log(`Running migration: ${name}`);

/**
 * prisma migrate dev
 *
 * saat command di atas dijalankan, terminal akan meminta nama untuk migrate yang akan kita buat
 *
 */

execSync(`npx prisma migrate dev --name ${name}`, { stdio: 'inherit' });
