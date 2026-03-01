import { relations } from "drizzle-orm/relations";
import { users, calendar } from "./schema";

export const calendarRelations = relations(calendar, ({one}) => ({
	user: one(users, {
		fields: [calendar.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	calendars: many(calendar),
}));