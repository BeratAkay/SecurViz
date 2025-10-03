import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// SOAR API Widget Request Schema
export const soarWidgetRequestSchema = z.object({
  id: z.string(),
  name: z.string(),
  dataType: z.string(),
  widgetType: z.string(),
  query: z.string(),
  dateRange: z.object({
    period: z.object({
      by: z.string(),
      fromValue: z.number(),
      toValue: z.number(),
    }),
  }),
  params: z.object({
    groupBy: z.array(z.string()),
  }),
  category: z.string(),
});

// SOAR API Widget Response Schema
export const soarWidgetResponseSchema = z.object({
  data: z.array(z.record(z.any())),
  total: z.number().optional(),
});

export type SoarWidgetRequest = z.infer<typeof soarWidgetRequestSchema>;
export type SoarWidgetResponse = z.infer<typeof soarWidgetResponseSchema>;
