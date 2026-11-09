import { Link } from "react-router-dom";

export function BottomWarning({ label, buttonText, to }) {
  return (
    <div className="flex justify-center gap-1 py-3 text-sm text-slate-600">
      <span>{label}</span>
      <Link className="font-semibold text-emerald-800 underline" to={to}>{buttonText}</Link>
    </div>
  );
}