-- Rental Sedulur Mojokerto - Supabase schema
-- Jalankan di SQL Editor Supabase (rkriinnzjdpchtcdtfay)

-- Units 8 unit
create table if not exists units (
  id text primary key,
  tipe text check (tipe in ('PS4','PS3')),
  harga_harian int not null, harga_malam int not null, harga_mingguan int not null
);
insert into units values
('SD-PS4-01','PS4',130000,75000,500000),
('SD-PS4-02','PS4',130000,75000,500000),
('SD-PS4-03','PS4',130000,75000,500000),
('SD-PS4-04','PS4',130000,75000,500000),
('SD-PS4-05','PS4',130000,75000,500000),
('SD-PS3-01','PS3',100000,50000,350000),
('SD-PS3-02','PS3',100000,50000,350000),
('SD-PS3-03','PS3',100000,50000,350000)
on conflict (id) do nothing;

-- Bookings
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  unit_id text not null references units(id) on delete restrict,
  nama text not null,
  wa text not null,
  paket text not null check (paket in ('harian','malam','mingguan')),
  tgl_mulai date not null,
  tgl_selesai date not null,
  total int not null check (total >= 0),
  status text not null default 'pending' check (status in ('pending','confirmed','selesai','batal')),
  created_at timestamptz default now(),
  check (tgl_selesai >= tgl_mulai)
);
create index if not exists idx_bookings_unit_tgl on bookings(unit_id, tgl_mulai, tgl_selesai);
create index if not exists idx_bookings_status on bookings(status);

-- Anti double-booking: trigger cegah overlap per unit_id
create or replace function cegah_overlap() returns trigger as $$
begin
  if exists (
    select 1 from bookings
    where unit_id = NEW.unit_id
      and status in ('pending','confirmed')
      and daterange(tgl_mulai, tgl_selesai, '[]') && daterange(NEW.tgl_mulai, NEW.tgl_selesai, '[]')
      and id <> NEW.id
  ) then
    raise exception 'Unit % sudah dibooking di rentang % s/d %', NEW.unit_id, NEW.tgl_mulai, NEW.tgl_selesai;
  end if;
  return NEW;
end; $$ language plpgsql;

drop trigger if exists trg_cegah_overlap on bookings;
create trigger trg_cegah_overlap before insert or update on bookings
for each row execute function cegah_overlap();

-- RLS: buka baca units untuk publik, bookings insert/select publik butuh anon key (sesuai kebijakan sekarang)
alter table units enable row level security;
alter table bookings enable row level security;
drop policy if exists "units read all" on units;
create policy "units read all" on units for select using (true);
drop policy if exists "bookings read all" on bookings;
create policy "bookings read all" on bookings for select using (true);
drop policy if exists "bookings insert all" on bookings;
create policy "bookings insert all" on bookings for insert with check (true);
drop policy if exists "bookings update admin" on bookings;
create policy "bookings update admin" on bookings for update using (true);
