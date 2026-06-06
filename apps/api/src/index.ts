import "dotenv/config";
import Fastify from "fastify";
import { createClient } from "@supabase/supabase-js";
import type { Profile } from "@citizenready/types";

const app = Fastify({logger: true});

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase env vars - check apps/api/.env");
}
const supabase = createClient(supabaseUrl, supabaseKey);

app.get("/db-test", async () => {
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) return { connected: false, error: error.message };
  return { connected: true, userCount: data.users.length };
});


app.get("/health", async() => {
    return { ok: true}
});

const demoProfile: Profile = {
    id: "demo-1",
    email: "demo@citizenready.app",
    language: "en",
    isPro: false,
    stripeCustomerId: null,
};

app.get("/demo-profile", async () => {
    return demoProfile;
});

const start = async () => {
    try {
        // await listen here
        await app.listen ({port: 4000, host: "0.0.0.0"})
    } catch (err) {
        app.log.error(err);
        process.exit(1)
        // log + exit
    }
};

// call start
start()