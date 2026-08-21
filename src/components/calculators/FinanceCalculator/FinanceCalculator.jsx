import { useState } from 'react'
import styles from './FinanceCalculator.module.scss'

const FinanceCalculator = () => {
    const [savingsGoal, setSavingsGoal] = useState('')
    const [currentSavings, setCurrentSavings] = useState('')
    const [interestRate, setInterestRate] = useState('')
    const [years, setYears] = useState('')

    const [monthlyContribution, setMonthlyContribution] = useState(null)
    const [totalInterest, setTotalInterest] = useState(null)
    const [totalPrincipal, setTotalPrincipal] = useState(null)

    const calculateContribution = () => {
        const goal = parseFloat(savingsGoal)
        const current = parseFloat(currentSavings) || 0
        const rate = parseFloat(interestRate)
        const time = parseFloat(years)

        if (
            isNaN(goal) || isNaN(rate) || isNaN(time) ||
            goal < 0 || current < 0 || rate < 0 || time <= 0
        ) {
            alert('Please enter valid positive numbers.')
            return
        }

        const monthlyRate = (rate / 100) / 12
        const totalMonths = time * 12

        let requiredMonthly = 0
        let interestEarned = 0
        let principalInvested = 0

        if (monthlyRate === 0) {
            const remaining = goal - current
            requiredMonthly = remaining / totalMonths
            principalInvested = current + (requiredMonthly * totalMonths) // Should equal goal
            interestEarned = 0
        } else {
            // FV = PV * (1 + r)^n + PMT * (((1 + r)^n - 1) / r)
            // PMT = (FV - PV * (1 + r)^n) / (((1 + r)^n - 1) / r)

            const compoundFactor = Math.pow(1 + monthlyRate, totalMonths)
            const futureValueCurrent = current * compoundFactor
            const remainingGoal = goal - futureValueCurrent

            if (remainingGoal <= 0) {
                requiredMonthly = 0
                interestEarned = futureValueCurrent - current
                principalInvested = current
            } else {
                const denominator = (compoundFactor - 1) / monthlyRate
                requiredMonthly = remainingGoal / denominator

                principalInvested = current + (requiredMonthly * totalMonths)
                interestEarned = goal - principalInvested
            }
        }

        setMonthlyContribution(requiredMonthly.toFixed(2))
        setTotalPrincipal(principalInvested.toFixed(2))
        setTotalInterest(interestEarned.toFixed(2))
    }

    return (
        <div className={styles.financeCalculatorContainer}>
            <div className={styles.financeCalculator}>
                <div className={styles.header}>
                    <h2>Finance Calculator</h2>
                    <p>Calculate monthly savings needed to reach your goal</p>
                </div>

                <div className={styles.inputGroup}>
                    <label>Savings Goal ($)</label>
                    <input
                        type="number"
                        value={savingsGoal}
                        onChange={(e) => setSavingsGoal(e.target.value)}
                        placeholder="e.g. 100000"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Current Savings ($)</label>
                    <input
                        type="number"
                        value={currentSavings}
                        onChange={(e) => setCurrentSavings(e.target.value)}
                        placeholder="e.g. 5000"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Annual Interest Rate (%)</label>
                    <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        placeholder="e.g. 6"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Time Period (Years)</label>
                    <input
                        type="number"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                        placeholder="e.g. 5"
                    />
                </div>

                <button className={styles.calculateBtn} onClick={calculateContribution}>
                    Calculate
                </button>

                {monthlyContribution && (
                    <div className={styles.resultContainer}>
                        <div className={styles.resultRow}>
                            <div className={styles.resultLabel}>Required Monthly Contribution</div>
                            <div className={styles.resultValue}>${monthlyContribution}</div>
                        </div>
                        <div className={styles.resultRowSecondary}>
                            <span>Total Principal:</span>
                            <span>${totalPrincipal}</span>
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

export default FinanceCalculator
