# Supabase review setup

1. Create a Supabase project.
2. In the project's SQL Editor, run `supabase-reviews.sql`.
3. Copy the Project URL and Publishable key from the project's API settings.
4. Put them in `supabase-config.js` as `projectUrl` and `anonKey`, then publish the site.

Use only the Publishable key in the website. Never put a Secret or service-role key in `supabase-config.js`.

Reviews are public. Visitors can read and add a 1–5 star rating with a 3–500 character comment; the database does not allow public edits or deletions.
