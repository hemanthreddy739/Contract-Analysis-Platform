import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../../src/context/AuthContext';
import './Header.css'; // Import the new CSS file

const Header = () => {
    const { isAuthenticated, logout } = useAuth();
    const history = useHistory();

    const handleLogout = () => {
        logout();
        history.push('/login');
    };

    return (
        <header className="header">
            <Link to="/" className="header-brand">Contract Analyzer</Link>
            <nav className="header-nav">
                <ul>
                    {!isAuthenticated ? (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><button onClick={handleLogout} className="button button-primary">Logout</button></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
