import { db } from "../lib/db";
import {
  payments,
  invoiceItems,
  invoices,
  clients,
  businessProfiles,
  sessions,
  accounts,
  verifications,
  users,
} from "../lib/db/schema";

async function resetDatabase() {
  console.log("🗑️  Clearing database...\n");

  try {
    // Delete in correct order (foreign key constraints)
    console.log("  ⏳ Deleting payments...");
    await db.delete(payments);
    console.log("  ✅ Payments deleted");

    console.log("  ⏳ Deleting invoice items...");
    await db.delete(invoiceItems);
    console.log("  ✅ Invoice items deleted");

    console.log("  ⏳ Deleting invoices...");
    await db.delete(invoices);
    console.log("  ✅ Invoices deleted");

    console.log("  ⏳ Deleting clients...");
    await db.delete(clients);
    console.log("  ✅ Clients deleted");

    console.log("  ⏳ Deleting business profiles...");
    await db.delete(businessProfiles);
    console.log("  ✅ Business profiles deleted");

    console.log("  ⏳ Deleting sessions...");
    await db.delete(sessions);
    console.log("  ✅ Sessions deleted");

    console.log("  ⏳ Deleting accounts...");
    await db.delete(accounts);
    console.log("  ✅ Accounts deleted");

    console.log("  ⏳ Deleting verifications...");
    await db.delete(verifications);
    console.log("  ✅ Verifications deleted");

    console.log("  ⏳ Deleting users...");
    await db.delete(users);
    console.log("  ✅ Users deleted");

    console.log("\n✨ Database cleared successfully!");
    console.log("You can now run 'npm run db:seed' to populate with new data.\n");
    process.exit(0);
  } catch (error) {
    console.error("❌ Reset failed:", error);
    process.exit(1);
  }
}

resetDatabase();
