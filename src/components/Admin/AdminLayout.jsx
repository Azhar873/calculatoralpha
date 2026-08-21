import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';

const AdminLayout = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div className="admin-loading">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    return (
        <div className="admin-layout">
            <Sidebar />
            <div className="admin-main-wrapper">
                <AdminHeader />
                <main className="admin-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
