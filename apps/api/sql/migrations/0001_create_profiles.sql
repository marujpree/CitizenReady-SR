CREATE TABLE public.profiles (
    id UUID PRIMARY KEY
        REFERENCES auth.users (id)
        ON DELETE CASCADE,

    email TEXT NOT NULL,

    language TEXT NOT NULL
    DEFAULT 'en',

    CONSTRAINT profiles_language_check
        CHECK (language IN ('en', 'es')),

    is_pro BOOLEAN NOT NULL
        DEFAULT FALSE,

    stripe_customer_id TEXT,
    created_at TIMESTAMPTZ NOT NULL
        DEFAULT NOW()

);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

