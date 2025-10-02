import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../src/context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email: '' })
        });
        const data = await response.json();
        if (response.ok) {
            login({ username }); // Assuming login returns user data
            history.push('/dashboard');
        } else {
            console.error(data.detail);
            alert(data.detail);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
