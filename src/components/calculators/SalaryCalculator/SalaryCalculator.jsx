import { useState, useEffect } from 'react'
import styles from './SalaryCalculator.module.scss'

const SalaryCalculator = () => {
    const [amount, setAmount] = useState('')
    const [frequency, setFrequency] = useState('annual')
    const [results, setResults] = useState(null)

    // Constants for calculation (assuming 40 hour work week, 52 weeks/year)
    const HOURS_PER_WEEK = 40
    const WEEKS_PER_YEAR = 52
    const DAYS_PER_WEEK = 5
    const MONTHS_PER_YEAR = 12

    useEffect(() => {
        calculateSalary()
    }, [amount, frequency])

    const calculateSalary = () => {
        const val = parseFloat(amount)
        if (isNaN(val) || val < 0) {
            setResults(null)
            return
        }

        let annual = 0

        // Convert input to annual first
        switch (frequency) {
            case 'hourly':
                annual = val * HOURS_PER_WEEK * WEEKS_PER_YEAR
                break
            case 'daily':
                annual = val * DAYS_PER_WEEK * WEEKS_PER_YEAR
                break
            case 'weekly':
                annual = val * WEEKS_PER_YEAR
                break
            case 'biweekly':
                annual = val * (WEEKS_PER_YEAR / 2)
                break
            case 'monthly':
                annual = val * MONTHS_PER_YEAR
                break
            case 'annual':
                annual = val
                break
            default:
                annual = 0
        }

        // Calculate all other frequencies from annual
        setResults({
            hourly: annual / WEEKS_PER_YEAR / HOURS_PER_WEEK,
            daily: annual / WEEKS_PER_YEAR / DAYS_PER_WEEK,
            weekly: annual / WEEKS_PER_YEAR,
            biweekly: annual / (WEEKS_PER_YEAR / 2),
            monthly: annual / MONTHS_PER_YEAR,
            annual: annual
        })
    }

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(val)
    }

    return (
        <div className={styles.salaryCalculatorContainer}>
            <div className={styles.salaryCalculator}>
                <div className={styles.header}>
                    <h2>Salary Calculator</h2>
                    <p>Convert your salary across different time periods</p>
                </div>

                <div className={styles.inputGroup}>
                    <label>Salary Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="e.g. 50000"
                        min="0"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Frequency</label>
                    <select
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                    >
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="annual">Annual</option>
                    </select>
                </div>

                {results && (
                    <div className={styles.results}>
                        <h3>Your Salary Breakdown</h3>

                        <div className={styles.resultRow}>
                            <span>Hourly</span>
                            <span>{formatCurrency(results.hourly)}</span>
                        </div>
                        <div className={styles.resultRow}>
                            <span>Daily</span>
                            <span>{formatCurrency(results.daily)}</span>
                        </div>
                        <div className={styles.resultRow}>
                            <span>Weekly</span>
                            <span>{formatCurrency(results.weekly)}</span>
                        </div>
                        <div className={styles.resultRow}>
                            <span>Bi-Weekly</span>
                            <span>{formatCurrency(results.biweekly)}</span>
                        </div>
                        <div className={styles.resultRow}>
                            <span>Monthly</span>
                            <span>{formatCurrency(results.monthly)}</span>
                        </div>
                        <div className={styles.resultRow}>
                            <span>Annual</span>
                            <span>{formatCurrency(results.annual)}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SalaryCalculator
