import { useState } from 'react'
import styles from './PaceCalculator.module.scss'

const PaceCalculator = () => {
    const [distanceType, setDistanceType] = useState('5k')
    const [customDistance, setCustomDistance] = useState('')
    const [distanceUnit, setDistanceUnit] = useState('km') // km, mi, m, yds

    // Time inputs
    const [hours, setHours] = useState('')
    const [minutes, setMinutes] = useState('')
    const [seconds, setSeconds] = useState('')

    const [results, setResults] = useState(null)

    const handleDistanceTypeChange = (e) => {
        setDistanceType(e.target.value)
        setResults(null)
    }

    const calculatePace = () => {
        // 1. Determine Distance in Kilometers
        let distanceInKm = 0

        switch (distanceType) {
            case '5k': distanceInKm = 5; break;
            case '10k': distanceInKm = 10; break;
            case 'half-marathon': distanceInKm = 21.0975; break;
            case 'marathon': distanceInKm = 42.195; break;
            case 'custom':
                const val = parseFloat(customDistance)
                if (!val || val <= 0) {
                    alert('Please enter a valid positive distance.')
                    return
                }
                // Convert custom unit to km
                if (distanceUnit === 'km') distanceInKm = val;
                else if (distanceUnit === 'mi') distanceInKm = val * 1.60934;
                else if (distanceUnit === 'm') distanceInKm = val / 1000;
                else if (distanceUnit === 'yds') distanceInKm = val * 0.0009144;
                break;
            default: distanceInKm = 0;
        }

        // 2. Determine Total Time in Minutes
        const h = parseFloat(hours) || 0
        const m = parseFloat(minutes) || 0
        const s = parseFloat(seconds) || 0

        const totalMinutes = h * 60 + m + s / 60

        if (totalMinutes <= 0) {
            alert('Please enter a valid time duration.')
            return
        }

        if (distanceInKm <= 0) {
            alert('Invalid distance calculated.')
            return
        }

        // 3. Calculate Results
        // Pace (min/km)
        const paceMinPerKm = totalMinutes / distanceInKm
        const paceMinPerKmFloored = Math.floor(paceMinPerKm)
        const paceSecPerKm = Math.round((paceMinPerKm - paceMinPerKmFloored) * 60)

        // Pace (min/mi)
        // 1 km = 0.621371 mi
        const distanceInMiles = distanceInKm * 0.621371
        const paceMinPerMi = totalMinutes / distanceInMiles
        const paceMinPerMiFloored = Math.floor(paceMinPerMi)
        const paceSecPerMi = Math.round((paceMinPerMi - paceMinPerMiFloored) * 60)

        // Speed (km/h)
        const totalHours = totalMinutes / 60
        const speedKmh = distanceInKm / totalHours

        // Speed (mph)
        const speedMph = distanceInMiles / totalHours

        setResults({
            paceKm: `${paceMinPerKmFloored}:${paceSecPerKm.toString().padStart(2, '0')}`,
            paceMi: `${paceMinPerMiFloored}:${paceSecPerMi.toString().padStart(2, '0')}`,
            speedKmh: speedKmh.toFixed(2),
            speedMph: speedMph.toFixed(2)
        })
    }

    return (
        <div className={styles.paceCalculatorContainer}>
            <div className={styles.paceCalculator}>
                <div className={styles.header}>
                    <h2>Running Pace Calculator</h2>
                    <p>Track your performance and plan your race</p>
                </div>

                <div className={styles.controls}>
                    <div className={styles.inputSection}>
                        <div className={styles.sectionHeader}>
                            <span className={styles.stepNumber}>1</span>
                            <h3>Distance</h3>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Event Type</label>
                            <select
                                value={distanceType}
                                onChange={handleDistanceTypeChange}
                                className={styles.selectInput}
                            >
                                <option value="5k">5K (5 km)</option>
                                <option value="10k">10K (10 km)</option>
                                <option value="half-marathon">Half Marathon (21.1 km)</option>
                                <option value="marathon">Marathon (42.2 km)</option>
                                <option value="custom">Custom Distance</option>
                            </select>
                        </div>

                        {distanceType === 'custom' && (
                            <div className={styles.customDistanceRow}>
                                <div className={styles.inputGroup}>
                                    <label>Distance</label>
                                    <input
                                        type="number"
                                        value={customDistance}
                                        onChange={(e) => setCustomDistance(e.target.value)}
                                        placeholder="10"
                                        className={styles.numberInput}
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Unit</label>
                                    <select
                                        value={distanceUnit}
                                        onChange={(e) => setDistanceUnit(e.target.value)}
                                        className={styles.selectInput}
                                    >
                                        <option value="km">Km</option>
                                        <option value="mi">Miles</option>
                                        <option value="m">Meters</option>
                                        <option value="yds">Yards</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={styles.inputSection}>
                        <div className={styles.sectionHeader}>
                            <span className={styles.stepNumber}>2</span>
                            <h3>Time Goal</h3>
                        </div>
                        <div className={styles.timeInputs}>
                            <div className={styles.timeField}>
                                <label>Hrs</label>
                                <input
                                    type="number"
                                    placeholder="00"
                                    value={hours}
                                    onChange={(e) => setHours(e.target.value)}
                                />
                            </div>
                            <div className={styles.separator}>:</div>
                            <div className={styles.timeField}>
                                <label>Mins</label>
                                <input
                                    type="number"
                                    placeholder="00"
                                    value={minutes}
                                    onChange={(e) => setMinutes(e.target.value)}
                                />
                            </div>
                            <div className={styles.separator}>:</div>
                            <div className={styles.timeField}>
                                <label>Secs</label>
                                <input
                                    type="number"
                                    placeholder="00"
                                    value={seconds}
                                    onChange={(e) => setSeconds(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <button className={styles.calculateBtn} onClick={calculatePace}>
                    Calculate Results
                </button>

                {results && (
                    <div className={styles.resultContainer}>
                        <div className={styles.resultHeader}>
                            <h3>Performance Stats</h3>
                        </div>
                        <div className={styles.resultGrid}>
                            <div className={styles.resultCard}>
                                <span className={styles.cardInfo}>Metric</span>
                                <div className={styles.paceValue}>{results.paceKm}</div>
                                <div className={styles.paceLabel}>min / km</div>
                            </div>
                            <div className={styles.resultCard} data-type="secondary">
                                <span className={styles.cardInfo}>Imperial</span>
                                <div className={styles.paceValue}>{results.paceMi}</div>
                                <div className={styles.paceLabel}>min / mile</div>
                            </div>
                            <div className={styles.resultCard} data-type="accent">
                                <span className={styles.cardInfo}>Speed</span>
                                <div className={styles.paceValue}>{results.speedKmh}</div>
                                <div className={styles.paceLabel}>km / hr</div>
                            </div>
                            <div className={styles.resultCard} data-type="accent">
                                <span className={styles.cardInfo}>Speed</span>
                                <div className={styles.paceValue}>{results.speedMph}</div>
                                <div className={styles.paceLabel}>mph</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PaceCalculator
