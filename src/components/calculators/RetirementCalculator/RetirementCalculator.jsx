import { useState } from 'react'
import styles from './RetirementCalculator.module.scss'

const RetirementCalculator = () => {
    const [currentAge, setCurrentAge] = useState('')
    const [retirementAge, setRetirementAge] = useState('')
    const [currentSavings, setCurrentSavings] = useState('')
    const [monthlyContribution, setMonthlyContribution] = useState('')
    const [annualReturn, setAnnualReturn] = useState('')

    const [totalSavings, setTotalSavings] = useState(null)
    const [monthlyIncome, setMonthlyIncome] = useState(null) // estimated 4% rule
    const [totalContributed, setTotalContributed] = useState(null)
    const [totalInterest, setTotalInterest] = useState(null)

    const calculateRetirement = () => {
        const cAge = parseFloat(currentAge)
        const rAge = parseFloat(retirementAge)
        const savings = parseFloat(currentSavings)
        const contribution = parseFloat(monthlyContribution)
        const rate = parseFloat(annualReturn)

        if (
            isNaN(cAge) || isNaN(rAge) || isNaN(savings) ||
            isNaN(contribution) || isNaN(rate) ||
            cAge < 0 || rAge <= cAge || savings < 0 || contribution < 0 || rate < 0
        ) {
            alert('Please enter valid positive numbers. Retirement age must be greater than current age.')
            return
        }

        const yearsToGrow = rAge - cAge
        const months = yearsToGrow * 12
        const monthlyRate = (rate / 100) / 12

        let futureValueSavings
        let futureValueContributions

        if (monthlyRate === 0) {
            futureValueSavings = savings
            futureValueContributions = contribution * months
        } else {
            const compoundFactor = Math.pow(1 + monthlyRate, months)
            futureValueSavings = savings * compoundFactor
            futureValueContributions = contribution * (compoundFactor - 1) / monthlyRate
        }

        const total = futureValueSavings + futureValueContributions
        const contributed = savings + (contribution * months)
        const interest = total - contributed

        // 4% safe withdrawal rate per year, divided by 12 for monthly
        const income = (total * 0.04) / 12

        setTotalSavings(total.toFixed(2))
        setMonthlyIncome(income.toFixed(2))
        setTotalContributed(contributed.toFixed(2))
        setTotalInterest(interest.toFixed(2))
    }

    return (
        <div className={styles.retirementCalculatorContainer}>
            <div className={styles.retirementCalculator}>
                <div className={styles.header}>
                    <h2>Retirement Calculator</h2>
                    <p>Plan your financial future</p>
                </div>

                <div className={styles.inputGroup}>
                    <label>Current Age</label>
                    <input
                        type="number"
                        value={currentAge}
                        onChange={(e) => setCurrentAge(e.target.value)}
                        placeholder="e.g. 30"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Retirement Age</label>
                    <input
                        type="number"
                        value={retirementAge}
                        onChange={(e) => setRetirementAge(e.target.value)}
                        placeholder="e.g. 65"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Current Savings ($)</label>
                    <input
                        type="number"
                        value={currentSavings}
                        onChange={(e) => setCurrentSavings(e.target.value)}
                        placeholder="e.g. 50000"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Monthly Contribution ($)</label>
                    <input
                        type="number"
                        value={monthlyContribution}
                        onChange={(e) => setMonthlyContribution(e.target.value)}
                        placeholder="e.g. 1000"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Expected Annual Return (%)</label>
                    <input
                        type="number"
                        value={annualReturn}
                        onChange={(e) => setAnnualReturn(e.target.value)}
                        placeholder="e.g. 7"
                    />
                </div>

                <button className={styles.calculateBtn} onClick={calculateRetirement}>
                    Calculate
                </button>

                {totalSavings && (
                    <div className={styles.resultContainer}>
                        <div className={styles.resultRow}>
                            <div className={styles.resultLabel}>Total at Retirement</div>
                            <div className={styles.resultValue}>${totalSavings}</div>
                        </div>
                        <div className={styles.resultRowSecondary}>
                            <span>Est. Monthly Income (4% rule):</span>
                            <span>${monthlyIncome}</span>
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

export default RetirementCalculator
