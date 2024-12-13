/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import LoadingIndicator from "../components/Loadingindicator"
import '../styles/Form.css'
import { toast } from 'react-toastify';


function Form({ route, method }) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const name = method === "login" ? "Login" : "Register"

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, {username, email, password})
            if (method === "login" ){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

                const superuserRes = await api.get("/api/is-superuser/", {
                    headers: { Authorization: `Bearer ${res.data.access}` },
                });

                if (superuserRes.data.is_superuser) {
                    localStorage.setItem('isSuperuser',true)
                    navigate("/admin-panel"); 
                } else {
                    localStorage.setItem('isSuperuser',false)
                    navigate("/"); 
                }

            } else {
                navigate("/login")
            }

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
        
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input className="form-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            {method !== "login" && <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />}
            <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                {name}
            </button>
            <span>{method === "login" ? "Are you new ?" : "Already have an account ?"} {method === "login" ? <a onClick={()=>navigate('/register')}>Register</a> : <a onClick={()=>navigate('/login')}>Login</a>}</span>
        </form>
    )
}

export default Form