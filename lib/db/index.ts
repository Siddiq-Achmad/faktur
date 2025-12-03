import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

// Singleton pattern to reuse database connection across hot reloads
const globalForDb = global as unknown as { db: ReturnType<typeof drizzle> };

let sqlite: ReturnType<typeof createClient>;

if (!globalForDb.db) {
  sqlite = createClient({
    url: "file:sqlite.db",
  });
  globalForDb.db = drizzle(sqlite, { schema });
}

export const db = globalForDb.db;
