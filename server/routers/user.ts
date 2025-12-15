import { createTRPCRouter, protectedProcedure } from "../trpc";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const userRouter = createTRPCRouter({
  getOnboardingStatus: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId;

    const [user] = await db
      .select({
        onboardingCompletedAt: users.onboardingCompletedAt,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      hasCompletedOnboarding: !!user.onboardingCompletedAt,
    };
  }),

  completeOnboarding: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.userId;

    const result = await db
      .update(users)
      .set({
        onboardingCompletedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();

    if (!result.length) {
      throw new Error("Failed to update user");
    }

    return { success: true };
  }),
});
