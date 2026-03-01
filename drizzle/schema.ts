import { pgTable, foreignKey, integer, varchar, unique } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const calendar = pgTable("calendar", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "calendar_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	userId: integer("user_id").notNull(),
	startDate: varchar("start_date", { length: 255 }).notNull(),
	endDate: varchar("end_date", { length: 255 }).notNull(),
	carType: varchar("car_type", { length: 50 }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "calendar_user_id_users_id_fk"
		}),
]);

export const users = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "users_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	fullName: varchar("full_name", { length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	password: varchar({ length: 255 }).notNull(),
	totalHours: integer("total_hours").default(30).notNull(),
	currentHours: integer("current_hours").default(0).notNull(),
	carType: varchar("car_type", { length: 50 }).notNull(),
	phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);
