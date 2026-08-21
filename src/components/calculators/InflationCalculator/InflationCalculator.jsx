import { useState } from 'react'
import styles from './InflationCalculator.module.scss'

const InflationCalculator = () => {
    const [currentCost, setCurrentCost] = useState('')
    const [inflationRate, setInflationRate] = useState('')
    const [years, setYears] = useState('')

    const [futureCost, setFutureCost] = useState(null)
    const [valueDifference, setValueDifference] = useState(null)

    const calculateInflation = () => {
        const cost = parseFloat(currentCost)
        const rate = parseFloat(inflationRate)
        const time = parseFloat(years)

        if (
            isNaN(cost) || isNaN(rate) || isNaN(time) ||
            cost < 0 || rate < 0 || time <= 0
        ) {
            alert('Please enter valid positive numbers.')
            return
        }

        // Future Cost = Current Cost * (1 + Inflation Rate / 100)^Years
        const calculatedFutureCost = cost * Math.pow(1 + rate / 100, time)
        const diff = calculatedFutureCost - cost

        setFutureCost(calculatedFutureCost.toFixed(2))
        setValueDifference(diff.toFixed(2))
    }

    return (
        <div className={styles.inflationCalculatorContainer}>
            <div className={styles.inflationCalculator}>
                <div className={styles.header}>
                    <h2>Inflation Calculator</h2>
                    <p>Calculate future value based on inflation</p>
                </div>

                <div className={styles.inputGroup}>
                    <label>Current Cost ($)</label>
                    <input
                        type="number"
                        value={currentCost}
                        onChange={(e) => setCurrentCost(e.target.value)}
                        placeholder="e.g. 1000"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Annual Inflation Rate (%)</label>
                    <input
                        type="number"
                        value={inflationRate}
                        onChange={(e) => setInflationRate(e.target.value)}
                        placeholder="e.g. 3.5"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Time Period (Years)</label>
                    <input
                        type="number"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                        placeholder="e.g. 10"
                    />
                </div>

                <button className={styles.calculateBtn} onClick={calculateInflation}>
                    Calculate
                </button>

                {futureCost && (
                    <div className={styles.resultContainer}>
                        <div className={styles.resultRow}>
                            <div className={styles.resultLabel}>Future Cost</div>
                            <div className={styles.resultValue}>${futureCost}</div>
                        </div>
                        <div className={styles.resultRowSecondary}>
                            <span>Initial Cost:</span>
                            <span>${parseFloat(currentCost).toFixed(2)}</span>
                        </div>
                        <div className={styles.resultRowSecondary}>
                            <span>Increase in Cost:</span>
                            <span>${valueDifference}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default InflationCalculator
