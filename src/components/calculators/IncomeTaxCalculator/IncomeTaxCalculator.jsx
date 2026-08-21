import { useState } from 'react'
import styles from './IncomeTaxCalculator.module.scss'

const IncomeTaxCalculator = () => {
    const [annualIncome, setAnnualIncome] = useState('')

    const [totalTax, setTotalTax] = useState(null)
    const [effectiveRate, setEffectiveRate] = useState(null)
    const [afterTaxIncome, setAfterTaxIncome] = useState(null)

    const calculateTax = () => {
        const income = parseFloat(annualIncome)

        if (isNaN(income) || income < 0) {
            alert('Please enter a valid positive income.')
            return
        }

        // Simplified 2024 Tax Brackets for Single Filers
        const brackets = [
            { limit: 11600, rate: 0.10 },
            { limit: 47150, rate: 0.12 },
            { limit: 100525, rate: 0.22 },
            { limit: 191950, rate: 0.24 },
            { limit: 243725, rate: 0.32 },
            { limit: 609350, rate: 0.35 },
            { limit: Infinity, rate: 0.37 }
        ]

        let tax = 0
        let previousLimit = 0

        for (const bracket of brackets) {
            if (income > bracket.limit) {
                tax += (bracket.limit - previousLimit) * bracket.rate
                previousLimit = bracket.limit
            } else {
                tax += (income - previousLimit) * bracket.rate
                break
            }
        }

        const effectiveTaxRate = (tax / income) * 100
        const incomeAfterOptions = income - tax

        setTotalTax(tax.toFixed(2))
        setEffectiveRate(effectiveTaxRate.toFixed(2))
        setAfterTaxIncome(incomeAfterOptions.toFixed(2))
    }

    return (
        <div className={styles.incomeTaxCalculatorContainer}>
            <div className={styles.incomeTaxCalculator}>
                <div className={styles.header}>
                    <h2>Income Tax Calculator</h2>
                    <p>Estimate your annual income tax</p>
                </div>

                <div className={styles.inputGroup}>
                    <label>Annual Income ($)</label>
                    <input
                        type="number"
                        value={annualIncome}
                        onChange={(e) => setAnnualIncome(e.target.value)}
                        placeholder="e.g. 75000"
                    />
                </div>

                <button className={styles.calculateBtn} onClick={calculateTax}>
                    Calculate
                </button>

                {totalTax && (
                    <div className={styles.resultContainer}>
                        <div className={styles.resultRow}>
                            <div className={styles.resultLabel}>Total Tax Liability</div>
                            <div className={styles.resultValue}>${totalTax}</div>
                        </div>
                        <div className={styles.resultRowSecondary}>
                            <span>Effective Tax Rate:</span>
                            <span>{effectiveRate}%</span>
                        </div>
                        <div className={styles.resultRowSecondary}>
                            <span>After-Tax Income:</span>
                            <span>${afterTaxIncome}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default IncomeTaxCalculator
