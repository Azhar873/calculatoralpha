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

    if (loading) return <div>Loading dashboard...</div>;

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
