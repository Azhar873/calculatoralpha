import { useState } from 'react'
import styles from './MortgageCalculator.module.scss'

const MortgageCalculator = () => {
    const [principal, setPrincipal] = useState('')
    const [rate, setRate] = useState('')
    const [term, setTerm] = useState('')
    const [monthlyPayment, setMonthlyPayment] = useState(null)

    const calculateMortgage = () => {
        const p = parseFloat(principal)
        const r = parseFloat(rate)
        const t = parseFloat(term)

        if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r < 0 || t <= 0) {
            alert('Please enter valid positive numbers.')
            return
        }

        // Monthly interest rate
        const i = (r / 100) / 12
        // Number of payments
        const n = t * 12

        let m
        if (i === 0) {
            m = p / n
        } else {
            m = (p * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)
        }

        setMonthlyPayment(m.toFixed(2))
    }

    return (
        <div className={styles.mortgageCalculatorContainer}>
            <div className={styles.mortgageCalculator}>
                <div className={styles.header}>
                    <h2>Mortgage Calculator</h2>
                    <p>Calculate your monthly mortgage payments</p>
                </div>

                <div className={styles.inputGroup}>
                    <label>Loan Amount ($)</label>
                    <input
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(e.target.value)}
                        placeholder="e.g. 300000"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Annual Interest Rate (%)</label>
                    <input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        placeholder="e.g. 5.5"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Loan Term (Years)</label>
                    <input
                        type="number"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        placeholder="e.g. 30"
                    />
                </div>

                <button className={styles.calculateBtn} onClick={calculateMortgage}>
                    Calculate Payment
                </button>

                {monthlyPayment && (
                    <div className={styles.resultContainer}>
                        <div className={styles.resultLabel}>Monthly Payment</div>
                        <div className={styles.resultValue}>${monthlyPayment}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MortgageCalculator
