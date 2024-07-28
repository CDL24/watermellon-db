import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { mySchema } from "../models/schema";
import { Database } from "@nozbe/watermelondb";
import User from "../models/User";

const adapter = new SQLiteAdapter({
    schema: mySchema
})

export const database = new Database({
    adapter,
    modelClasses: [User],
    actionEnabled: true
})