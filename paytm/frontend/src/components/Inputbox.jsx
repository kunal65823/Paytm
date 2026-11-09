export function InputBox({ label, placeholder, onChange, type = "text", autoComplete }) {
    return (
        <label className="block py-2 text-left text-sm font-medium text-slate-700">
            {label}
            <input onChange={onChange} placeholder={placeholder} type={type} autoComplete={autoComplete} required
                className="mt-1 w-full rounded border border-slate-300 bg-white px-3 py-2 text-base outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" />
        </label>
    );
}