import { useState } from 'react'
import styles from './LoanCalculator.module.scss'

const LoanCalculator = () => {
    const [amount, setAmount] = useState('')
    const [rate, setRate] = useState('')
    const [term, setTerm] = useState('')
    const [monthlyPayment, setMonthlyPayment] = useState(null)
    const [totalPayment, setTotalPayment] = useState(null)
    const [totalInterest, setTotalInterest] = useState(null)

    const calculateLoan = () => {
        const p = parseFloat(amount)
        const r = parseFloat(rate)
        const t = parseFloat(term)

        if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r < 0 || t <= 0) {
            alert('Please enter valid positive numbers.')
            return
        }

        // Monthly interest rate
        const i = (r / 100) / 12
        // Number of payments (term is in years)
        const n = t * 12

        let m
        if (i === 0) {
            m = p / n
        } else {
            m = (p * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)
        }

        setMonthlyPayment(m.toFixed(2))
        setTotalPayment((m * n).toFixed(2))
        setTotalInterest(((m * n) - p).toFixed(2))
    }

    return (
        <div className={styles.loanCalculatorContainer}>
            <div className={styles.loanCalculator}>
                <div className={styles.header}>
                    <h2>Loan Calculator</h2>
                    <p>Calculate your monthly loan payments</p>
                </div>

                <div className={styles.inputGroup}>
                    <label>Loan Amount ($)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="e.g. 10000"
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
                        placeholder="e.g. 5"
                    />
                </div>

                <button className={styles.calculateBtn} onClick={calculateLoan}>
                    Calculate
                </button>

                {monthlyPayment && (
                    <div className={styles.resultContainer}>
                        <div className={styles.resultRow}>
                            <div className={styles.resultLabel}>Monthly Payment</div>
                            <div className={styles.resultValue}>${monthlyPayment}</div>
                        </div>
                        <div className={styles.resultRowSecondary}>
                            <span>Total Payment:</span>
                            <span>${totalPayment}</span>
                        </div>
                        <div className={styles.resultRowSecondary}>
                            <span>Total Interest:</span>
                            <span>${totalInterest}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LoanCalculator
