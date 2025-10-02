import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../../src/context/AuthContext';

const Header = () => {
    const { isAuthenticated, logout } = useAuth();
    const history = useHistory();

    const handleLogout = () => {
        logout();
        history.push('/login');
    };

    return (
        <nav>
            <Link to="/">Home</Link>
            {!isAuthenticated ? (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            ) : (
                <>
                    <Link to="/dashboard">Dashboard</Link>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </nav>
    );
};

export default Header;
