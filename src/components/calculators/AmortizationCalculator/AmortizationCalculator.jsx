import { useState } from 'react'
import styles from './AmortizationCalculator.module.scss'

const AmortizationCalculator = () => {
    const [principal, setPrincipal] = useState('')
    const [rate, setRate] = useState('')
    const [term, setTerm] = useState('')
    const [schedule, setSchedule] = useState([])
    const [monthlyPayment, setMonthlyPayment] = useState(null)
    const [totalInterest, setTotalInterest] = useState(null)

    const calculateAmortization = () => {
        const p = parseFloat(principal)
        const r = parseFloat(rate)
        const t = parseFloat(term)

        if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r < 0 || t <= 0) {
            alert('Please enter valid positive numbers.')
            return
        }

        const monthlyRate = r / 100 / 12
        const numberOfPayments = t * 12

        let m
        if (monthlyRate === 0) {
            m = p / numberOfPayments
        } else {
            m = (p * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
        }

        setMonthlyPayment(m.toFixed(2))

        let balance = p
        let totalInt = 0
        const newSchedule = []

        for (let i = 1; i <= numberOfPayments; i++) {
            const interestPayment = balance * monthlyRate
            const principalPayment = m - interestPayment
            balance -= principalPayment
            totalInt += interestPayment

            if (balance < 0) balance = 0 // Handle float precision issues at end

            newSchedule.push({
                month: i,
                payment: m.toFixed(2),
                principal: principalPayment.toFixed(2),
                interest: interestPayment.toFixed(2),
                balance: balance.toFixed(2)
            })
        }

        setSchedule(newSchedule)
        setTotalInterest(totalInt.toFixed(2))
    }

    return (
        <div className={styles.amortizationCalculatorContainer}>
            <div className={styles.amortizationCalculator}>
                <div className={styles.header}>
                    <h2>Amortization Calculator</h2>
                    <p>Calculate your amortization schedule</p>
                </div>

                <div className={styles.inputGroup}>
                    <label>Loan Amount ($)</label>
                    <input
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(e.target.value)}
                        placeholder="e.g. 20000"
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
                    <label>Loan Term (Years)</label>
                    <input
                        type="number"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        placeholder="e.g. 5"
                    />
                </div>

                <button className={styles.calculateBtn} onClick={calculateAmortization}>
                    Calculate Schedule
                </button>

                {monthlyPayment && (
                    <>
                        <div className={styles.resultContainer}>
                            <div className={styles.resultLabel}>Monthly Payment</div>
                            <div className={styles.resultValue}>${monthlyPayment}</div>
                            <div className={styles.resultLabel} style={{ marginTop: '16px' }}>Total Interest</div>
                            <div className={styles.resultValue} style={{ fontSize: '24px', color: '#f59e0b' }}>${totalInterest}</div>
                        </div>

                        <div className={styles.tableContainer}>
                            <table className={styles.scheduleTable}>
                                <thead>
                                    <tr>
                                        <th>Month</th>
                                        <th>Payment</th>
                                        <th>Principal</th>
                                        <th>Interest</th>
                                        <th>Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {schedule.map((row) => (
                                        <tr key={row.month}>
                                            <td>{row.month}</td>
                                            <td>${row.payment}</td>
                                            <td>${row.principal}</td>
                                            <td>${row.interest}</td>
                                            <td>${row.balance}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default AmortizationCalculator
