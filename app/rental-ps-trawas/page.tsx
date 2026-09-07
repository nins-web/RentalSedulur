import { supabase } from '@/lib/supabase'
export const revalidate = 0
export const metadata = {
  title: 'Rental PS Trawas — PS4 75k/malam, 8 Unit Siap Antar | Rental Sedulur',
  description: 'Rental PS Trawas termurah — 5 PS4 130k/hari 75k/malam 500k/minggu, 3 PS3 100k/50k/350k. Paket malam hemat 40%, antar gratis, booking anti bentrok. WA 081289538855',
}
export default async function Page(){
  let units:any[]=[]
  try{ const {data}=await supabase.from('units').select('*').order('id'); if(data) units=data }catch{}
  if(units.length===0) units=[
    {id:'SD-PS4-01',tipe:'PS4',harga_harian:130000,harga_malam:75000,harga_mingguan:500000},
    {id:'SD-PS4-02',tipe:'PS4',harga_harian:130000,harga_malam:75000,harga_mingguan:500000},
    {id:'SD-PS4-03',tipe:'PS4',harga_harian:130000,harga_malam:75000,harga_mingguan:500000},
    {id:'SD-PS3-01',tipe:'PS3',harga_harian:100000,harga_malam:50000,harga_mingguan:350000},
  ]
  return (
    <main className="bg-[#F8FAFC] min-h-screen">
      <section className="bg-[#0F0F23] text-[#E2E8F0] py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="font-display text-3xl">RENTAL PS TRAWAS — <span className="text-[#A78BFA]">8 UNIT SIAP ANTAR</span></h1>
          <p className="mt-3 text-[#94A3B8]">Wilayah: Trawas dan sekitar — antar 1 jam, gratis 5km. Paket malam 19:00-07:00 cuma 75k (PS4).</p>
          <a href="/booking" className="mt-6 inline-block bg-[#25D366] hover:bg-[#1DA851] text-white px-6 py-3 rounded-[12px] font-semibold cursor-pointer">Booking Sekarang →</a>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="font-heading font-bold text-xl">Daftar Harga Trawas</h2>
        <div className="mt-4 grid md:grid-cols-4 gap-4">
          {units.map((u:any)=>(
            <div key={u.id} className="bg-white border border-[#E2E8F0] rounded-[12px] p-4">
              <div className="font-bold">{u.id} — {u.tipe}</div>
              <div className="text-sm text-[#64748B]">{u.harga_harian.toLocaleString('id-ID')}/hari • <span className="text-[#F43F5E] font-bold">{u.harga_malam.toLocaleString('id-ID')}/malam</span> • {u.harga_mingguan.toLocaleString('id-ID')}/minggu</div>
              <a href={`/booking?unit=${u.id}`} className="mt-3 block text-center bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-2 rounded-lg text-sm font-semibold cursor-pointer">Pilih {u.id}</a>
            </div>
          ))}
        </div>
        <div className="mt-8 bg-white border border-[#E2E8F0] rounded-[12px] p-6">
          <h3 className="font-bold">FAQ Rental PS Trawas</h3>
          <p className="text-sm text-[#64748B] mt-2"><b>Apakah bisa antar ke Trawas?</b> Bisa, gratis 5km, di atas itu tambah 10k.</p>
          <p className="text-sm text-[#64748B] mt-2"><b>Paket malam jam berapa?</b> 19:00-07:00, hemat 40% vs harian.</p>
          <p className="text-sm text-[#64748B] mt-2"><b>Booking bentrok gimana?</b> Sistem cek real-time, kalau bentrok disaranin unit lain.</p>
          <a href="https://wa.me/6281289538855?text=Halo%20kak%20mau%20rental%20PS%20Trawas%20-%20utm_source=rental-ps-trawas&utm_medium=wa" target="_blank" className="mt-4 inline-block bg-[#25D366] text-white px-6 py-3 rounded-[12px] font-semibold cursor-pointer">Chat WA 0812-8953-8855</a>
        </div>
      </section>
    </main>
  )
}
