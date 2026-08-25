import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';

const AdminLayout = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div
                style={{
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "60vh",
                }}
            >
                <style>{`
                .page-view-loader {
                    width: 50px;
                    aspect-ratio: 1;
                    display: grid;
                    border: 4px solid #1e1b4b;
                    border-radius: 50%;
                    border-color: #fff #1e1b4b;
                    animation: l16 1s infinite linear;
                }
                .page-view-loader::before,
                .page-view-loader::after {
                    content: "";
                    grid-area: 1/1;
                    margin: 2px;
                    border: inherit;
                    border-radius: 50%;
                }
                .page-view-loader::before {
                    border-color: #5844E7 #1e1b4b;
                    animation: inherit;
                    animation-duration: 0.5s;
                    animation-direction: reverse;
                }
                .page-view-loader::after {
                    margin: 8px;
                }
                @keyframes l16 {
                    100% {
                    transform: rotate(1turn);
                    }
                }
                `}</style>
                <div className="page-view-loader" aria-label="Loading" />
                <p style={{ marginTop: "1rem", color: "#1e1b4b" }}>Loading page...</p>
            </div>
        );
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
