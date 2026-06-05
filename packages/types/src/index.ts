export type Language = "en" | "es";

export type Profile = {
    id: string;
    email: string;
    language: Language;
    isPro: boolean;
    stripeCustomerId: string | null;
};