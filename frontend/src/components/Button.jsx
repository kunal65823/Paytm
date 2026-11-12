export function Button({ label, onClick, type = "button", disabled = false }) {
    return (
        <button onClick={onClick} type={type} disabled={disabled}
            className="w-full rounded bg-emerald-700 px-4 py-2 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60">
            {label}
        </button>
    );
}