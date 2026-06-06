-- USERS CAN READ THEIR OWN PROFILE
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (
    (SELECT auth.uid()) = id
);


-- USERS CAN UPDATE THEIR OWN PROFILE
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (
    (SELECT auth.uid()) = id
)
WITH CHECK (
    (SELECT auth.uid()) = id
);