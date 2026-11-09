import { Link, useNavigate } from "react-router-dom";

export const Appbar = () => {
    const navigate = useNavigate();
    const signOut = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    return (
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 shadow-sm">
            <Link className="text-xl font-bold tracking-tight text-emerald-900" to="/dashboard">PayTM</Link>
            <div className="flex items-center gap-4">
                <span className="text-sm text-slate-600">Your wallet</span>
                <button onClick={signOut} className="rounded border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Sign out</button>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-900" aria-label="User">U</div>
                </div>
        </header>
    );
}