# Assetflow Marketplace

Assetflow is a high-performance, multi-vendor digital asset marketplace built to handle concurrent transactions, automated vendor onboarding, and secure split payouts. The application decouples its architecture with a high-speed Next.js frontend and a resilient NestJS backend.

### [Launch Live Interactive Demo](https://assetflow-frontend-1cap.vercel.app)

---

## Tech Stack & Architecture

* **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS
* **Backend:** NestJS, TypeScript
* **Database & Caching:** PostgreSQL, Prisma ORM, Redis
* **Payment Processing:** Stripe Connect (Express/Custom onboarding)
* **Task Queueing:** BullMQ (for async event processing)

---

## Key Engineering Features

### 1. Automated Vendor Onboarding (Stripe Connect)
* Integrated standard/express onboarding flows allowing users to upgrade to "Seller" status seamlessly.
* Implemented webhooks to securely listen to Stripe account status changes and update local PostgreSQL database records in real-time.

### 2. Multi-Party Split Payouts
* Architected a secure checkout system handling multi-vendor carts.
* The application automatically calculates and routes a **10% platform marketplace fee** directly to the platform account while distributing the remaining **90% balance** instantly to the respective vendor's balance.

### 3. High-Performance Caching & Queueing
* Configured **Redis** to handle high-frequency data caching for marketplace asset listings, significantly reducing direct database reads.
* Utilized **BullMQ** within NestJS to handle asynchronous tasks like order processing, email notifications, and background status checks without blocking the main event loop.

### 4. Dynamic Dashboard Metrics
* Real-time calculation of seller analytics, tracking lifetime gross revenue, platform net earnings, and active digital product inventory.

---

## Core Database Models

The relational schema is optimized for data integrity using **PostgreSQL**:
* `User`: Manages authentication states and Stripe account reference keys.
* `Asset`: Tracks digital files, pricing parameters, download limits, and owner IDs.
* `Order`: Handles immutable transactional data, purchase success states, and distribution logs.

---

## Let's Build

If you are looking to build a scalable multi-vendor platform, SaaS product, or need advanced API / payment integrations, feel free to reach out to discuss your project scope.
