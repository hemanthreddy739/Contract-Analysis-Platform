import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../../../src/context/AuthContext';
import './Auth.css'; // Import the new CSS file

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
        <div className="auth-container">
            <div className="card auth-card">
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input-field"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                            required
                        />
                    </div>
                    <button type="submit" className="button button-primary auth-button">Login</button>
                </form>
                <p className="auth-switch-text">Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    );
};

export default Login;
