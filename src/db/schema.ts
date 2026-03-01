import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  full_name: varchar({ length: 255 }).notNull(),
  phone_number: varchar({ length: 20 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  total_hours: integer().notNull().default(30),
  current_hours: integer().notNull().default(0),
  car_type: varchar({ length: 50 }).notNull(),
  place: varchar({ length: 255 }).notNull().default("Bielany"),
  role: varchar({ length: 20 }).notNull().default("user"),
});

export const calendarTable = pgTable("calendar", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer().notNull().references(() => usersTable.id),
  start_date: varchar({ length: 255 }).notNull(),
  end_date: varchar({ length: 255 }).notNull(),
  car_type: varchar({ length: 50 }).notNull(),
});