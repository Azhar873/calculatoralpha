import { useState } from 'react'
import styles from './IdealWeightCalculator.module.scss'

const IdealWeightCalculator = () => {
    const [unitSystem, setUnitSystem] = useState('metric') // 'metric' or 'imperial'
    const [gender, setGender] = useState('male')
    const [age, setAge] = useState('')
    const [height, setHeight] = useState('')
    const [heightFt, setHeightFt] = useState('')
    const [heightIn, setHeightIn] = useState('')
    const [results, setResults] = useState(null)

    const calculateIdealWeight = () => {
        let heightInInches = 0

        if (unitSystem === 'metric') {
            const h = parseFloat(height)
            if (!h || h <= 0) {
                alert('Please enter a valid height.')
                return
            }
            heightInInches = h / 2.54
        } else {
            const ft = parseFloat(heightFt) || 0
            const inc = parseFloat(heightIn) || 0

            if (ft === 0 && inc === 0) {
                alert('Please enter a valid height.')
                return
            }
            heightInInches = ft * 12 + inc
        }

        // Base height is 5 feet (60 inches)
        const baseHeight = 60
        const heightDifference = heightInInches - baseHeight

        if (heightDifference < 0) {
            alert('This calculator is designed for heights of 5 feet or more.')
            return
        }

        const calculations = {
            robinson: 0,
            miller: 0,
            devine: 0,
            hamwi: 0
        }

        if (gender === 'male') {
            // Robinson (1983)
            calculations.robinson = 52 + 1.9 * heightDifference
            // Miller (1983)
            calculations.miller = 56.2 + 1.41 * heightDifference
            // Devine (1974)
            calculations.devine = 50.0 + 2.3 * heightDifference
            // Hamwi (1964)
            calculations.hamwi = 48.0 + 2.7 * heightDifference
        } else {
            // Robinson (1983)
            calculations.robinson = 49 + 1.7 * heightDifference
            // Miller (1983)
            calculations.miller = 53.1 + 1.36 * heightDifference
            // Devine (1974)
            calculations.devine = 45.5 + 2.3 * heightDifference
            // Hamwi (1964)
            calculations.hamwi = 45.5 + 2.2 * heightDifference
        }

        setResults(calculations)
    }

    const formatWeight = (kg) => {
        if (unitSystem === 'metric') {
            return `${kg.toFixed(1)} kg`
        } else {
            return `${(kg * 2.20462).toFixed(1)} lbs`
        }
    }

    return (
        <div className={styles.idealWeightCalculatorContainer}>
            <div className={styles.idealWeightCalculator}>
                <div className={styles.header}>
                    <h2>Ideal Weight Calculator</h2>
                    <p>Find your ideal weight using multiple popular formulas</p>
                </div>

                <div className={styles.controls}>
                    <div className={styles.toggleGroup}>
                        <button
                            className={`${styles.toggleBtn} ${unitSystem === 'metric' ? styles.active : ''}`}
                            onClick={() => {
                                setUnitSystem('metric')
                                setResults(null)
                            }}
                        >
                            Metric (cm, kg)
                        </button>
                        <button
                            className={`${styles.toggleBtn} ${unitSystem === 'imperial' ? styles.active : ''}`}
                            onClick={() => {
                                setUnitSystem('imperial')
                                setResults(null)
                            }}
                        >
                            Imperial (ft/in, lbs)
                        </button>
                    </div>
                </div>

                <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={gender === 'male'}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        <div className={styles.radioCustom}>Male</div>
                    </label>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={gender === 'female'}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        <div className={styles.radioCustom}>Female</div>
                    </label>
                </div>

                {unitSystem === 'metric' ? (
                    <div className={styles.inputGroup}>
                        <label>Height (cm)</label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="e.g. 175"
                        />
                    </div>
                ) : (
                    <div className={styles.rowInputs}>
                        <div className={styles.inputGroup}>
                            <label>Height (ft)</label>
                            <input
                                type="number"
                                value={heightFt}
                                onChange={(e) => setHeightFt(e.target.value)}
                                placeholder="5"
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Height (in)</label>
                            <input
                                type="number"
                                value={heightIn}
                                onChange={(e) => setHeightIn(e.target.value)}
                                placeholder="9"
                            />
                        </div>
                    </div>
                )}

                <button className={styles.calculateBtn} onClick={calculateIdealWeight}>
                    Calculate Ideal Weight
                </button>

                {results && (
                    <div className={styles.resultContainer}>
                        <h3>Estimated Ideal Weight</h3>
                        <div className={styles.resultGrid}>
                            <div className={styles.resultItem}>
                                <div className={styles.formulaName}>Robinson Formula (1983)</div>
                                <div className={styles.formulaValue}>{formatWeight(results.robinson)}</div>
                            </div>
                            <div className={styles.resultItem}>
                                <div className={styles.formulaName}>Miller Formula (1983)</div>
                                <div className={styles.formulaValue}>{formatWeight(results.miller)}</div>
                            </div>
                            <div className={styles.resultItem}>
                                <div className={styles.formulaName}>Devine Formula (1974)</div>
                                <div className={styles.formulaValue}>{formatWeight(results.devine)}</div>
                            </div>
                            <div className={styles.resultItem}>
                                <div className={styles.formulaName}>Hamwi Formula (1964)</div>
                                <div className={styles.formulaValue}>{formatWeight(results.hamwi)}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default IdealWeightCalculator
