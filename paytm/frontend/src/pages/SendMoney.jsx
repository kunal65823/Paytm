import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../api";
import { Button } from "../components/Button";

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const recipientId = searchParams.get("id");
    const name = searchParams.get("name") || "Recipient";
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const submit = async event => {
        event.preventDefault();
        setError("");
        setSuccess("");
        const amountPaise = Math.round(Number(amount) * 100);
        if (!recipientId || !Number.isSafeInteger(amountPaise) || amountPaise <= 0) {
            setError("Enter a valid amount greater than zero.");
            return;
        }

        setSubmitting(true);
        try {
            await api.post("/account/transfer", { toUserId: recipientId, amountPaise });
            setSuccess("Transfer completed successfully.");
            setAmount("");
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Transfer failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
            <form onSubmit={submit} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <button type="button" onClick={() => navigate("/dashboard")} className="mb-5 text-sm font-medium text-emerald-800 underline">Back to dashboard</button>
                <h1 className="mb-6 text-2xl font-bold text-slate-900">Send money</h1>
                <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-700 text-xl font-semibold text-white">{name[0].toUpperCase()}</div>
                    <h2 className="text-lg font-semibold text-slate-800">{name}</h2>
                </div>
                <label htmlFor="amount" className="block text-sm font-medium text-slate-700">Amount (Rs)</label>
                <input id="amount" value={amount} onChange={event => setAmount(event.target.value)} type="number" min="0.01" step="0.01" inputMode="decimal" required placeholder="0.00" className="my-2 w-full rounded border border-slate-300 px-3 py-2 text-base outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" />
                {error && <p role="alert" className="mb-3 text-sm text-red-700">{error}</p>}
                {success && <p role="status" className="mb-3 text-sm text-emerald-800">{success}</p>}
                <Button type="submit" disabled={submitting || !recipientId} label={submitting ? "Sending..." : "Initiate transfer"} />
            </form>
        </main>
    );
}