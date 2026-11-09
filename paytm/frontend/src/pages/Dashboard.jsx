import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export const Dashboard = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Appbar />
            <main className="mx-auto max-w-4xl px-5 py-4">
                <Balance />
                <Users />
            </main>
        </div>
    );
}