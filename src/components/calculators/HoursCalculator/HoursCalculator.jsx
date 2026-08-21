import { useState } from 'react';
import styles from './HoursCalculator.module.scss';

const HoursCalculator = () => {
    const [mode, setMode] = useState('hoursBetween'); // 'hoursBetween' or 'addHours'

    // Hours Between Mode State
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [breakDuration, setBreakDuration] = useState(''); // in minutes

    // Add Hours Mode State
    const [time1Hours, setTime1Hours] = useState('');
    const [time1Minutes, setTime1Minutes] = useState('');
    const [time2Hours, setTime2Hours] = useState('');
    const [time2Minutes, setTime2Minutes] = useState('');
    const [operation, setOperation] = useState('add');

    const [result, setResult] = useState(null);

    const calculateHoursBetween = () => {
        if (!startTime || !endTime) return;

        // Create standard dates for comparison (using today as base)
        const today = new Date().toISOString().split('T')[0];
        const start = new Date(`${today}T${startTime}`);
        const end = new Date(`${today}T${endTime}`);

        // Handle overnight case (if end time is before start time, assume next day)
        if (end < start) {
            end.setDate(end.getDate() + 1);
        }

        let diffMs = end - start;

        // Deduct break if any
        if (breakDuration) {
            diffMs -= parseInt(breakDuration) * 60000;
        }

        if (diffMs < 0) diffMs = 0;

        const diffHrs = Math.floor(diffMs / 3600000);
        const diffMins = Math.floor((diffMs % 3600000) / 60000);
        const decimalHours = (diffMs / 3600000).toFixed(2);

        setResult({
            type: 'hoursBetween',
            hours: diffHrs,
            minutes: diffMins,
            decimal: decimalHours,
            totalMinutes: Math.floor(diffMs / 60000)
        });
    };

    const calculateAddHours = () => {
        const h1 = parseInt(time1Hours || 0);
        const m1 = parseInt(time1Minutes || 0);
        const h2 = parseInt(time2Hours || 0);
        const m2 = parseInt(time2Minutes || 0);

        const totalMinutes1 = h1 * 60 + m1;
        const totalMinutes2 = h2 * 60 + m2;

        let finalMinutes;
        if (operation === 'add') {
            finalMinutes = totalMinutes1 + totalMinutes2;
        } else {
            finalMinutes = totalMinutes1 - totalMinutes2;
        }

        const isNegative = finalMinutes < 0;
        finalMinutes = Math.abs(finalMinutes);

        const hours = Math.floor(finalMinutes / 60);
        const minutes = finalMinutes % 60;
        const decimal = (finalMinutes / 60).toFixed(2);

        setResult({
            type: 'addHours',
            hours: hours,
            minutes: minutes,
            decimal: decimal,
            isNegative: isNegative
        });
    };

    const handleCalculate = () => {
        if (mode === 'hoursBetween') {
            calculateHoursBetween();
        } else {
            calculateAddHours();
        }
    };

    const clear = () => {
        setStartTime('');
        setEndTime('');
        setBreakDuration('');
        setTime1Hours('');
        setTime1Minutes('');
        setTime2Hours('');
        setTime2Minutes('');
        setResult(null);
    };

    return (
        <div className={styles.hoursCalculator}>
            <div className={styles.header}>
                <h2>Hours Calculator</h2>
                <p>Calculate total work hours or add/subtract time durations</p>
            </div>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${mode === 'hoursBetween' ? styles.active : ''}`}
                    onClick={() => { setMode('hoursBetween'); setResult(null); }}
                >
                    Work Hours
                </button>
                <button
                    className={`${styles.tab} ${mode === 'addHours' ? styles.active : ''}`}
                    onClick={() => { setMode('addHours'); setResult(null); }}
                >
                    Add/Subtract Time
                </button>
            </div>

            <div className={styles.controls}>
                {mode === 'hoursBetween' ? (
                    <>
                        <div className={styles.inputGroup}>
                            <label>Start Time</label>
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>End Time</label>
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Break Duration (minutes)</label>
                            <input
                                type="number"
                                placeholder="e.g., 30"
                                value={breakDuration}
                                onChange={(e) => setBreakDuration(e.target.value)}
                                min="0"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.inputGroup}>
                            <label>Time 1</label>
                            <div className={styles.timeInput}>
                                <input
                                    type="number"
                                    placeholder="Hrs"
                                    value={time1Hours}
                                    onChange={(e) => setTime1Hours(e.target.value)}
                                    min="0"
                                />
                                <span>:</span>
                                <input
                                    type="number"
                                    placeholder="Mins"
                                    value={time1Minutes}
                                    onChange={(e) => setTime1Minutes(e.target.value)}
                                    min="0"
                                />
                            </div>
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Operation</label>
                            <select value={operation} onChange={(e) => setOperation(e.target.value)}>
                                <option value="add">Add (+)</option>
                                <option value="subtract">Subtract (-)</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Time 2</label>
                            <div className={styles.timeInput}>
                                <input
                                    type="number"
                                    placeholder="Hrs"
                                    value={time2Hours}
                                    onChange={(e) => setTime2Hours(e.target.value)}
                                    min="0"
                                />
                                <span>:</span>
                                <input
                                    type="number"
                                    placeholder="Mins"
                                    value={time2Minutes}
                                    onChange={(e) => setTime2Minutes(e.target.value)}
                                    min="0"
                                />
                            </div>
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
                    {result.type === 'hoursBetween' ? (
                        <>
                            <h3>Total Work Hours</h3>
                            <div className={styles.resultDisplay}>
                                <div className={styles.mainResult}>
                                    {result.hours}h {result.minutes}m
                                </div>
                                <div className={styles.subResult}>
                                    Decimal: {result.decimal} hours
                                </div>
                                <div className={styles.subResult}>
                                    Total Minutes: {result.totalMinutes}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <h3>Result</h3>
                            <div className={styles.resultDisplay}>
                                <div className={styles.mainResult}>
                                    {result.isNegative ? '-' : ''}{result.hours}h {result.minutes}m
                                </div>
                                <div className={styles.subResult}>
                                    Decimal: {result.isNegative ? '-' : ''}{result.decimal} hours
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default HoursCalculator;
