import { authTables } from './../node_modules/@convex-dev/auth/src/server/implementation/types';
import { defineSchema } from "convex/server";

const schema = defineSchema({
    ...authTables,
});

export default schema;