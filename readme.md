# 💍 Wedding Platform — Premium Raqamli To‘y Taklifnomalari

O‘zbekiston bozori uchun mo‘ljallangan zamonaviy, hashamatli va to‘liq interaktiv raqamli to‘y taklifnomalari platformasi.

---

## 📁 Loyiha Strukturasi

```text
wedding-platform/
│
├── client/                         # Frontend (React, Vite, TypeScript, Tailwind CSS)
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── images/
│   │   └── templates/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   ├── fonts/
│   │   │   └── images/
│   │   │
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── PageLayout.tsx
│   │   │   ├── ui/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   └── Loader.tsx
│   │   │   ├── templates/
│   │   │   │   ├── TemplateCard.tsx
│   │   │   │   ├── TemplateGrid.tsx
│   │   │   │   └── TemplateFilters.tsx
│   │   │   └── invitation/
│   │   │       ├── InvitationRenderer.tsx
│   │   │       ├── Countdown.tsx
│   │   │       ├── VenueSection.tsx
│   │   │       └── ShareInvitation.tsx
│   │   │
│   │   ├── templates/
│   │   │   ├── registry.ts
│   │   │   ├── MinimalWhite.tsx
│   │   │   ├── ModernBeige.tsx
│   │   │   ├── Editorial.tsx
│   │   │   ├── Botanical.tsx
│   │   │   ├── UzbekHeritage.tsx
│   │   │   └── ... (20 ta to‘liq shablon)
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── TemplatesPage.tsx
│   │   │   ├── TemplatePreviewPage.tsx
│   │   │   ├── CreateInvitationPage.tsx
│   │   │   ├── InvitationPreviewPage.tsx
│   │   │   ├── PublicInvitationPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── PricingPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   └── NotFoundPage.tsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useTemplates.ts
│   │   │   └── useInvitations.ts
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── template.service.ts
│   │   │   └── invitation.service.ts
│   │   ├── types/
│   │   │   ├── invitation.ts
│   │   │   ├── template.ts
│   │   │   └── user.ts
│   │   ├── utils/
│   │   │   ├── date.ts
│   │   │   └── share.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   │
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── server/                         # Backend (Node.js, Express, TypeScript, Prisma)
│   ├── src/
│   │   ├── config/
│   │   │   └── env.ts
│   │   ├── middleware/
│   │   │   ├── authenticate.ts
│   │   │   ├── authorizeOwner.ts
│   │   │   ├── errorHandler.ts
│   │   │   └── rateLimit.ts
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── auth.controller.ts
│   │   │   │   └── auth.service.ts
│   │   │   ├── templates/
│   │   │   │   ├── template.routes.ts
│   │   │   │   └── template.service.ts
│   │   │   ├── invitations/
│   │   │   │   ├── invitation.routes.ts
│   │   │   │   ├── invitation.controller.ts
│   │   │   │   ├── invitation.service.ts
│   │   │   │   ├── invitation.schema.ts
│   │   │   │   └── slug.ts
│   │   │   └── rsvp/
│   │   │       ├── rsvp.routes.ts
│   │   │       └── rsvp.service.ts
│   │   ├── app.ts
│   │   └── index.ts
│   ├── tests/
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── prisma/                         # Database Schema & Migrations
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── package.json
├── .gitignore
├── README.md
└── railway.json
```

---

## 🚀 Ishga Tushirish (Quick Start)

### 1. Bog‘liqliklarni o‘rnatish:
```bash
# Ildiz papkada
npm install

# Client va Server bog‘liqliklari
cd client && npm install
cd ../server && npm install
cd ..
```

### 2. Ma’lumotlar bazasini tayyorlash:
```bash
npx prisma db push
npx tsx prisma/seed.ts
```

### 3. Loyihani ishga tushirish:
```bash
npm run dev
```
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5001](http://localhost:5001)

---

## 🎨 Mavjud 20 ta Shablonlar
- **Luxury**: Royal Gold, Black Tie, Pearl Elegance, Burgundy Royale
- **Milliy**: Uzbek Heritage, Suzani Romance, Oriental Palace, Silk Road
- **Modern**: Minimal White, Editorial Magazine, Modern Beige, Monochrome
- **Romantik**: Rose Garden, Botanical Love, Pastel Dream, Watercolor Romance
- **Kreativ & Klassik**: Night Sky, Cinematic Love, Glass Elegance, Floral Frame

---

## ☁️ Deployment
- **Frontend**: Vercel (SPA routing va API proksi bilan `client/vercel.json`)
- **Backend & PostgreSQL**: Railway (`railway.json`)
