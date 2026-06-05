import Fastify from "fastify";
import type { Profile } from "@citizenready/types";

const app = Fastify({logger: true});

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