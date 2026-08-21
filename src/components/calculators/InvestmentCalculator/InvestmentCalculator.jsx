import { useState } from 'react'
import styles from './InvestmentCalculator.module.scss'

const InvestmentCalculator = () => {
    const [initialAmount, setInitialAmount] = useState('')
    const [monthlyContribution, setMonthlyContribution] = useState('')
    const [interestRate, setInterestRate] = useState('')
    const [years, setYears] = useState('')

    const [futureValue, setFutureValue] = useState(null)
    const [totalContributed, setTotalContributed] = useState(null)
    const [totalInterest, setTotalInterest] = useState(null)

    const calculateInvestment = () => {
        const initial = parseFloat(initialAmount)
        const contribution = parseFloat(monthlyContribution)
        const rate = parseFloat(interestRate)
        const time = parseFloat(years)

        if (
            isNaN(initial) || isNaN(contribution) || isNaN(rate) || isNaN(time) ||
            initial < 0 || contribution < 0 || rate < 0 || time <= 0
        ) {
            alert('Please enter valid positive numbers.')
            return
        }

        const monthlyRate = (rate / 100) / 12
        const totalMonths = time * 12

        let futureVal = 0
        let totalContrib = 0

        if (monthlyRate === 0) {
            futureVal = initial + (contribution * totalMonths)
            totalContrib = initial + (contribution * totalMonths)
        } else {
            // Future value of initial amount: A = P(1 + r)^n
            const fvInitial = initial * Math.pow(1 + monthlyRate, totalMonths)

            // Future value of a series: PMT * (((1 + r)^n - 1) / r)
            const fvSeries = contribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)

            futureVal = fvInitial + fvSeries
            totalContrib = initial + (contribution * totalMonths)
        }

        const interest = futureVal - totalContrib

        setFutureValue(futureVal.toFixed(2))
        setTotalContributed(totalContrib.toFixed(2))
        setTotalInterest(interest.toFixed(2))
    }

    return (
        <div className={styles.investmentCalculatorContainer}>
            <div className={styles.investmentCalculator}>
                <div className={styles.header}>
                    <h2>Investment Calculator</h2>
                    <p>Calculate your investment growth over time</p>
                </div>

                <div className={styles.inputGroup}>
                    <label>Initial Amount ($)</label>
                    <input
                        type="number"
                        value={initialAmount}
                        onChange={(e) => setInitialAmount(e.target.value)}
                        placeholder="e.g. 5000"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Monthly Contribution ($)</label>
                    <input
                        type="number"
                        value={monthlyContribution}
                        onChange={(e) => setMonthlyContribution(e.target.value)}
                        placeholder="e.g. 200"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Annual Interest Rate (%)</label>
                    <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        placeholder="e.g. 8"
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

                <button className={styles.calculateBtn} onClick={calculateInvestment}>
                    Calculate
                </button>

                {futureValue && (
                    <div className={styles.resultContainer}>
                        <div className={styles.resultRow}>
                            <div className={styles.resultLabel}>Future Value</div>
                            <div className={styles.resultValue}>${futureValue}</div>
                        </div>
                        <div className={styles.resultRowSecondary}>
                            <span>Total Contributed:</span>
                            <span>${totalContributed}</span>
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

export default InvestmentCalculator
