/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import api from "../api";
import "../styles/AdminPanel.css";
import { ACCESS_TOKEN } from "../constants"
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Manage from "../components/Manage";


const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const [isSuperuser, setIsSuperuser] = useState(localStorage.getItem('isSuperuser'));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [userFormData, setUserFormData] = useState({ username: "", email: "", password: "" });


    const fetchUsers = async () => {

        const token = localStorage.getItem('access');

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/user/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    search: '',
                    page: 1
                }
            });
            let useres = response.data.filter((user) => user.username.toLowerCase().includes(searchQuery.toLowerCase()))
            setUsers(useres);
        } catch (error) {
            toast.error('Error fetching users:', error.message);
        }
    };

    useEffect(()=>{
        if (isSuperuser === "false") {
            navigate('/')
            setIsSuperuser('false')
        }
    })


    useEffect(() => {
        fetchUsers();
    }, [searchQuery]);


    const handleDelete = async (userId) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        await api.delete(`/api/user/${userId}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(users.filter((user) => user.id !== userId));
        toast.success("User deleted")
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const hadleOpenManage = (user = null) => {
        setEditingUser(user);
        setUserFormData(user || { username: "", email: "" });
        setIsModalOpen(true);
    }


    const hadleCloseManage = () => {
        setIsModalOpen(false);
        setEditingUser(null);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleNewUser = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        try {
            const username = userFormData.username
            const email = userFormData.email
            const password = userFormData.password
            const res = await api.post("api/user/register/", {username, email, password})
            hadleCloseManage()
            fetchUsers(); 
        } catch (error) {
            toast.error("Error saving user:", error.message);
        }
    };

    const handleEdit = async (userId) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        
        try {
            await axios.put(`http://127.0.0.1:8000/api/user/${userId}/update/`, userFormData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("User updated successfully!");
            hadleCloseManage(); 
            fetchUsers(); 
        } catch (error) {
            toast.error("Error updating user: " + (error.response?.data?.detail || error.message));
        }
    };

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            <div className="top-container">
                <button onClick={() => hadleOpenManage()} >Create new user</button>
                <input type="text" placeholder="Search users" value={searchQuery} onChange={handleSearch} />
                <button onClick={() => navigate('/logout')} >Logout</button>
            </div>

            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 && <tr><td colSpan="3">No users found</td></tr>}
                    {users.map((user) => {
                        if (!user.is_staff) {
                            return (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                                        &nbsp;&nbsp;
                                        <button onClick={() => hadleOpenManage(user)}>Edit</button>
                                    </td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </table>
            <Manage className="modal-container model" isOpen={isModalOpen} title={editingUser ? "Edit User" : "Create User"} onClose={hadleCloseManage} onSave={() => editingUser ? handleEdit(editingUser.id) : handleNewUser()} >
                <form>
                    <label>Username</label>
                    <input type="text" name="username" value={userFormData.username} onChange={handleInputChange} required/>
                    <label>Email</label>
                    <input type="email" name="email" value={userFormData.email} onChange={handleInputChange} />
                    {!editingUser && <>
                        <label>Password</label>
                        <input type="password" name="password" value={userFormData.password} onChange={handleInputChange} required/>
                    </>}
                    
                </form>
            </Manage>
        </div>
    );
};

export default AdminPanel;
