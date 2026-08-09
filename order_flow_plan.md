# 🗂️ Rancangan Alur Fitur Order — KOPKIT COFFEE

> Dokumen ini adalah panduan urutan pembangunan dari **database → API → UI**
> agar Anda bisa mengikuti setiap langkah secara manual dan memahami alurnya.

---

## 🧩 Gambaran Besar: 2 Tipe User

```
┌─────────────────────────────────────────────────────────┐
│                    KOPKIT COFFEE APP                    │
│                                                         │
│   Tipe A: GUEST                  Tipe B: REGISTERED     │
│   ─────────────────              ───────────────────    │
│   • Sudah ada di lokasi          • Pesan dari jauh      │
│   • Tidak perlu login            • Wajib login          │
│   • Input nama manual            • Nama otomatis        │
│   • Makan di tempat / takeaway   • Wajib isi alamat     │
│                                  • Diantar (delivery)   │
└─────────────────────────────────────────────────────────┘
```

---

## 1️⃣ LANGKAH PERTAMA — Tambah Model ke Prisma Schema

Ini adalah **fondasi utama**. Semua fitur order bergantung pada tabel-tabel ini.
Kerjakan secara berurutan karena ada relasi antar tabel.

### Urutan penambahan model:

```
[Sudah ada] Menu ──┐
[Sudah ada] Category  │
                       ▼
[BARU] User ◄──────── OTP (untuk verifikasi WhatsApp)
        │
        ▼
[BARU] Order ◄──── OrderItem (berisi menu yang dipesan)
```

---

### Model yang perlu ditambahkan ke `schema.prisma`:

#### A. Model `User`
```prisma
model User {
  id          String   @id @default(uuid())
  name        String
  phone       String   @unique          // nomor WA: 628xxxxxxxxx
  isVerified  Boolean  @default(false)  // true setelah OTP dikonfirmasi
  address     String?                   // null untuk guest / pickup
  createdAt   DateTime @default(now())  @map("created_at")
  updatedAt   DateTime @default(now())  @map("updated_at")
  orders      Order[]
  otps        OTP[]

  @@map("users")
}
```

#### B. Model `OTP`
```prisma
model OTP {
  id        String   @id @default(uuid())
  userId    String   @map("user_id")
  code      String                      // 6 digit angka
  expiresAt DateTime @map("expires_at") // berlaku 5 menit
  isUsed    Boolean  @default(false)    @map("is_used")
  createdAt DateTime @default(now())    @map("created_at")
  user      User     @relation(fields: [userId], references: [id])

  @@map("otps")
}
```

#### C. Model `Order`
```prisma
// Enum untuk tipe pesanan
enum OrderType {
  DINE_IN    // makan di tempat (guest)
  TAKEAWAY   // bawa pulang (guest)
  DELIVERY   // diantar (registered user)
}

// Enum untuk status pesanan
enum OrderStatus {
  PENDING     // baru masuk, belum diproses
  CONFIRMED   // sudah dikonfirmasi kasir/admin
  PREPARING   // sedang dibuat barista
  READY       // siap diambil / dikirim
  COMPLETED   // selesai
  CANCELLED   // dibatalkan
}

model Order {
  id              String      @id @default(uuid())
  orderNumber     String      @unique @map("order_number")  // e.g. "ORD-20240809-001"
  userId          String?     @map("user_id")               // null = guest order
  guestName       String?     @map("guest_name")            // diisi jika guest
  guestPhone      String?     @map("guest_phone")           // nomor WA guest
  orderType       OrderType   @map("order_type")
  status          OrderStatus @default(PENDING)
  deliveryAddress String?     @map("delivery_address")      // wajib jika DELIVERY
  totalPrice      Int         @map("total_price")           // dalam Rupiah
  notes           String?                                   // catatan tambahan
  createdAt       DateTime    @default(now()) @map("created_at")
  updatedAt       DateTime    @default(now()) @map("updated_at")

  user        User?       @relation(fields: [userId], references: [id])
  items       OrderItem[]

  @@map("orders")
}
```

#### D. Model `OrderItem`
```prisma
model OrderItem {
  id         String  @id @default(uuid())
  orderId    String  @map("order_id")
  menuId     String  @map("menu_id")
  quantity   Int
  unitPrice  Int     @map("unit_price")   // harga saat dipesan (snapshot)
  subtotal   Int                           // quantity × unitPrice
  notes      String?                      // catatan per item (e.g. "tanpa gula")

  order      Order   @relation(fields: [orderId], references: [id])
  menu       Menu    @relation(fields: [menuId], references: [id])

  @@map("order_items")
}
```

> [!IMPORTANT]
> Jangan lupa tambahkan `orderItems OrderItem[]` di model `Menu` yang sudah ada,
> agar relasi dua arah terbentuk.

---

## 2️⃣ LANGKAH KEDUA — Bangun Fitur Auth (WhatsApp OTP)

Ikuti pola yang sudah ada: **`features/` → `validator` → `repository` → `service` → `app/api/`**

### File yang dibuat di `features/auth/`

```
features/
└── auth/
    ├── validators/
    │   └── auth.validator.ts     ← schema Zod untuk request body
    ├── repository/
    │   └── auth.repository.ts    ← query ke database (User, OTP)
    └── service/
        └── auth.service.ts       ← logika bisnis OTP
```

### API Endpoints Auth

| Method | Endpoint | Fungsi |
|--------|----------|--------|
| `POST` | `/api/auth/request-otp` | Kirim OTP ke nomor WA |
| `POST` | `/api/auth/verify-otp` | Verifikasi kode OTP → dapat session |
| `GET` | `/api/auth/me` | Ambil data user yang sedang login |
| `POST` | `/api/auth/logout` | Hapus session |

### Alur OTP Step-by-Step

```
User input nomor WA
        │
        ▼
POST /api/auth/request-otp
        │
        ├─ Cek apakah nomor sudah terdaftar di tabel User
        │       ├─ Belum ada → buat User baru (isVerified: false)
        │       └─ Sudah ada → gunakan User yang ada
        │
        ├─ Generate kode OTP (6 digit random)
        ├─ Simpan ke tabel OTP (expiresAt: +5 menit)
        └─ Kirim via WhatsApp API (wa.me atau Fonnte/WABLAS)
                │
                ▼
User terima OTP di WhatsApp → input di form
        │
        ▼
POST /api/auth/verify-otp  { phone, code }
        │
        ├─ Cek OTP: cocok? belum expired? belum dipakai?
        ├─ Set isUsed: true
        ├─ Set User.isVerified: true
        └─ Buat session (JWT Cookie atau Next-Auth session)
                │
                ▼
User berhasil login ✅
```

> [!NOTE]
> Untuk **MVP awal**, OTP tidak perlu dikirim via API WhatsApp sungguhan.
> Cukup tampilkan kode OTP di response API (console/log) agar bisa ditest manual.
> Integrasi WhatsApp API (Fonnte, WABLAS, dll) bisa ditambahkan belakangan.

---

## 3️⃣ LANGKAH KETIGA — Bangun Fitur Order

### File yang dibuat di `features/order/`

```
features/
└── order/
    ├── validators/
    │   └── order.validator.ts
    ├── repository/
    │   └── order.repository.ts
    └── service/
        └── order.service.ts
```

### API Endpoints Order

| Method | Endpoint | Siapa | Fungsi |
|--------|----------|-------|--------|
| `POST` | `/api/orders` | Guest & Registered | Buat pesanan baru |
| `GET` | `/api/orders` | Admin | Lihat semua pesanan |
| `GET` | `/api/orders/my` | Registered | Riwayat pesanan saya |
| `GET` | `/api/orders/[id]` | Admin & Owner | Detail pesanan |
| `PATCH` | `/api/orders/[id]/status` | Admin | Update status pesanan |

---

### Request Body: `POST /api/orders`

**Skenario A — Guest (dine-in / takeaway):**
```json
{
  "orderType": "DINE_IN",
  "guestName": "Budi",
  "guestPhone": "08123456789",
  "notes": "Meja 5",
  "items": [
    { "menuId": "uuid-menu-1", "quantity": 2, "notes": "tanpa gula" },
    { "menuId": "uuid-menu-2", "quantity": 1, "notes": "" }
  ]
}
```

**Skenario B — Registered (delivery):**
```json
{
  "orderType": "DELIVERY",
  "deliveryAddress": "Jl. Sudirman No. 10, Jakarta",
  "notes": "Jangan lupa sedotan",
  "items": [
    { "menuId": "uuid-menu-1", "quantity": 1, "notes": "" }
  ]
}
```
> Header: `Authorization: Bearer <token>` — nama user diambil otomatis dari session

---

### Logika di dalam Service saat `POST /api/orders`:

```
1. Validasi body dengan Zod
2. Jika DELIVERY → wajib ada userId (harus login) dan deliveryAddress
3. Jika DINE_IN / TAKEAWAY → userId boleh null, guestName wajib
4. Ambil harga tiap menu dari database → hitung subtotal per item
5. Hitung totalPrice = jumlah semua subtotal
6. Generate orderNumber (format: ORD-YYYYMMDD-XXX)
7. Simpan Order + OrderItem ke database dalam satu transaksi Prisma
8. Return data order lengkap
```

---

## 4️⃣ Ringkasan Urutan Pengerjaan

```
┌─────────────────────────────────────────────────────────────┐
│  FASE 1 — Database                                          │
│  ─────────────────                                          │
│  [ ] Tambah enum OrderType, OrderStatus ke schema.prisma    │
│  [ ] Tambah model User                                      │
│  [ ] Tambah model OTP                                       │
│  [ ] Tambah model Order                                     │
│  [ ] Tambah model OrderItem                                 │
│  [ ] Tambah relasi orderItems[] di model Menu               │
│  [ ] Jalankan: npx prisma migrate dev --name add-order      │
│  [ ] Jalankan: npx prisma generate                          │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  FASE 2 — Auth Feature                                      │
│  ─────────────────────                                      │
│  [ ] Buat auth.validator.ts  (Zod schema)                   │
│  [ ] Buat auth.repository.ts (query User & OTP)             │
│  [ ] Buat auth.service.ts    (logika OTP)                   │
│  [ ] Buat /api/auth/request-otp/route.ts                    │
│  [ ] Buat /api/auth/verify-otp/route.ts                     │
│  [ ] Buat /api/auth/me/route.ts                             │
│  [ ] Setup JWT Cookie (pakai jose atau next/auth)           │
│  [ ] TEST manual via curl / Postman / Thunder Client        │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  FASE 3 — Order Feature                                     │
│  ──────────────────────                                     │
│  [ ] Buat order.validator.ts                                │
│  [ ] Buat order.repository.ts                               │
│  [ ] Buat order.service.ts                                  │
│  [ ] Buat /api/orders/route.ts         (POST, GET admin)    │
│  [ ] Buat /api/orders/my/route.ts      (GET riwayat user)   │
│  [ ] Buat /api/orders/[id]/route.ts    (GET detail)         │
│  [ ] Buat /api/orders/[id]/status/route.ts (PATCH status)   │
│  [ ] TEST manual: buat order guest                          │
│  [ ] TEST manual: buat order registered                     │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  FASE 4 — UI (belakangan, setelah API solid)                │
│  ────────────────────────────────────────────               │
│  [ ] Halaman /order → form pilih menu + keranjang           │
│  [ ] Halaman /auth → form nomor WA + input OTP              │
│  [ ] Integrasi cart state (Zustand atau Context)            │
│  [ ] Panel admin: lihat & update status pesanan             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔑 Catatan Penting

> [!WARNING]
> **Urutan wajib diikuti.** Jangan mulai Fase 3 sebelum Fase 1 & 2 selesai,
> karena Order membutuhkan `userId` yang hanya bisa ada setelah User & Auth siap.

> [!TIP]
> **Test setiap endpoint secara manual** sebelum lanjut ke langkah berikutnya.
> Gunakan **Thunder Client** (extension VS Code) atau **Postman** untuk kirim request JSON.
> Ini jauh lebih cepat daripada langsung buat UI-nya dulu.

> [!NOTE]
> **Untuk session / auth**, disarankan pakai **JWT yang disimpan di httpOnly cookie**.
> Library: `jose` (sudah ringan, tidak perlu dependensi besar).
> Next-Auth bisa dipakai tapi lebih kompleks untuk setup custom OTP flow.
