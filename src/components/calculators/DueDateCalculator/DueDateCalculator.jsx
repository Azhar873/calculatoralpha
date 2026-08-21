import { useState } from 'react'
import styles from './DueDateCalculator.module.scss'

const DueDateCalculator = () => {
    const [lastPeriodDate, setLastPeriodDate] = useState('')
    const [cycleLength, setCycleLength] = useState(28)
    const [results, setResults] = useState(null)

    const calculateDueDate = () => {
        if (!lastPeriodDate) {
            alert('Please select the first day of your last period.')
            return
        }

        const lmp = new Date(lastPeriodDate)

        // Cycle validation
        if (cycleLength < 21 || cycleLength > 40) {
            alert('Please enter a cycle length between 21 and 40 days for accurate results.')
            return
        }

        // Standard gestation is 280 days from LMP for a 28-day cycle.
        // Adjustment: add (cycleLength - 28) days.
        const daysToAdd = 280 + (cycleLength - 28)

        const dueDate = new Date(lmp)
        dueDate.setDate(lmp.getDate() + daysToAdd)

        const conceptionDate = new Date(dueDate)
        conceptionDate.setDate(dueDate.getDate() - 266) // 266 days is average duration from conception

        // Trimesters
        // 1st: LMP to 13 weeks
        // 2nd: 14 weeks to 26 weeks
        // 3rd: 27 weeks to birth

        const trimester2Start = new Date(lmp)
        trimester2Start.setDate(lmp.getDate() + (13 * 7))

        const trimester3Start = new Date(lmp)
        trimester3Start.setDate(lmp.getDate() + (27 * 7))

        const formatDate = (date) => {
            return date.toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })
        }

        setResults({
            dueDate: formatDate(dueDate),
            conceptionDate: formatDate(conceptionDate),
            trimester2: formatDate(trimester2Start),
            trimester3: formatDate(trimester3Start)
        })
    }

    return (
        <div className={styles.dueDateCalculatorContainer}>
            <div className={styles.dueDateCalculator}>
                <div className={styles.header}>
                    <h2>Due Date Calculator</h2>
                    <p>Estimate your baby's due date based on your last period</p>
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
                        max="40"
                    />
                    <small style={{ color: '#888', marginTop: '5px', display: 'block' }}>
                        Typical cycle is 28 days
                    </small>
                </div>

                <button className={styles.calculateBtn} onClick={calculateDueDate}>
                    Calculate Due Date
                </button>

                {results && (
                    <div className={styles.resultContainer}>
                        <h3>Your Pregnancy Timeline</h3>
                        <div className={styles.resultGrid}>
                            <div className={`${styles.resultItem} ${styles.highlight}`}>
                                <div className={styles.label}>Estimated Due Date</div>
                                <div className={styles.value}>{results.dueDate}</div>
                            </div>
                            <div className={styles.resultItem}>
                                <div className={styles.label}>Approx. Conception Date</div>
                                <div className={styles.value}>{results.conceptionDate}</div>
                            </div>
                            <div className={styles.resultItem}>
                                <div className={styles.label}>Second Trimester Begins</div>
                                <div className={styles.value}>{results.trimester2}</div>
                            </div>
                            <div className={styles.resultItem}>
                                <div className={styles.label}>Third Trimester Begins</div>
                                <div className={styles.value}>{results.trimester3}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DueDateCalculator
