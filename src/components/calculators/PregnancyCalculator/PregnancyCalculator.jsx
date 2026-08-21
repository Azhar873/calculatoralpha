import { useState } from 'react'
import styles from './PregnancyCalculator.module.scss'

const PregnancyCalculator = () => {
    const [lastPeriodDate, setLastPeriodDate] = useState('')
    const [cycleLength, setCycleLength] = useState(28)
    const [results, setResults] = useState(null)

    const calculatePregnancy = () => {
        if (!lastPeriodDate) {
            alert('Please select the first day of your last period.')
            return
        }

        const lmp = new Date(lastPeriodDate)
        const today = new Date()

        if (lmp > today) {
            alert('Last period date cannot be in the future.')
            return
        }

        // Naegele's rule extended for cycle length
        // Standard is 280 days from LMP for 28 day cycle
        // Correction: + (CycleLength - 28) days
        const cycleCorrection = cycleLength - 28
        const pregnancyDurationDays = 280 + cycleCorrection

        const edd = new Date(lmp)
        edd.setDate(lmp.getDate() + pregnancyDurationDays)

        // Calculate current progress
        const timeDiff = today.getTime() - lmp.getTime()
        const daysPregnant = Math.floor(timeDiff / (1000 * 3600 * 24))
        const weeksPregnant = Math.floor(daysPregnant / 7)
        const remainingDays = daysPregnant % 7

        // Determine trimester
        let trimester = 'First Trimester'
        if (weeksPregnant >= 14 && weeksPregnant <= 26) {
            trimester = 'Second Trimester'
        } else if (weeksPregnant >= 27) {
            trimester = 'Third Trimester'
        }

        setResults({
            edd: edd.toDateString(),
            progress: `${weeksPregnant} weeks and ${remainingDays} days`,
            trimester: trimester
        })
    }

    return (
        <div className={styles.pregnancyCalculatorContainer}>
            <div className={styles.pregnancyCalculator}>
                <div className={styles.header}>
                    <h2>Pregnancy Calculator</h2>
                    <p>Estimate your due date and current stage of pregnancy</p>
                </div>

                <div className={styles.inputGroup}>
                    <label>First Day of Last Period</label>
                    <input
                        type="date"
                        value={lastPeriodDate}
                        onChange={(e) => setLastPeriodDate(e.target.value)}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Average Cycle Length (days)</label>
                    <input
                        type="number"
                        value={cycleLength}
                        onChange={(e) => setCycleLength(parseInt(e.target.value) || 28)}
                        placeholder="28"
                        min="21"
                        max="35"
                    />
                </div>

                <button className={styles.calculateBtn} onClick={calculatePregnancy}>
                    Calculate
                </button>

                {results && (
                    <div className={styles.resultContainer}>
                        <h3>Your Pregnancy Results</h3>
                        <div className={styles.resultGrid}>
                            <div className={styles.resultItem}>
                                <div className={styles.label}>Estimated Due Date</div>
                                <div className={styles.value}>{results.edd}</div>
                            </div>
                            <div className={styles.resultItem}>
                                <div className={styles.label}>Current Progress</div>
                                <div className={styles.value}>{results.progress}</div>
                            </div>
                            <div className={styles.resultItem}>
                                <div className={styles.label}>Trimester</div>
                                <div className={styles.value}>{results.trimester}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PregnancyCalculator
