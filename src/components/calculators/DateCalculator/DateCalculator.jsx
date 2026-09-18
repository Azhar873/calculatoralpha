import { useState } from 'react';
import styles from './DateCalculator.module.scss';

const DateCalculator = () => {
    const [mode, setMode] = useState('difference'); // 'difference' or 'addSubtract'
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [operation, setOperation] = useState('add');
    const [amount, setAmount] = useState('');
    const [unit, setUnit] = useState('days');
    const [result, setResult] = useState(null);

    const calculateDifference = () => {
        if (!startDate || !endDate) return;

        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Approximate calculation for years/months/days
        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        let days = end.getDate() - start.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
            days += prevMonth.getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        setResult({
            type: 'difference',
            diffDays,
            years: Math.abs(years),
            months: Math.abs(months),
            days: Math.abs(days)
        });
    };

    const calculateAddSubtract = () => {
        if (!startDate || !amount) return;

        const date = new Date(startDate);
        const value = parseInt(amount);
        const multiplier = operation === 'add' ? 1 : -1;

        if (unit === 'days') {
            date.setDate(date.getDate() + (value * multiplier));
        } else if (unit === 'weeks') {
            date.setDate(date.getDate() + (value * 7 * multiplier));
        } else if (unit === 'months') {
            date.setMonth(date.getMonth() + (value * multiplier));
        } else if (unit === 'years') {
            date.setFullYear(date.getFullYear() + (value * multiplier));
        }

        setResult({
            type: 'date',
            date: date.toDateString()
        });
    };

    const handleCalculate = () => {
        if (mode === 'difference') {
            calculateDifference();
        } else {
            calculateAddSubtract();
        }
    };

    const clear = () => {
        setStartDate('');
        setEndDate('');
        setAmount('');
        setResult(null);
    };

    return (
        <div className={styles.dateCalculatorContainer}>
            <div className={styles.dateCalculator}>
                <div className={styles.header}>
                    <h2>Date Calculator</h2>
                    <p>Calculate difference between dates or add/subtract time from a date</p>
                </div>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${mode === 'difference' ? styles.active : ''}`}
                        onClick={() => { setMode('difference'); setResult(null); }}
                    >
                        Date Difference
                    </button>
                    <button
                        className={`${styles.tab} ${mode === 'addSubtract' ? styles.active : ''}`}
                        onClick={() => { setMode('addSubtract'); setResult(null); }}
                    >
                        Add / Subtract Days
                    </button>
                </div>

                <div className={styles.controls}>
                    <div className={styles.inputGroup}>
                        <label>Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                    {mode === 'difference' ? (
                        <div className={styles.inputGroup}>
                            <label>End Date</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    ) : (
                        <>
                            <div className={styles.inputGroup}>
                                <label>Operation</label>
                                <select value={operation} onChange={(e) => setOperation(e.target.value)}>
                                    <option value="add">Add</option>
                                    <option value="subtract">Subtract</option>
                                </select>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Amount</label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="e.g. 30"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Unit</label>
                                <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                                    <option value="days">Days</option>
                                    <option value="weeks">Weeks</option>
                                    <option value="months">Months</option>
                                    <option value="years">Years</option>
                                </select>
                            </div>
                        </>
                    )}
                </div>

                <div className={styles.buttonGroup}>
                    <button className={styles.clearButton} onClick={clear}>Clear</button>
                    <button className={styles.calculateButton} onClick={handleCalculate}>Calculate</button>
                </div>

                {result && (
                    <div className={styles.result}>
                        {result.type === 'difference' ? (
                            <>
                                <h3>Time Difference</h3>
                                <div className={styles.resultDisplay}>
                                    <div className={styles.mainResult}>{result.diffDays} Days</div>
                                    <div className={styles.subResult}>
                                        or {result.years} years, {result.months} months, {result.days} days
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3>Result Date</h3>
                                <div className={styles.resultDisplay}>
                                    <div className={styles.mainResult}>{result.date}</div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DateCalculator;
