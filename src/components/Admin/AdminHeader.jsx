import React from 'react';
import { Menu, Maximize, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const AdminHeader = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    return (
        <header className="admin-header">
            <div className="admin-header-left">
                <button className="icon-button"><Menu size={20} /></button>
            </div>
            <div className="admin-header-right">
                <button className="icon-button"><Maximize size={18} /></button>
                <div className="admin-user-profile" onClick={handleLogout} title="Click to logout">
                    <User size={18} />
                    <span>{user?.name || 'Admin Panel'}</span>
                    <div className="avatar-circle">
                        <img src="https://ui-avatars.com/api/?name=Admin" alt="Admin" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
