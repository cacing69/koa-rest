# KOA REST

## Koa.js REST API dengan Prisma, Zod, JWT, dan Dokumentasi Swagger

Proyek ini adalah skeleton REST API dasar yang dibangun dengan **Koa.js**, **Prisma ORM**, **Zod** untuk validasi, **JWT** untuk autentikasi, dan **Swagger** untuk dokumentasi API. Proyek ini dirancang sebagai titik awal untuk mengembangkan REST API yang skalabel dan aman.

### Fitur

- **Koa.js** sebagai framework web
- **Prisma** ORM untuk interaksi dengan database
- **Zod** untuk validasi data
- **JWT** untuk autentikasi berbasis token
- **Swagger UI** untuk dokumentasi API otomatis
- **Konfigurasi Lingkungan** dengan file `.env`

### Teknologi yang Digunakan

- **Koa.js** - Framework web ringan untuk Node.js
- **Prisma** - ORM modern untuk Node.js dan TypeScript
- **Zod** - Validasi skema berbasis TypeScript
- **JWT** - JSON Web Token untuk autentikasi
- **Swagger** - Pembuatan dokumentasi API

## Instalasi

### 1. Clone Repositori

```bash
git clone https://github.com/cacing69/koa-rest.git
cd koa-rest

npm run install

# or

yarn install
```

### 2. Migrate & Seed Database

```bash
yarn migrate
```

Ketika ada perubahan baru pada file **schema.prisma**, jalankan perintah migrate untuk membuat file migrationnya, setelah migration selesai dibuat, untuk mengeksekusinya, bisa menggunakan command

```bash
yarn migrate:dev
```

Untuk mengisi database dengan seeder, gunakan command:

```bash
yarn seed
```

command ini akan menjalankan file seeder yang ada pada folder **prisma/seeders/\*\*** yang sudah didaftarkan pada file **prisma/seed.ts**

### 3. Jalankan App

```bash
yarn dev
```

### 4. E2E Test

```bash
yarn test:e2e
```

### 5. Unit Test

```bash
yarn test:unit
```

Buka `http://localhost:3000` atau jika ingin mengakses swaggernya bisa di akses pada `http://localhost:3000/docs`

## Hal-hal yang perlu diperhatikan
