# Docs

| File | Description |
|------|-------------|
| [PRISMA-DATABASE-GUIDE.md](./PRISMA-DATABASE-GUIDE.md) | Full Prisma guide — schema, migrations, client |
| [AGENTS.md](./AGENTS.md) | AI agent instructions |
| [CLAUDE.md](./CLAUDE.md) | Claude AI configuration |

---

## Quick Start — From Zero to Tables

### Step 1: Understand `prisma/schema.prisma`

This file is the **blueprint** of your entire database. You write your table structure here using Prisma's language.

### Step 2: The First Command — `prisma generate`

The **very first step** after writing the `schema.prisma` file is:

```bash
npm run prisma:generate
```

This creates the **Prisma Client** — JavaScript code in `app/generated/prisma/` that lets your app talk to the database.

### Step 3: The Second Command — `prisma migrate dev`

```bash
npm run prisma:migrate -- --name init
```

This creates the **actual tables** in your MySQL database.

---

## The Full Flow

```
You write:          prisma/schema.prisma    ← You edit this file (the blueprint)
                          │
prisma generate:    app/generated/prisma/   ← Auto-generated client code (DO NOT EDIT)
                          │
prisma migrate:     MySQL Database          ← Real tables created in MySQL
                          │
Your app code:      Uses Prisma Client      ← Reads/writes data from/to MySQL
```

For full details, open **[PRISMA-DATABASE-GUIDE.md](./PRISMA-DATABASE-GUIDE.md)**.