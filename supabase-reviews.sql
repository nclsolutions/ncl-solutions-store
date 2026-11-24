create table if not exists public.website_reviews (
  id uuid primary key default gen_random_uuid(),
  rating smallint not null check (rating between 1 and 5),
  comment text not null check (char_length(btrim(comment)) between 3 and 500),
  created_at timestamptz not null default now()
);

alter table public.website_reviews enable row level security;

drop policy if exists "Public can read website reviews" on public.website_reviews;
create policy "Public can read website reviews"
on public.website_reviews
for select
to anon
using (true);

drop policy if exists "Public can submit website reviews" on public.website_reviews;
create policy "Public can submit website reviews"
on public.website_reviews
for insert
to anon
with check (
  rating between 1 and 5
  and char_length(btrim(comment)) between 3 and 500
);

grant select, insert on public.website_reviews to anon;
