import { useState } from 'react'
import styles from './InterestRateCalculator.module.scss'

const InterestRateCalculator = () => {
    const [principal, setPrincipal] = useState('')
    const [targetAmount, setTargetAmount] = useState('')
    const [time, setTime] = useState('')
    const [frequency, setFrequency] = useState('12') // Default to monthly
    const [requiredRate, setRequiredRate] = useState(null)
    const [totalInterest, setTotalInterest] = useState(null)

    const calculateRate = () => {
        const p = parseFloat(principal)
        const a = parseFloat(targetAmount)
        const t = parseFloat(time)
        const n = parseFloat(frequency)

        if (isNaN(p) || isNaN(a) || isNaN(t) || isNaN(n) || p <= 0 || a <= 0 || t <= 0) {
            alert('Please enter valid positive numbers.')
            return
        }

        if (a <= p) {
            alert('Target Amount must be greater than Principal Amount.')
            return
        }

        // Formula: R = n * ((A/P)^(1/(n*t)) - 1) * 100
        const rate = n * (Math.pow((a / p), (1 / (n * t))) - 1) * 100
        const interest = a - p

        setRequiredRate(rate.toFixed(2))
        setTotalInterest(interest.toFixed(2))
    }

    return (
        <div className={styles.interestRateCalculatorContainer}>
            <div className={styles.interestRateCalculator}>
                <div className={styles.header}>
                    <h2>Interest Rate Calculator</h2>
                    <p>Calculate the required interest rate to reach your goal</p>
                </div>

                <div className={styles.inputGroup}>
                    <label>Principal Amount ($)</label>
                    <input
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(e.target.value)}
                        placeholder="e.g. 5000"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Target Amount ($)</label>
                    <input
                        type="number"
                        value={targetAmount}
                        onChange={(e) => setTargetAmount(e.target.value)}
                        placeholder="e.g. 10000"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Time Period (Years)</label>
                    <input
                        type="number"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        placeholder="e.g. 5"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Compounding Frequency</label>
                    <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                        <option value="1">Annually (1/yr)</option>
                        <option value="2">Semiannually (2/yr)</option>
                        <option value="4">Quarterly (4/yr)</option>
                        <option value="12">Monthly (12/yr)</option>
                        <option value="365">Daily (365/yr)</option>
                    </select>
                </div>

                <button className={styles.calculateBtn} onClick={calculateRate}>
                    Calculate
                </button>

                {requiredRate && (
                    <div className={styles.resultContainer}>
                        <div className={styles.resultRow}>
                            <div className={styles.resultLabel}>Required Annual Rate</div>
                            <div className={styles.resultValue}>{requiredRate}%</div>
                        </div>
                        <div className={styles.resultRowSecondary}>
                            <span>Principal Amount:</span>
                            <span>${parseFloat(principal).toFixed(2)}</span>
                        </div>
                        <div className={styles.resultRowSecondary}>
                            <span>Target Amount:</span>
                            <span>${parseFloat(targetAmount).toFixed(2)}</span>
                        </div>
                        <div className={styles.resultRowSecondary}>
                            <span>Total Interest Earned:</span>
                            <span>${totalInterest}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default InterestRateCalculator
