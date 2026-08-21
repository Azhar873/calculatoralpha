import { useState } from 'react'
import styles from './CompoundInterestCalculator.module.scss'

const CompoundInterestCalculator = () => {
    const [principal, setPrincipal] = useState('')
    const [rate, setRate] = useState('')
    const [years, setYears] = useState('')
    const [frequency, setFrequency] = useState('12') // Default to monthly

    const [amount, setAmount] = useState(null)
    const [totalInterest, setTotalInterest] = useState(null)

    const calculateCompoundInterest = () => {
        const p = parseFloat(principal)
        const r = parseFloat(rate)
        const t = parseFloat(years)
        const n = parseFloat(frequency)

        if (
            isNaN(p) || isNaN(r) || isNaN(t) || isNaN(n) ||
            p < 0 || r < 0 || t <= 0
        ) {
            alert('Please enter valid positive numbers.')
            return
        }

        // Formula: A = P(1 + r/n)^(nt)
        // Rate needs to be divided by 100 first
        const rateDecimal = r / 100
        const A = p * Math.pow((1 + (rateDecimal / n)), (n * t))
        const interest = A - p

        setAmount(A.toFixed(2))
        setTotalInterest(interest.toFixed(2))
    }

    return (
        <div className={styles.compoundInterestCalculatorContainer}>
            <div className={styles.compoundInterestCalculator}>
                <div className={styles.header}>
                    <h2>Compound Interest Calculator</h2>
                    <p>Calculate compound interest over time</p>
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
                    <label>Annual Interest Rate (%)</label>
                    <input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        placeholder="e.g. 5"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Investment Period (Years)</label>
                    <input
                        type="number"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                        placeholder="e.g. 10"
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

                <button className={styles.calculateBtn} onClick={calculateCompoundInterest}>
                    Calculate
                </button>

                {amount && (
                    <div className={styles.resultContainer}>
                        <div className={styles.resultRow}>
                            <div className={styles.resultLabel}>Future Value</div>
                            <div className={styles.resultValue}>${amount}</div>
                        </div>
                        <div className={styles.resultRowSecondary}>
                            <span>Principal Amount:</span>
                            <span>${parseFloat(principal).toFixed(2)}</span>
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

export default CompoundInterestCalculator
