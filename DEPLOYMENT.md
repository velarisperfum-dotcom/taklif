# 💍 TAKLIFNOMA — PREMIUM TO‘Y TAKLIFNOMALARI PLATFORMASI
## Deployment & Ishga Tushirish Qo‘llanmasi

Ushbu platforma O‘zbekiston bozori uchun mo‘ljallangan, yuqori sifatli (lux), interaktiv va zamonaviy raqamli to‘y taklifnomalar xizmatidir.

---

### 1. Texnologik Stek

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, React Router 7, Lucide Icons, Canvas Confetti.
- **Backend**: Node.js, Express, TypeScript, Zod, CORS.
- **Ma'lumotlar Bazasi**: Prisma ORM (Lokal: SQLite `dev.db`, Production: PostgreSQL).
- **Tipografika**: Cormorant Garamond, Playfair Display, Cinzel, Alex Brush, Great Vibes, Plus Jakarta Sans.

---

### 2. Mahalliy (Local) Ishga Tushirish

#### Talablar:
- Node.js (v18+)
- npm (v9+)

#### 1-qadam: Bog‘liqliklarni o‘rnatish:
```bash
# Server bog‘liqliklarini o‘rnatish
cd server && npm install

# Frontend bog‘liqliklarini o‘rnatish
cd ../client && npm install
cd ..
```

#### 2-qadam: Ma’lumotlar bazasini yaratish va to‘ldirish (Seed):
```bash
cd server
npx prisma db push
npm run db:seed
cd ..
```
*Bu buyruq 20 ta to‘liq shablonni va test namunaviy to‘y taklifnomalarini yaratadi.*

#### 3-qadam: Ilovani ishga tushirish:
```bash
# Terminal 1: Backend API server (port 5001)
cd server && npm run dev

# Terminal 2: Frontend Vite server (port 3000)
cd client && npm run dev
```

Brauzerda oching: **`http://localhost:3000`**

---

### 3. Mavjud 20 ta Maxsus Shablonlar

1. **Royal Gold** (`royal-gold`) — Ivory fon, oltin hoshiyalar va qirollik hashamati (Luxury).
2. **Black Tie** (`black-tie`) — Chuqur qora fon, shampan-oltin yozuvlar va kinematik atmosfera (Luxury).
3. **Pearl Elegance** (`pearl-elegance`) — Marvarid-oq kompozitsiya, nozik chiziqlar va klassik serif (Luxury).
4. **Burgundy Royale** (`burgundy-royale`) — To‘q bordo qirmizi rang, aslzoda saroy tantanasi (Luxury).
5. **Uzbek Heritage** (`uzbek-heritage`) — Sharqona islimiy naqshlar, xonatlas va ganchkorlik (Milliy).
6. **Suzani Romance** (`suzani-romance`) — So‘zana kashtasi, anor gullari va qizg‘in milliy muhabbat (Milliy).
7. **Oriental Palace** (`oriental-palace`) — Samarqand Registon arkalari, feruza va oltin uyg‘unligi (Milliy).
8. **Silk Road** (`silk-road`) — Buyuk Ipak yo‘li afsonasi, zarrin qum ohanglari (Milliy).
9. **Minimal White** (`minimal-white`) — Sof oq fazo, lakonik tipografika va zamonaviy minimalizm (Minimalistik).
10. **Editorial Magazine** (`editorial-magazine`) — Yuqori moda jurnallari (Vogue) uslubidagi kompozitsiya (Zamonaviy).
11. **Modern Beige** (`modern-beige`) — Iliq bej rang, qahva tuslari, xotirjam quiet luxury (Zamonaviy).
12. **Monochrome** (`monochrome`) — Qat’iy oq va qora uyg‘unligi, toza geometriya (Minimalistik).
13. **Rose Garden** (`rose-garden`) — Nozik atirgul gultojibarglari, muloyim pushti tonlar (Romantik).
14. **Botanical Love** (`botanical-love`) — Yashil evkalipt va zaytun novdalari, musaffo tabiat (Romantik).
15. **Pastel Dream** (`pastel-dream`) — Shaftoli va lavanda pastel jilolari, orombaxsh romantika (Romantik).
16. **Watercolor Romance** (`watercolor-romance`) — Rassom mo‘yqalami bilan chizilgan nafis akvarel gullar (Romantik).
17. **Night Sky** (`night-sky`) — Chuqur tungi osmon, chaqnoq yulduzlar va koinotdek cheksiz baxt (Kreativ).
18. **Cinematic Love** (`cinematic-love`) — Premyera film afishasidek dramatik, keng ekranli muqova (Kreativ).
19. **Glass Elegance** (`glass-elegance`) — Shaffof oyna (glassmorphism) effekti va yaltiroq nurlar (Zamonaviy).
20. **Floral Frame** (`floral-frame`) — Oltin ramka ichidagi hashamatli gullar va markaziy gerb (Klassik).

---

### 4. Vercel (Frontend) Deploy Qilish

1. [Vercel](https://vercel.com) da yangi loyiha oching va ushbu repozitoriyni ulang.
2. Root Directory qilib **`client`** papkasini ko‘rsating.
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. `client/vercel.json` faylida backend manzilingizni yangilang:
```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://YOUR_RAILWAY_URL.railway.app/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

### 5. Railway (Backend & PostgreSQL) Deploy Qilish

1. [Railway.app](https://railway.app) ga kiring va **New Project -> Provision PostgreSQL** ni tanlang.
2. PostgreSQL yaratilgach, o‘sha loyihaga repozitoriyingizni qo‘shing.
3. Root Directory qilib **`server`** papkasini tanlang.
4. Muhit o‘zgaruvchilari (Environment Variables):
   - `DATABASE_URL`: PostgreSQL ulanish havolasi (Railway avtomatik ulaydi).
   - `PORT`: `5001` (yoki Railway beradigan port).
   - `NODE_ENV`: `production`
5. PostgreSQL uchun `server/prisma/schema.prisma` da providerni `postgresql` ga o‘zgartiring:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
6. Build va Start buyruqlari `server/railway.json` da sozlangan:
   - Build: `npm install && npx prisma generate && npm run build`
   - Start: `npx prisma db push && npm run start`

---

### 6. API Endpointlari

| Metod | Yo‘l | Tavsif |
|---|---|---|
| `GET` | `/api/health` | Tizim holati tekshiruvi |
| `GET` | `/api/templates` | Barcha shablonlar ro‘yxati (filtrlar bilan) |
| `GET` | `/api/templates/:id` | Alohida shablon ma’lumotlari |
| `GET` | `/api/invitations` | Taklifnomalar ro‘yxati (kabinet uchun) |
| `POST` | `/api/invitations` | Yangi taklifnoma yaratish (unikal slug qaytaradi) |
| `GET` | `/api/invitations/slug/:slug` | Ochiq havola orqali taklifnomani olish |
| `GET` | `/api/invitations/:id` | ID bo‘yicha tahrirlash uchun olish |
| `PATCH` | `/api/invitations/:id` | Taklifnoma ma’lumotlarini yangilash |
| `DELETE` | `/api/invitations/:id` | Taklifnomani o‘chirish |
| `POST` | `/api/invitations/:id/duplicate` | Taklifnomadan nusxa olish |
| `POST` | `/api/invitations/:slug/rsvp` | Mehmon ishtirokini tasdiqlashi (RSVP) |
| `GET` | `/api/invitations/:id/rsvps` | Taklifnoma egasi uchun barcha RSVP javoblari |

---

### 7. Tekshirilgan Foydalanuvchi Oqimlari (User Flows)

- **Flow A**: Bosh sahifa ochilishi -> 20 ta shablonni toifa va qidiruv bo‘yicha saralash -> modalda to‘liq ko‘rish -> tanlash.
- **Flow B**: Shablon tanlash -> kelin-kuyov, sana, to‘yxona ma’lumotlarini kiritish -> jonli ko‘rinish -> saqlash -> unikal URL olish.
- **Flow C**: Ommaviy havola orqali ochish (`/t/slug`) -> countdown, manzil, musiqa, RSVP to‘liq ishlashi.
- **Flow D**: Bir nechta alohida taklifnomalar yaratish -> har birining o‘ziga xos unikal slugi, sanasi va ma’lumotlari saqlanishi.
- **Flow E**: Mavjud taklifnomani tahrirlash (`/edit/:id`) -> yangilash -> ommaviy sahifada darhol aks etishi.
- **Flow F**: Maydonlar bo‘sh qolganda o‘zbekcha tushunarli validatsiya xatolari chiqishi.
- **Flow G**: Mavjud bo‘lmagan URL kiritilganda chiroyli 404 xatolik sahifasi chiqishi.
- **Flow H**: 320px dan 1440px gacha moslashuvchan dizayn (Mobile-first).
