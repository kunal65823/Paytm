import { useEffect, useState } from "react"
import { Button } from "./Button"
import { useNavigate } from "react-router-dom";
import api from "../api";


export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        api.get("/user/bulk", { params: { filter } })
            .then(response => {
                setUsers(response.data.users);
                setError("");
            })
            .catch(() => setError("Users could not be loaded. Please sign in again."));
    }, [filter])

    return <>
        <div className="mt-6 text-lg font-bold">
            Users
        </div>
        <div className="my-2">
            <input value={filter} onChange={event => setFilter(event.target.value)} type="search" placeholder="Search by name or email" className="w-full rounded border border-slate-300 px-3 py-2" />
        </div>
        {error && <p role="alert" className="py-3 text-sm text-red-700">{error}</p>}
        <div className="divide-y divide-slate-200">
            {users.map(user => <User key={user._id} user={user} />)}
            {!error && users.length === 0 && <p className="py-4 text-sm text-slate-500">No users found.</p>}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex items-center justify-between gap-4 py-3">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName?.[0]?.toUpperCase() || "U"}
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="w-32 shrink-0">
            <Button onClick={() => {
                navigate(`/send?id=${encodeURIComponent(user._id)}&name=${encodeURIComponent(`${user.firstName} ${user.lastName}`)}`);
            }} label="Send" />
        </div>
    </div>
}