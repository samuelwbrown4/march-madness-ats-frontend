import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import {useLocation} from 'react-router-dom'



function AdminLogin(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(()=>{
        setUsername('');
        setPassword('');
    },[location.pathname])

    async function loginSubmit(e) {
        e.preventDefault();
        try {
            let res = await fetch(`${API_URL}/api/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            let data = await res.json();
            if (data.token) {
                props.setToken(data.token);
                setUsername('');
                setPassword('');
                localStorage.setItem('adminToken', data.token)
                console.log('navigating')

                navigate('/admin-dashboard')

            } else {
                alert('Login failed. Please try again.')
            }

        } catch (err) {
            console.log(err);
        }


    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#181a1b', minHeight: '100vh' }}>
            <h2 style={{ color: '#b8c1ec', backgroundColor: '#222738', padding: '20px' }}>Admin Login</h2>
            <div className="function-group login">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    fill="currentColor"
                    className="admin-svg"
                    viewBox="0 0 16 16"
                >
                    <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z" />
                </svg>
                <form className="login-form" onSubmit={loginSubmit}>
                    <input className="form-control" type='text' placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input className="form-control" type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="btn btn-primary" type="submit">Log In</button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin;