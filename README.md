# LenU Library Management System

## Pendahuluan

Sistem manajemen perpustakaan ini dirancang untuk mencatat dan mengelola transaksi peminjaman buku di Perpustakaan LenU. Sistem ini mendukung operasi CRUD untuk data mahasiswa, buku, dan peminjaman. Selain itu, sistem juga mencakup fitur perhitungan denda keterlambatan pengembalian buku serta notifikasi harian untuk admin jika ada buku yang belum dikembalikan melewati batas waktu.

## Teknologi yang Digunakan

- **Backend**: Node.js dengan Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize CLI
- **API**: REST API
- **Docker**: Untuk containerization
- **Notifikasi**: WebSocket

## Struktur Proyek

```plaintext
/lenu_library_management
├── src
     ├── config/
     │   └── postgres.config.js
     ├── migrations/
     ├── models/
     │   ├── index.js
     │   ├── student.js
     │   ├── book.js
     │   └── loan.js
     ├── seeders/
     ├── models/
     │   ├── bookRoutes.js
     │   ├── borrowRoutes.js
     │   ├── studentRoutes.js
     │   └── index.js
     ├── controllers/
     │   ├── bookController.js
     │   ├── borrowController.js
     │   ├── studentController.js
     ├── index.js
     ├── socket-clinet.js
├── Dockerfile
├── .sequelizerc
├── docker-compose.yml
├── eslint.config.mjs
├── package.json
├── .gitignore
└── README.md

```

## Database Model

### Student

- **Table Name**: `Student`
- **Column**:
  - `id`: integer, primary key, auto increment
  - `name`: string
  - `studentId`: string
  - `department`: string
  - `createdAt`: timestamp
  - `updatedAt`: timestamp

### Book

- **Table Name**: `Book`
- **Column**:
  - `bookId`: string
  - `title`: string
  - `author`: string
  - `quantity`: integer
  - `storageLocation`: string
  - `createdAt`: timestamp
  - `updatedAt`: timestamp

### Loan

- **Table Name**: `Loan`
- **Column**:
  - `studentId`: string
  - `bookId`: string
  - `loanDate`: date
  - `dueDate`: date
  - `returnDate`: date
  - `createdAt`: timestamp
  - `updatedAt`: timestamp

## ERD

```plaintext
+-------------------+     +-------------------+     +-------------------+
|     Student       |     |       Book        |     |       Loan        |
+-------------------+     +-------------------+     +-------------------+
| id (PK)           |     | bookId (PK)       |     | studentId (FK)    |
| name              |     | title             |     | bookId (FK)       |
| studentId         |     | author            |     | loanDate          |
| department        |     | quantity          |     | dueDate           |
| createdAt         |     | storageLocation   |     | returnDate        |
| updatedAt         |     | createdAt         |     | createdAt         |
+-------------------+     | updatedAt         |     | updatedAt         |
                           +-------------------+     +-------------------+
```

## Class Diagram

```plaintext
+-------------------+
|     Student       |
+-------------------+
| - id: integer     |
| - name: string    |
| - studentId: string |
| - department: string |
| - createdAt: timestamp |
| - updatedAt: timestamp |
+-------------------+
| + create()        |
| + update()        |
| + delete()        |
| + find()          |
+-------------------+

+-------------------+
|       Book        |
+-------------------+
| - bookId: string  |
| - title: string   |
| - author: string  |
| - quantity: integer |
| - storageLocation: string |
| - createdAt: timestamp |
| - updatedAt: timestamp |
+-------------------+
| + create()        |
| + update()        |
| + delete()        |
| + find()          |
+-------------------+

+-------------------+
|       Loan        |
+-------------------+
| - studentId: string |
| - bookId: string  |
| - loanDate: date  |
| - dueDate: date   |
| - returnDate: date |
| - createdAt: timestamp |
| - updatedAt: timestamp |
+-------------------+
| + create()        |
| + update()        |
| + delete()        |
| + find()          |
+-------------------+
```

## FlowChart

```plaintext
       +-----------------------+
       |       Mulai           |
       +-----------------------+
                   |
                   v
       +-----------------------+
       | Mahasiswa Meminta Buku|
       +-----------------------+
                   |
                   v
       +-----------------------+
       |  Cek Ketersediaan Buku|
       +-----------------------+
            /        \
           /          \
          v            v
+----------------+   +------------------+
| Buku Tersedia  |   | Buku Tidak Tersedia |
+----------------+   +------------------+
          |                   |
          v                   |
+----------------+            |
| Catat Peminjaman|          |
+----------------+            |
          |                   |
          v                   |
+----------------+            |
| Kirim Notifikasi|          |
+----------------+            |
          |                   |
          v                   |
       +-----------------------+
       |         Selesai        |
       +-----------------------+
```

## Perhitungan Denda

Perhitungan denda dilakukan berdasarkan jumlah hari keterlambatan dengan aturan sebagai berikut:

- Terlambat sampai dengan 2 hari pertama: Rp 1.000/hari/buku
- Hari ke-3 dan ke-4: Rp 2.000/hari/buku
- Hari ke-5 dan ke-6: Rp 3.000/hari/buku

Dan seterusnya, dengan kenaikan Rp 1.000 setiap dua hari keterlambatan

## Notifikasi WebSocket

Implementasi notifikasi menggunakan WebSocket untuk memberi tahu admin tentang buku yang belum dikembalikan setelah melewati batas waktu pengembalian.

## Dockerization

Untuk mempermudah deployment dan pengembangan, aplikasi ini sudah dikonfigurasikan untuk berjalan dalam container Docker.
