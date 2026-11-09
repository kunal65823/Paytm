import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/HeadingComponents";
import { InputBox } from "../components/Inputbox";
import { SubHeading } from "../components/subHeading";
import api from "../api";

export const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const submit = async event => {
        event.preventDefault();
        setError("");
        setSubmitting(true);
        try {
            const response = await api.post("/auth/signin", { email, password });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Sign in failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
            <form onSubmit={submit} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
                <Heading label="Sign in" />
                <SubHeading label="Enter your credentials to access your account." />
                <InputBox onChange={event => setEmail(event.target.value)} placeholder="you@example.com" label="Email" type="email" autoComplete="email" />
                <InputBox onChange={event => setPassword(event.target.value)} placeholder="Your password" label="Password" type="password" autoComplete="current-password" />
                {error && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}
                <div className="mt-4"><Button type="submit" disabled={submitting} label={submitting ? "Signing in..." : "Sign in"} /></div>
                <BottomWarning label="Don't have an account?" buttonText="Sign up" to="/signup" />
            </form>
        </main>
    );
}