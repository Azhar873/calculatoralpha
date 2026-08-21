import React, { createContext, useState, useEffect, useContext } from 'react';
import { getMe, login as apiLogin, logout as apiLogout } from '../services/adminApi';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('adminToken');
            if (token) {
                try {
                    const userData = await getMe();
                    setUser(userData);
                } catch (error) {
                    console.error("Auth init failed", error);
                    localStorage.removeItem('adminToken');
                }
            }
            setIsLoading(false);
        };
        initAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await apiLogin(email, password);
            if (response.access_token) {
                localStorage.setItem('adminToken', response.access_token);
                setUser(response.user);
                return { success: true };
            }
            return { success: false, error: 'Invalid response from server' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            await apiLogout();
        } catch (error) {
            console.error("Logout error", error);
        } finally {
            localStorage.removeItem('adminToken');
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
