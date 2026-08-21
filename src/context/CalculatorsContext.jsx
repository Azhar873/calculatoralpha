import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCategoriesWithCalculators } from '../services/api';

const CalculatorsContext = createContext();

export function CalculatorsProvider({ children }) {
    const [calculatorsData, setCalculatorsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCalculators() {
            try {
                setIsLoading(true);
                const data = await getCategoriesWithCalculators();
                // If API returns an error or empty
                if (data.error) {
                    throw new Error(data.error);
                }
                setCalculatorsData(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch calculators data:", err);
                setError(err.message || 'Failed to load calculators');
            } finally {
                setIsLoading(false);
            }
        }

        fetchCalculators();
    }, []);

    return (
        <CalculatorsContext.Provider value={{ calculatorsData, isLoading, error }}>
            {children}
        </CalculatorsContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCalculators() {
    return useContext(CalculatorsContext);
}
