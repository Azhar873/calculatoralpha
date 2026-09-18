import { useState } from 'react';
import styles from './TimeCalculator.module.scss';

const TimeCalculator = () => {
    const [mode, setMode] = useState('addSubtract'); // 'duration' or 'addSubtract'

    // Duration Mode State
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    // Add/Subtract Mode State
    const [baseTime, setBaseTime] = useState('');
    const [operation, setOperation] = useState('add');
    const [addHours, setAddHours] = useState('');
    const [addMinutes, setAddMinutes] = useState('');
    const [addSeconds, setAddSeconds] = useState('');

    const [result, setResult] = useState(null);

    const calculateDuration = () => {
        if (!startTime || !endTime) return;

        // Create standard dates for comparison (using today as base)
        const today = new Date().toISOString().split('T')[0];
        const start = new Date(`${today}T${startTime}`);
        const end = new Date(`${today}T${endTime}`);

        // Handle overnight case (if end time is before start time, assume next day)
        if (end < start) {
            end.setDate(end.getDate() + 1);
        }

        const diffMs = end - start;
        const diffHrs = Math.floor(diffMs / 3600000);
        const diffMins = Math.floor((diffMs % 3600000) / 60000);
        const diffSecs = Math.floor((diffMs % 60000) / 1000);

        setResult({
            type: 'duration',
            hours: diffHrs,
            minutes: diffMins,
            seconds: diffSecs,
            totalMinutes: Math.floor(diffMs / 60000),
            totalSeconds: Math.floor(diffMs / 1000)
        });
    };

    const calculateAddSubtract = () => {
        if (!baseTime) return;

        const today = new Date().toISOString().split('T')[0];
        const date = new Date(`${today}T${baseTime}`);

        const hrs = parseInt(addHours || 0);
        const mins = parseInt(addMinutes || 0);
        const secs = parseInt(addSeconds || 0);

        const totalSecondsToAdd = (hrs * 3600) + (mins * 60) + secs;
        const multiplier = operation === 'add' ? 1 : -1;

        date.setSeconds(date.getSeconds() + (totalSecondsToAdd * multiplier));

        const resultTimeString = date.toLocaleTimeString('en-US', { hour12: true });

        setResult({
            type: 'resultTime',
            time: resultTimeString,
            rawDate: date
        });
    };

    const handleCalculate = () => {
        if (mode === 'duration') {
            calculateDuration();
        } else {
            calculateAddSubtract();
        }
    };

    const clear = () => {
        setStartTime('');
        setEndTime('');
        setBaseTime('');
        setAddHours('');
        setAddMinutes('');
        setAddSeconds('');
        setResult(null);
    };

    return (
        <div className={styles.timeCalculatorContainer}>
            <div className={styles.timeCalculator}>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${mode === 'addSubtract' ? styles.active : ''}`}
                        onClick={() => { setMode('addSubtract'); setResult(null); }}
                    >
                        Add / Subtract Time
                    </button>
                    <button
                        className={`${styles.tab} ${mode === 'duration' ? styles.active : ''}`}
                        onClick={() => { setMode('duration'); setResult(null); }}
                    >
                        Time Duration
                    </button>
                </div>

                <div className={styles.controls}>
                    {mode === 'duration' ? (
                        <>
                            <div className={styles.inputGroup}>
                                <label>Start Time</label>
                                <input
                                    type="time"
                                    step="1"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>End Time</label>
                                <input
                                    type="time"
                                    step="1"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={styles.inputGroup}>
                                <label>Start Time</label>
                                <input
                                    type="time"
                                    step="1"
                                    value={baseTime}
                                    onChange={(e) => setBaseTime(e.target.value)}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Operation</label>
                                <select value={operation} onChange={(e) => setOperation(e.target.value)}>
                                    <option value="add">Add (+)</option>
                                    <option value="subtract">Subtract (-)</option>
                                </select>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Time to {operation === 'add' ? 'Add' : 'Subtract'}</label>
                                <div className={styles.timeInput}>
                                    <input
                                        type="number"
                                        placeholder="Hrs"
                                        value={addHours}
                                        onChange={(e) => setAddHours(e.target.value)}
                                        min="0"
                                    />
                                    <span>:</span>
                                    <input
                                        type="number"
                                        placeholder="Mins"
                                        value={addMinutes}
                                        onChange={(e) => setAddMinutes(e.target.value)}
                                        min="0"
                                    />
                                    <span>:</span>
                                    <input
                                        type="number"
                                        placeholder="Secs"
                                        value={addSeconds}
                                        onChange={(e) => setAddSeconds(e.target.value)}
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
                        {result.type === 'duration' ? (
                            <>
                                <h3>Duration</h3>
                                <div className={styles.resultDisplay}>
                                    <div className={styles.mainResult}>
                                        {result.hours}h {result.minutes}m {result.seconds}s
                                    </div>
                                    <div className={styles.subResult}>
                                        Total: {result.totalMinutes} minutes or {result.totalSeconds} seconds
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3>Result Time</h3>
                                <div className={styles.resultDisplay}>
                                    <div className={styles.mainResult}>{result.time}</div>
                                    <div className={styles.subResult}>
                                        {result.rawDate.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TimeCalculator;
