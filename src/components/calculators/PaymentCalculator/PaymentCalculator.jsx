import { useState } from 'react'
import styles from './PaymentCalculator.module.scss'

const PaymentCalculator = () => {
    const [loanAmount, setLoanAmount] = useState('')
    const [interestRate, setInterestRate] = useState('')
    const [loanTerm, setLoanTerm] = useState('')
    const [monthlyPayment, setMonthlyPayment] = useState(null)
    const [totalInterest, setTotalInterest] = useState(null)
    const [totalPayment, setTotalPayment] = useState(null)

    const calculatePayment = () => {
        const p = parseFloat(loanAmount)
        const r = parseFloat(interestRate) / 100 / 12
        const n = parseFloat(loanTerm) * 12

        if (isNaN(p) || isNaN(r) || isNaN(n) || p <= 0 || r < 0 || n <= 0) {
            alert('Please enter valid positive numbers.')
            return
        }

        // Monthly Payment Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
        const payment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
        const total = payment * n
        const interest = total - p

        setMonthlyPayment(payment.toFixed(2))
        setTotalPayment(total.toFixed(2))
        setTotalInterest(interest.toFixed(2))
    }

    return (
        <div className={styles.paymentCalculatorContainer}>
            <div className={styles.paymentCalculator}>
                <div className={styles.header}>
                    <h2>Payment Calculator</h2>
                    <p>Calculate your monthly loan payments</p>
                </div>

                <div className={styles.inputGroup}>
                    <label>Loan Amount ($)</label>
                    <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        placeholder="e.g. 20000"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Annual Interest Rate (%)</label>
                    <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        placeholder="e.g. 5.5"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Loan Term (Years)</label>
                    <input
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                        placeholder="e.g. 5"
                    />
                </div>

                <button className={styles.calculateBtn} onClick={calculatePayment}>
                    Calculate
                </button>

                {monthlyPayment && (
                    <div className={styles.resultContainer}>
                        <div className={styles.resultRow}>
                            <div className={styles.resultLabel}>Monthly Payment</div>
                            <div className={styles.resultValue}>${monthlyPayment}</div>
                        </div>
                        <div className={styles.resultRowSecondary}>
                            <span>Total Interest:</span>
                            <span>${totalInterest}</span>
                        </div>
                        <div className={styles.resultRowSecondary}>
                            <span>Total Payment:</span>
                            <span>${totalPayment}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PaymentCalculator
