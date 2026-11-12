import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/HeadingComponents";
import { InputBox } from "../components/Inputbox";
import { SubHeading } from "../components/subHeading";
import api from "../api";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
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
            const response = await api.post("/auth/signup", { firstName, lastName, email, password });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Sign up failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
            <form onSubmit={submit} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
                <Heading label="Create your account" />
                <SubHeading label="Enter your details to get started." />
                <InputBox onChange={event => setFirstName(event.target.value)} placeholder="First name" label="First name" autoComplete="given-name" />
                <InputBox onChange={event => setLastName(event.target.value)} placeholder="Last name" label="Last name" autoComplete="family-name" />
                <InputBox onChange={event => setEmail(event.target.value)} placeholder="you@example.com" label="Email" type="email" autoComplete="email" />
                <InputBox onChange={event => setPassword(event.target.value)} placeholder="At least 6 characters" label="Password" type="password" autoComplete="new-password" />
                {error && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}
                <div className="mt-4"><Button type="submit" disabled={submitting} label={submitting ? "Creating account..." : "Sign up"} /></div>
                <BottomWarning label="Already have an account?" buttonText="Sign in" to="/signin" />
            </form>
        </main>
    );
}