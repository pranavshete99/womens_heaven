import { Navigate, Link, useParams, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useContext, useState } from "react";
import Places from "./Places";
import AccountNav from "./AccountNav";

export default function AccountPage() {

    const { user, ready, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile'
    }

    async function logout() {
        const token = localStorage.getItem('token');
        await fetch('http://localhost:7000/api/user/logout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            alert(user.name + " logged out successfully!");
            console.log(user.name + " logged out successfully!");
            localStorage.removeItem('token');
            setUser(null);
            navigate('/');
        }).catch((error) => {
            alert('Problem Occured while logout!');
            console.log('Logout Failed! ', error);
        })

    }

    if (ready && !user) {
        return navigate('/login');
    }

    return (
        <div>
            <AccountNav subpage={subpage} />
            {
                subpage === 'profile' && (
                    <div className="text-center max-w-lg mx-auto">
                        Logged in as {user?.name} ({user?.email})<br />
                        <button className="primary max-w-sm mt-2" onClick={logout}>Logout</button>
                    </div>
                )
            }
            {
                subpage === 'places' && (
                    <Places />
                )
            }
        </div>
    )
}