import { FormEvent } from "react";

type Props = { value: string; setValue: (v: string) => void; onSubmit: () => void; loading?: boolean; };

export default function SearchBar({ value, setValue, onSubmit, loading }: Props) {
  const handle = (e: FormEvent) => { e.preventDefault(); onSubmit(); };
  return (
    <form onSubmit={handle} aria-label="Search GitHub users">
      <label className="text-sm text-slate-600 mb-2 block" htmlFor="username">Enter username</label>
      <input
        id="username"
        className="w-full px-3 py-2 border border-slate-200 rounded-md focus:border-slate-300 focus:ring-2 focus:ring-sky-300 outline-none"
        placeholder="Enter username"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
      />
      <button
        className="w-full mt-4 py-2 rounded-md bg-sky-500 text-white font-semibold disabled:opacity-60"
        disabled={loading || !value.trim()}
      >
        {loading ? "Searching…" : "Search"}
      </button>
    </form>
  );
}