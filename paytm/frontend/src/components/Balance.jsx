import { useEffect, useState } from "react";
import api from "../api";

export const Balance = () => {
    const [balancePaise, setBalancePaise] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get("/account/balance")
            .then(response => setBalancePaise(response.data.balancePaise))
            .catch(() => setError("Balance could not be loaded."));
    }, []);

    return (
        <section className="border-b border-slate-200 py-6">
            <h1 className="text-2xl font-bold text-slate-900">Your balance</h1>
            {error ? <p role="alert" className="mt-2 text-sm text-red-700">{error}</p> : (
                <p className="mt-2 text-3xl font-semibold text-emerald-800">
                    {balancePaise === null ? "Loading..." : `Rs ${(balancePaise / 100).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`}
                </p>
            )}
        </section>
    );
}