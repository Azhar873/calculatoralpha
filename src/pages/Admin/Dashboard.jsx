import React, { useEffect, useState } from 'react';
import { Building2 } from 'lucide-react';
import { getStats } from '../../services/adminApi';

const Dashboard = () => {
    const [stats, setStats] = useState({
        total_calculators: 0,
        index_calculators: 0,
        no_index_calculators: 0,
        total_categories: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to load stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
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

    return (
        <div>
            <h1 className="admin-page-title">Dashboard</h1>
            
            <div className="dashboard-stats">
                <div className="stat-card">
                    <div className="stat-icon"><Building2 size={24} /></div>
                    <div className="stat-info">
                        <h3>Total Calculator</h3>
                        <p>{stats.total_calculators}</p>
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon"><Building2 size={24} /></div>
                    <div className="stat-info">
                        <h3>Index Calculator</h3>
                        <p>{stats.index_calculators}</p>
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon"><Building2 size={24} /></div>
                    <div className="stat-info">
                        <h3>No Index Calculator</h3>
                        <p>{stats.no_index_calculators}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
