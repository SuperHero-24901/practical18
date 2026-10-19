import { useState } from "react";

const emptyForm = { name: "", category: "Electronics", price: "", stock: "" };

export default function ProductEditor({ product, onSave, onCancel }) {
  const [form, setForm] = useState(() =>
    product
      ? { name: product.name, category: product.category, price: String(product.price), stock: String(product.stock) }
      : { ...emptyForm }
  );
  const change = (e) => setForm((old) => ({ ...old, [e.target.name]: e.target.value }));

  function submit(e) {
    e.preventDefault();
    onSave({ ...product, ...form, price: Number(form.price), stock: Number(form.stock) });
  }

  const field = "mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

  return (
    <form onSubmit={submit} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-xs font-bold tracking-widest text-indigo-600">{product ? "EDIT MODE" : "PRODUCT EDITOR"}</p>
          <h2 className="mt-1 text-xl font-bold">{product ? "Update product details" : "Select a product"}</h2>
        </div>
        {product && <button type="button" onClick={onCancel} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100">Cancel</button>}
      </div>
      {!product ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">Choose Edit on a product in the list to start making changes.</div>
      ) : (
        <div className="space-y-4">
          <label className="block text-sm font-semibold">Product name<input className={field} name="name" value={form.name} onChange={change} required /></label>
          <label className="block text-sm font-semibold">Category<select className={field} name="category" value={form.category} onChange={change}><option>Electronics</option><option>Accessories</option><option>Home & Living</option><option>Clothing</option><option>Stationery</option></select></label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold">Price (₹)<input className={field} name="price" type="number" min="0.01" step="0.01" value={form.price} onChange={change} required /></label>
            <label className="block text-sm font-semibold">Stock<input className={field} name="stock" type="number" min="0" value={form.stock} onChange={change} required /></label>
          </div>
          <button className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">Save changes</button>
        </div>
      )}
    </form>
  );
}
