import { useState } from "react";
import ProductEditor from "./components/ProductEditor";
import ProductTable from "./components/ProductTable";

const starter = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 3499, stock: 18 },
  { id: 2, name: "Everyday Tote Bag", category: "Accessories", price: 899, stock: 32 },
  { id: 3, name: "Desk Organizer Set", category: "Home & Living", price: 649, stock: 4 },
  { id: 4, name: "Mechanical Keyboard", category: "Electronics", price: 4299, stock: 11 },
];
const money = (v) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(v);
export default function App() {
  const [products, setProducts] = useState(starter);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  function save(updated) { setProducts((old)=>old.map((p)=>p.id===updated.id?updated:p)); setSelected(null); setNotice(`${updated.name} was updated successfully.`); }
  return <main className="min-h-screen bg-[#f5f7fb] p-5 sm:p-9"><div className="mx-auto max-w-7xl"><header className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-widest text-indigo-600">CATALOG / INVENTORY</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">Product editor</h1><p className="mt-2 text-slate-500">Keep your catalog accurate and up to date.</p></div><div className="rounded-2xl bg-white px-5 py-4 shadow-sm"><p className="text-sm text-slate-500">Catalog value</p><p className="text-2xl font-black">{money(products.reduce((s,p)=>s+p.price*p.stock,0))}</p></div></header>
  {notice && <div className="mb-5 flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"><span>✓ {notice}</span><button onClick={()=>setNotice("")} aria-label="Dismiss notification">×</button></div>}
  <div className="grid items-start gap-6 xl:grid-cols-[0.8fr_1.2fr]"><ProductEditor key={selected?.id ?? "none"} product={selected} onSave={save} onCancel={()=>setSelected(null)}/><section><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-xl font-bold">Products <span className="text-slate-400">({products.length})</span></h2><p className="mt-1 text-sm text-slate-500">Select any product to edit its information.</p></div><input className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-indigo-500" placeholder="Search products..." value={search} onChange={(e)=>setSearch(e.target.value)}/></div><ProductTable products={products} selectedId={selected?.id} onEdit={setSelected} search={search}/></section></div></div></main>;
}
