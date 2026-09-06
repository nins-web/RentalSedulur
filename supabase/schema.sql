create table units (
  id text primary key,
  tipe text check (tipe in ('PS4','PS3')),
  harga_harian int, harga_malam int, harga_mingguan int
);
insert into units values
('SD-PS4-01','PS4',130000,75000,500000),
('SD-PS4-02','PS4',130000,75000,500000),
('SD-PS4-03','PS4',130000,75000,500000),
('SD-PS4-04','PS4',130000,75000,500000),
('SD-PS4-05','PS4',130000,75000,500000),
('SD-PS3-01','PS3',100000,50000,350000),
('SD-PS3-02','PS3',100000,50000,350000),
('SD-PS3-03','PS3',100000,50000,350000);
