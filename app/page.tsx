import { createClient } from "@supabase/supabase-js";
export default async function Page() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data: units } = await supabase.from("units").select("*").order("id");
  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold">Rental Sedulur - Mojokerto</h1>
      <p className="opacity-70">
        5 PS4 (130k/hari, 500k/minggu) • 3 PS3 (100k/hari, 350k/minggu) • Paket Malam diskon
      </p>
      <div className="grid md:grid-cols-4 gap-4 mt-6">
        {(units ?? []).map((u: any) => (
          <div key={u.id} className="border rounded p-4">
            <div className="font-bold">{u.code ?? u.id}</div>
            <div className="text-sm opacity-70">{u.type} • {u.status ?? "ready"}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
