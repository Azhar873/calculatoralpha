import { useState } from 'react'
import styles from './AutoLoanCalculator.module.scss'

const AutoLoanCalculator = () => {
    const [price, setPrice] = useState('')
    const [downPayment, setDownPayment] = useState('')
    const [salesTax, setSalesTax] = useState('')
    const [rate, setRate] = useState('')
    const [term, setTerm] = useState('') // in months
    const [monthlyPayment, setMonthlyPayment] = useState(null)
    const [totalPayment, setTotalPayment] = useState(null)
    const [totalInterest, setTotalInterest] = useState(null)

    const calculateLoan = () => {
        const p = parseFloat(price)
        const dp = parseFloat(downPayment) || 0
        const tax = parseFloat(salesTax) || 0
        const r = parseFloat(rate)
        const t = parseFloat(term)

        if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r < 0 || t <= 0) {
            alert('Please enter valid positive numbers.')
            return
        }

        // Calculate loan amount
        const taxAmount = p * (tax / 100)
        const loanAmount = p + taxAmount - dp

        if (loanAmount <= 0) {
            setMonthlyPayment('0.00')
            setTotalPayment('0.00')
            setTotalInterest('0.00')
            return
        }

        // Monthly interest rate
        const i = (r / 100) / 12
        // Number of payments (term is already in months usually for auto loans, but let's stick to standard input which is months)
        const n = t

        let m
        if (i === 0) {
            m = loanAmount / n
        } else {
            m = (loanAmount * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)
        }

        const total = m * n

        setMonthlyPayment(m.toFixed(2))
        setTotalPayment(total.toFixed(2))
        setTotalInterest((total - loanAmount).toFixed(2))
    }

    return (
        <div className={styles.loanCalculatorContainer}>
            <div className={styles.loanCalculator}>
                <div className={styles.header}>
                    <h2>Auto Loan Calculator</h2>
                    <p>Calculate your monthly auto loan payments</p>
                </div>

                <div className={styles.inputGroup}>
                    <label>Vehicle Price ($)</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="e.g. 25000"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Down Payment ($)</label>
                    <input
                        type="number"
                        value={downPayment}
                        onChange={(e) => setDownPayment(e.target.value)}
                        placeholder="e.g. 5000"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Sales Tax (%)</label>
                    <input
                        type="number"
                        value={salesTax}
                        onChange={(e) => setSalesTax(e.target.value)}
                        placeholder="e.g. 7"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Interest Rate (%)</label>
                    <input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        placeholder="e.g. 4.5"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Loan Term (Months)</label>
                    <input
                        type="number"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        placeholder="e.g. 60"
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

export default AutoLoanCalculator
