# Prisma Database Guide

## Table of Contents

1. [What is Prisma?](#1-what-is-prisma)
2. [The Full Process (Overview)](#2-the-full-process-overview)
3. [File by File Explanation](#3-file-by-file-explanation)
   - [prisma/schema.prisma (THE BLUEPRINT)](#31-prismaschemaprisma-the-blueprint)
   - [prisma.config.ts (THE CONFIG)](#32-prismaconfigts-the-config)
   - [.env (THE SECRETS)](#33-env-the-secrets)
   - [app/generated/prisma (THE CLIENT)](#34-appgeneratedprisma-the-client)
   - [prisma/migrations (THE HISTORY)](#35-prismamigrations-the-history)
4. [Step-by-Step: What I Did](#4-step-by-step-what-i-did)
   - [Step 1: I Wrote the Schema](#41-step-1-i-wrote-the-schema)
   - [Step 2: I Ran prisma generate](#42-step-2-i-ran-prisma-generate)
   - [Step 3: I Tried prisma migrate (failed — no MySQL)](#43-step-3-i-tried-prisma-migrate)
5. [The Two Commands Explained](#5-the-two-commands-explained)
   - [npm run prisma:generate — What It Does](#51-npm-run-prismagenerate)
   - [npm run prisma:migrate — What It Does](#52-npm-run-prismamigrate)
6. [The Real Database Tables (What MySQL Sees)](#6-the-real-database-tables-what-mysql-sees)
7. [Common Commands](#7-common-commands)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. What is Prisma?

Prisma is a **bridge** between your JavaScript/TypeScript code and your MySQL database.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  schema.prisma   │ ──▶ │  prisma migrate  │ ──▶ │   MySQL Tables   │
│  (Your Blueprint)│     │  (Build it)      │     │   (Real Data)    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                                              │
         ▼                                              ▼
┌─────────────────┐                             ┌─────────────────┐
│  prisma generate │                             │   Your App Code  │
│       ▼          │                             │   reads/writes   │
│  Client Code     │◀────────────────────────────│  via Client      │
└─────────────────┘                             └─────────────────┘
```

**Key idea:** You NEVER write SQL directly. You write Prisma code, and Prisma translates it to SQL for you.

---

## 2. The Full Process (Overview)

This is the exact sequence I followed:

```
┌─────────────────────────────────────────────────────────────────┐
│                          YOUR JOB                                │
│                                                                  │
│   1. Write the blueprint → prisma/schema.prisma                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    STEP 1: prisma generate                       │
│                                                                  │
│   Creates: app/generated/prisma/                                 │
│   What: JavaScript code that your app will use to talk to DB     │
│   When: Every time you change schema.prisma                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    STEP 2: prisma migrate                        │
│                                                                  │
│   Creates: Real tables inside MySQL database                     │
│   Also creates: prisma/migrations/ folder (history)              │
│   Command: npm run prisma:migrate -- --name <name>               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. File by File Explanation

### 3.1 `prisma/schema.prisma` (THE BLUEPRINT)

This is the **most important file**. It describes what your database looks like.

Let me explain **every single line** of the file I created:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../app/generated/prisma"
}
```

| Part | Meaning |
|------|---------|
| `generator client` | Tells Prisma: "Generate JavaScript code so my app can talk to the database" |
| `provider = "prisma-client"` | Use the Prisma Client library |
| `output = "../app/generated/prisma"` | Put the generated code in `app/generated/prisma/` |

---

```prisma
datasource db {
  provider = "mysql"
}
```

| Part | Meaning |
|------|---------|
| `datasource db` | Tells Prisma: "Connect to a database" |
| `provider = "mysql"` | Use MySQL |

**Important:** The actual connection URL (with username, password, database name) is NOT here. It's in `.env`. Prisma reads it from there.

---

```prisma
enum Role {
  admin
  user
}
```

| Part | Meaning |
|------|---------|
| `enum Role` | A custom type that can only be `admin` or `user` |
| `admin` / `user` | The two allowed values |

In MySQL, this becomes: `ENUM('admin', 'user')` — a column that can only hold one of these two values.

---

```prisma
enum OrderStatus {
  pending
  paid
  cancelled
  refunded
}
```

Same idea — for order status tracking.

---

```prisma
model User {
  userId       String   @id @map("user_id")
  firstName    String   @map("first_name")
  lastName     String   @map("last_name")
  mobileNumber String   @unique @map("mobile_number")
  email        String   @unique
  password     String
  role         Role     @default(user)
  basket       Basket?
  orders       Order[]
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")

  @@map("users")
}
```

**Line by line breakdown:**

| Line | Meaning |
|------|---------|
| `model User { }` | Create a table called `User` (how Prisma refers to it) |
| `@@map("users")` | But in MySQL, name it `users` (plural, lowercase) |

| Column | Type | Attributes | In MySQL |
|--------|------|------------|----------|
| `userId` | `String` | `@id` (primary key) | `user_id VARCHAR(191) PRIMARY KEY` |
| `firstName` | `String` | `@map("first_name")` | `first_name VARCHAR(191) NOT NULL` |
| `lastName` | `String` | `@map("last_name")` | `last_name VARCHAR(191) NOT NULL` |
| `mobileNumber` | `String` | `@unique`, `@map("mobile_number")` | `mobile_number VARCHAR(191) UNIQUE` |
| `email` | `String` | `@unique` | `email VARCHAR(191) UNIQUE` |
| `password` | `String` | — | `password VARCHAR(191) NOT NULL` |
| `role` | `Role` (enum) | `@default(user)` | `role ENUM('admin','user') DEFAULT 'user'` |
| `basket` | Relation | `Basket?` (optional) | No column — creates a foreign key in `baskets` table |
| `orders` | Relation | `Order[]` (many) | No column — creates foreign keys in `orders` table |
| `createdAt` | `DateTime` | `@default(now())` | `created_at DATETIME DEFAULT NOW()` |
| `updatedAt` | `DateTime` | `@updatedAt` | `updated_at DATETIME` (auto-updates on change) |

**What is `@map`?**
Prisma uses `camelCase` (like `firstName`). MySQL uses `snake_case` (like `first_name`). `@map("first_name")` connects them — Prisma calls it `firstName`, MySQL stores it as `first_name`.

---

```prisma
model Package {
  packageId   Int      @id @default(autoincrement()) @map("package_id")
  title       String
  description String?
  price       Decimal  @db.Decimal(10, 2)
  duration    Int?     @map("duration")
  isActive    Boolean  @default(true) @map("is_active")
  basketItems BasketItem[]
  orderItems  OrderItem[]
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  @@map("packages")
}
```

| Attribute | Meaning |
|-----------|---------|
| `@id @default(autoincrement())` | Auto-incrementing number (1, 2, 3...) |
| `String?` | `?` means optional — can be NULL |
| `@db.Decimal(10, 2)` | Decimal number: 10 digits total, 2 after decimal (e.g., 12345678.90) |
| `Boolean @default(true)` | true/false, defaults to true |

---

```prisma
model Basket {
  basketId Int          @id @default(autoincrement()) @map("basket_id")
  userId   String       @unique @map("user_id")
  user     User         @relation(fields: [userId], references: [userId], onDelete: Cascade)
  items    BasketItem[]
  createdAt DateTime   @default(now()) @map("created_at")
  updatedAt DateTime   @updatedAt @map("updated_at")

  @@map("baskets")
}
```

**Relationships explained:**

```
@relation(fields: [userId], references: [userId], onDelete: Cascade)
           │                    │
           ▼                    ▼
   "This table's       "Points to this
    userId column       column in User
    holds the FK"       table"
```

| Part | Meaning |
|------|---------|
| `@unique` on `userId` | One basket per user (one-to-one) |
| `onDelete: Cascade` | If user is deleted, their basket is also deleted |
| `items BasketItem[]` | This basket has many items (one-to-many) |

---

```prisma
model BasketItem {
  basketItemId Int     @id @default(autoincrement()) @map("basket_item_id")
  basketId     Int     @map("basket_id")
  basket       Basket  @relation(fields: [basketId], references: [basketId], onDelete: Cascade)
  packageId    Int     @map("package_id")
  package      Package @relation(fields: [packageId], references: [packageId], onDelete: Cascade)
  quantity     Int     @default(1)

  @@map("basket_items")
}
```

This is a **join table** — it connects `Basket` to `Package`. Each row says: "Basket #5 has 2 of Package #3."

---

```prisma
model Order {
  orderId     Int          @id @default(autoincrement()) @map("order_id")
  userId      String       @map("user_id")
  user        User         @relation(fields: [userId], references: [userId], onDelete: Cascade)
  status      OrderStatus  @default(pending)
  totalAmount Decimal      @db.Decimal(10, 2) @map("total_amount")
  items       OrderItem[]
  createdAt   DateTime     @default(now()) @map("created_at")
  updatedAt   DateTime     @updatedAt @map("updated_at")

  @@map("orders")
}
```

Similar to Basket, but this is a **completed order** after checkout.

---

```prisma
model OrderItem {
  orderItemId Int     @id @default(autoincrement()) @map("order_item_id")
  orderId     Int     @map("order_id")
  order       Order   @relation(fields: [orderId], references: [orderId], onDelete: Cascade)
  packageId   Int     @map("package_id")
  package     Package @relation(fields: [packageId], references: [packageId], onDelete: Cascade)
  quantity    Int
  price       Decimal @db.Decimal(10, 2)

  @@map("order_items")
}
```

**Why `price` is stored here:** The package price might change later. When a customer buys something, we save the price they actually paid (a "snapshot").

---

### 3.2 `prisma.config.ts` (THE CONFIG)

```typescript
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",        // Where is the schema file?
  migrations: {
    path: "prisma/migrations",           // Where to store migration history?
  },
  datasource: {
    url: process.env["DATABASE_URL"],    // Read database URL from .env
  },
});
```

This file tells Prisma:
- Where to find `schema.prisma`
- Where to save migration files
- Where to find the database URL (from `.env`)

### 3.3 `.env` (THE SECRETS)

```
DATABASE_URL="mysql://root:mysql@localhost:3306/fitness_webapp"
```

| Part | What it means |
|------|---------------|
| `mysql://` | Database type |
| `root` | **Username** |
| `mysql` | **Password** |
| `localhost` | Server address (your computer) |
| `3306` | Port (default MySQL port) |
| `fitness_webapp` | **Database name** |

> **Note:** The `.env` file is NOT committed to Git (it's in `.gitignore`). Each developer has their own.

### 3.4 `app/generated/prisma` (THE CLIENT)

This folder contains **auto-generated JavaScript code**. It is created when you run:

```bash
npm run prisma:generate
```

**What's inside:**

```
app/generated/prisma/
├── client.js          ← The main Prisma Client code
├── index.js           ← Exports the client
├── index.d.ts         ← TypeScript type definitions
├── schema.prisma      ← A copy of your schema (for reference)
├── runtime/           ← Internal Prisma runtime code
├── wasm/              ← WebAssembly modules
└── edge.d.ts          ← Edge runtime types
```

**NEVER edit these files.** They are re-generated every time you run `prisma generate`.

**What does it do?**
It gives you functions like:

```typescript
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

// Read all users
const users = await prisma.user.findMany();

// Create a user
const newUser = await prisma.user.create({
  data: { firstName: "John", lastName: "Doe", email: "john@example.com", password: "..." }
});

// Find orders for a user
const orders = await prisma.order.findMany({
  where: { userId: "abc123..." }
});
```

Notice how the table names (`User`, `Order`, `Package`) become function names (`prisma.user`, `prisma.order`, `prisma.package`).

### 3.5 `prisma/migrations` (THE HISTORY)

This folder tracks every change you've made to the database.

```
prisma/migrations/
├── 20260724160000_init/
│   ├── migration.sql     ← The actual SQL that was run
│   └── migration_lock.toml  ← Tracks the database provider
```

**NEVER manually edit these files.** They are your database's version history, like Git commits for your database schema.

---

## 4. Step-by-Step: What I Did

### 4.1 Step 1: I Wrote the Schema

I opened `prisma/schema.prisma` and wrote all the models (User, Package, Basket, BasketItem, Order, OrderItem).

### 4.2 Step 2: I Ran `prisma generate`

```bash
npm run prisma:generate
```

**What happened:**

```
Prisma schema loaded from prisma\schema.prisma
✔ Generated Prisma Client (7.9.0) to .\app\generated\prisma in 195ms
```

Prisma **validated** my schema (checked for errors). Since it was correct, it generated the client code in `app/generated/prisma/`.

**Why run generate FIRST?**
- The `package.json` has `"postinstall": "prisma generate"` — so it runs automatically after `npm install` too
- It verifies your schema syntax is correct
- It creates the code your app uses to talk to the database

### 4.3 Step 3: I Tried `prisma migrate`

```bash
npm run prisma:migrate -- --name init
```

**What happened:**

```
Error: P1001: Can't reach database server at `localhost:3306`
Please make sure your database server is running at `localhost:3306`.
```

This failed because **MySQL wasn't running**. Migration needs a real MySQL server to create tables in.

**When MySQL IS running, this would happen:**

1. Prisma reads `schema.prisma`
2. Generates SQL like:
   ```sql
   CREATE TABLE `users` (
     `user_id` VARCHAR(191) NOT NULL,
     `first_name` VARCHAR(191) NOT NULL,
     ...
     PRIMARY KEY (`user_id`)
   );
   ```
3. Runs the SQL against MySQL
4. Saves the SQL in `prisma/migrations/20260724160000_init/migration.sql`
5. Creates all 6 tables in the database

---

## 5. The Two Commands Explained

### 5.1 `npm run prisma:generate`

**When to run:** Every time you change `schema.prisma`

**What it creates:** `app/generated/prisma/` — JavaScript code

**What happens internally:**

```
schema.prisma  ──▶  Prisma reads it
                    │
                    ├── Checks for syntax errors
                    ├── Generates TypeScript types (so your IDE shows autocomplete)
                    ├── Generates JavaScript functions (findMany, create, update, delete)
                    └── Saves to app/generated/prisma/
```

**Think of it like this:** You designed a house blueprint (schema.prisma). `prisma generate` builds a model of that house that you can touch and look at. It's not the real house yet (MySQL tables), but you can see what it will look like.

### 5.2 `npm run prisma:migrate`

**When to run:** After `prisma generate`, to actually create/update the real database

**What it creates:** Real MySQL tables

**What happens internally:**

```
schema.prisma  ──▶  Prisma compares with current database
                    │
                    ├── "I see no tables exist yet"
                    ├── Generates CREATE TABLE SQL for all models
                    ├── Saves SQL to prisma/migrations/<timestamp>_<name>/
                    ├── Executes SQL against MySQL
                    └── Tables are now alive in the database!
```

**Migration name:** The `--name init` gives it a readable name. Next time you add a column, you'd run:
```bash
npm run prisma:migrate -- --name added_age_to_user
```

---

## 6. The Real Database Tables (What MySQL Sees)

After a successful migration, here are the actual MySQL tables created:

```
fitness_webapp DATABASE
├── users
│   ├── user_id         VARCHAR(191) PRIMARY KEY
│   ├── first_name      VARCHAR(191) NOT NULL
│   ├── last_name       VARCHAR(191) NOT NULL
│   ├── mobile_number   VARCHAR(191) UNIQUE
│   ├── email           VARCHAR(191) UNIQUE
│   ├── password        VARCHAR(191) NOT NULL
│   ├── role            ENUM('admin','user') DEFAULT 'user'
│   ├── created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
│   └── updated_at      DATETIME
│
├── packages
│   ├── package_id      INT AUTO_INCREMENT PRIMARY KEY
│   ├── title           VARCHAR(191) NOT NULL
│   ├── description     TEXT
│   ├── price           DECIMAL(10,2)
│   ├── duration        INT
│   ├── is_active       TINYINT DEFAULT 1
│   ├── created_at      DATETIME
│   └── updated_at      DATETIME
│
├── baskets
│   ├── basket_id       INT AUTO_INCREMENT PRIMARY KEY
│   ├── user_id         VARCHAR(191) UNIQUE FOREIGN KEY → users(user_id)
│   ├── created_at      DATETIME
│   └── updated_at      DATETIME
│
├── basket_items
│   ├── basket_item_id  INT AUTO_INCREMENT PRIMARY KEY
│   ├── basket_id       INT FOREIGN KEY → baskets(basket_id)
│   ├── package_id      INT FOREIGN KEY → packages(package_id)
│   └── quantity        INT DEFAULT 1
│
├── orders
│   ├── order_id        INT AUTO_INCREMENT PRIMARY KEY
│   ├── user_id         VARCHAR(191) FOREIGN KEY → users(user_id)
│   ├── status          ENUM('pending','paid','cancelled','refunded') DEFAULT 'pending'
│   ├── total_amount    DECIMAL(10,2)
│   ├── created_at      DATETIME
│   └── updated_at      DATETIME
│
└── order_items
    ├── order_item_id   INT AUTO_INCREMENT PRIMARY KEY
    ├── order_id        INT FOREIGN KEY → orders(order_id)
    ├── package_id      INT FOREIGN KEY → packages(package_id)
    ├── quantity        INT
    └── price           DECIMAL(10,2)
```

---

## 7. Common Commands

| Command | What it does | When to run |
|---------|-------------|-------------|
| `npm run prisma:generate` | Generate client code in `app/generated/prisma/` | After every schema change, after pulling from Git |
| `npm run prisma:migrate -- --name <name>` | Create + run a migration to update MySQL tables | After every schema change |
| `npm run prisma:studio` | Open a web GUI to see/edit data | Any time (read-only or edit data visually) |
| `npx prisma validate` | Check if schema.prisma has errors | To debug problems |
| `npx prisma format` | Auto-format your schema file | Before committing |

---

## 8. Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `Can't reach database server` | MySQL is not running | Start XAMPP/WAMP/MySQL service |
| `Unknown database` | Database doesn't exist in MySQL | `CREATE DATABASE fitness_webapp;` |
| `Access denied` | Wrong password in `.env` | Check `.env` username/password |
| `Already exists` | Migration already applied | Give it a new name: `--name new_change` |
| `Client needs regeneration` | schema changed but generate not run | Run `npm run prisma:generate` |

---

## Visual Summary

```
┌──────────────────────────────────────────────────────────────┐
│                    YOUR DATABASE PIPELINE                      │
│                                                              │
│  schema.prisma (You write this)                              │
│       │                                                     │
│       ▼                                                     │
│  prisma generate ───▶ app/generated/prisma/                 │
│       │                 (Client code your app uses)          │
│       ▼                                                     │
│  prisma migrate ───▶ MySQL Database                         │
│                        (Real tables with data)               │
│                                                              │
│  Now your app can:                                           │
│    prisma.user.findMany()   ← reads from MySQL users table   │
│    prisma.user.create()     ← writes to MySQL users table    │
│    prisma.order.findMany()  ← reads from MySQL orders table  │
└──────────────────────────────────────────────────────────────┘
```