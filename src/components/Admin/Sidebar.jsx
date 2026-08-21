import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calculator, FolderTree, FileText, Languages, Settings, Mail } from 'lucide-react';
import './Admin.css';

const Sidebar = () => {
    return (
        <aside className="admin-sidebar">
            <div className="admin-sidebar-nav">
                <NavLink to="/admin/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to="/admin/calculators" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <Calculator size={20} />
                    <span>Calculators</span>
                </NavLink>
                <NavLink to="/admin/categories" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <FolderTree size={20} />
                    <span>Categories</span>
                </NavLink>
                <NavLink to="/admin/pages" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <FileText size={20} />
                    <span>Pages</span>
                </NavLink>
                <NavLink to="/admin/contacts" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <Mail size={20} />
                    <span>Messages</span>
                </NavLink>
                <NavLink to="/admin/settings" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <Settings size={20} />
                    <span>Setting</span>
                </NavLink>
            </div>
        </aside>
    );
};

export default Sidebar;
