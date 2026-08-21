import { useState } from 'react'
import styles from './PregnancyConceptionCalculator.module.scss'

const PregnancyConceptionCalculator = () => {
    const [lastPeriodDate, setLastPeriodDate] = useState('')
    const [cycleLength, setCycleLength] = useState(28)
    const [results, setResults] = useState(null)

    const calculateConception = () => {
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

        // Cycle validation
        if (cycleLength < 21 || cycleLength > 40) {
            alert('Please enter a cycle length between 21 and 40 days for accurate results.')
            return
        }

        // Logic:
        // Ovulation is typically 14 days before the NEXT period starts.
        // Next Period = LMP + CycleLength
        // Ovulation = Next Period - 14 days
        // Or simply: LMP + (CycleLength - 14) days

        const daysToOvulation = cycleLength - 14
        const ovulationDate = new Date(lmp)
        ovulationDate.setDate(lmp.getDate() + daysToOvulation)

        // Fertile Window: 5 days before ovulation + ovulation day
        const fertileStartDate = new Date(ovulationDate)
        fertileStartDate.setDate(ovulationDate.getDate() - 5)

        const fertileEndDate = new Date(ovulationDate)
        // Fertile window usually includes the day of ovulation and maybe 1 day after, 
        // but typically the "Fertile Window" spans the 6 days ending on ovulation.
        // We will show the range [Ovulation - 5, Ovulation]

        // Next Period
        const nextPeriodDate = new Date(lmp)
        nextPeriodDate.setDate(lmp.getDate() + cycleLength)

        const formatDate = (date) => {
            return date.toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })
        }

        setResults({
            ovulation: formatDate(ovulationDate),
            fertileWindow: `${formatDate(fertileStartDate)} - ${formatDate(fertileEndDate)}`,
            nextPeriod: formatDate(nextPeriodDate)
        })
    }

    return (
        <div className={styles.pregnancyConceptionCalculatorContainer}>
            <div className={styles.pregnancyConceptionCalculator}>
                <div className={styles.header}>
                    <h2>Conception Calculator</h2>
                    <p>Find your most fertile days to increase chances of conception</p>
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

                <button className={styles.calculateBtn} onClick={calculateConception}>
                    Calculate Fertile Window
                </button>

                {results && (
                    <div className={styles.resultContainer}>
                        <h3>Your Fertility Forecast</h3>
                        <div className={styles.resultGrid}>
                            <div className={`${styles.resultItem} ${styles.highlight}`}>
                                <div className={styles.label}>Most Fertile Window</div>
                                <div className={styles.value}>{results.fertileWindow}</div>
                            </div>
                            <div className={styles.resultItem}>
                                <div className={styles.label}>Approx. Ovulation Date</div>
                                <div className={styles.value}>{results.ovulation}</div>
                            </div>
                            <div className={styles.resultItem}>
                                <div className={styles.label}>Next Period Expected</div>
                                <div className={styles.value}>{results.nextPeriod}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PregnancyConceptionCalculator
