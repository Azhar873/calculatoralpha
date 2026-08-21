import { useState } from 'react'
import styles from './InterestCalculator.module.scss'

const InterestCalculator = () => {
    const [principal, setPrincipal] = useState('')
    const [rate, setRate] = useState('')
    const [time, setTime] = useState('')
    const [totalInterest, setTotalInterest] = useState(null)
    const [totalAmount, setTotalAmount] = useState(null)

    const calculateInterest = () => {
        const p = parseFloat(principal)
        const r = parseFloat(rate)
        const t = parseFloat(time)

        if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r < 0 || t <= 0) {
            alert('Please enter valid positive numbers.')
            return
        }

        // Simple Interest Formula: I = P * r * t
        // Total Amount: A = P + I
        const interest = (p * r * t) / 100
        const amount = p + interest

        setTotalInterest(interest.toFixed(2))
        setTotalAmount(amount.toFixed(2))
    }

    return (
        <div className={styles.interestCalculatorContainer}>
            <div className={styles.interestCalculator}>
                <div className={styles.header}>
                    <h2>Interest Calculator</h2>
                    <p>Calculate your simple interest</p>
                </div>

                <div className={styles.inputGroup}>
                    <label>Principal Amount ($)</label>
                    <input
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(e.target.value)}
                        placeholder="e.g. 10000"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Annual Interest Rate (%)</label>
                    <input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        placeholder="e.g. 5"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Time Period (Years)</label>
                    <input
                        type="number"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        placeholder="e.g. 2"
                    />
                </div>

                <button className={styles.calculateBtn} onClick={calculateInterest}>
                    Calculate
                </button>

                {totalInterest && (
                    <div className={styles.resultContainer}>
                        <div className={styles.resultRow}>
                            <div className={styles.resultLabel}>Total Interest</div>
                            <div className={styles.resultValue}>${totalInterest}</div>
                        </div>
                        <div className={styles.resultRowSecondary}>
                            <span>Total Amount:</span>
                            <span>${totalAmount}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default InterestCalculator
