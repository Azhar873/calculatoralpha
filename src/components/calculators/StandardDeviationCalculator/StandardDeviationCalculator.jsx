import React, { useState } from 'react'
import styles from './StandardDeviationCalculator.module.scss'

const StandardDeviationCalculator = () => {
    const [inputData, setInputData] = useState('')
    const [results, setResults] = useState(null)
    const [error, setError] = useState('')

    const calculateStandardDeviation = () => {
        setError('')
        setResults(null)

        if (!inputData.trim()) {
            setError('Please enter some numbers.')
            return
        }

        // Parse input: split by commas, spaces, or newlines
        const numbers = inputData
            .split(/[\s,]+/)
            .map((val) => parseFloat(val))
            .filter((val) => !isNaN(val))

        if (numbers.length < 2) {
            setError('Please enter at least two numbers to calculate standard deviation.')
            return
        }

        const count = numbers.length
        const mean = numbers.reduce((acc, val) => acc + val, 0) / count

        // Calculate Variance
        const squaredDifferencesSum = numbers.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0)

        const populationVariance = squaredDifferencesSum / count
        const sampleVariance = squaredDifferencesSum / (count - 1)

        const populationStdDev = Math.sqrt(populationVariance)
        const sampleStdDev = Math.sqrt(sampleVariance)

        setResults({
            count,
            mean,
            populationVariance,
            sampleVariance,
            populationStdDev,
            sampleStdDev,
        })
    }

    const clearAll = () => {
        setInputData('')
        setResults(null)
        setError('')
    }

    return (
        <div className={styles.standardDeviationCalculatorContainer}>
            <div className={styles.standardDeviationCalculator}>
                <div className={styles.helperText}>
                    Enter a set of numbers separated by commas, spaces, or newlines to calculate the standard deviation, variance, and mean.
                </div>

                <div className={styles.controls}>
                    <div className={styles.inputGroup}>
                        <label>Data Set</label>
                        <textarea
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                            placeholder="e.g., 10, 12, 23, 23, 16, 23, 21, 16"
                        />
                        <div className={styles.example}>Accepts comma, space, or newline separated values</div>
                    </div>

                    {error && <div style={{ color: '#e53e3e', marginBottom: '1rem' }}>{error}</div>}

                    <div className={styles.buttonGroup}>
                        <button className={styles.calculateBtn} onClick={calculateStandardDeviation}>
                            Calculate
                        </button>
                        <button className={styles.clearBtn} onClick={clearAll}>
                            Clear
                        </button>
                    </div>
                </div>

                {results && (
                    <div className={styles.results}>
                        <h3>Results</h3>
                        <div className={styles.resultGrid}>
                            <div className={styles.resultItem}>
                                <span className={styles.label}>N (Count)</span>
                                <span className={styles.value}>{results.count}</span>
                            </div>
                            <div className={styles.resultItem}>
                                <span className={styles.label}>Mean (Average)</span>
                                <span className={styles.value}>{results.mean.toFixed(4)}</span>
                            </div>
                            <div className={styles.resultItem}>
                                <span className={styles.label}>Population Std Dev (σ)</span>
                                <span className={styles.value}>{results.populationStdDev.toFixed(4)}</span>
                                <span className={styles.subLabel}>Variance: {results.populationVariance.toFixed(4)}</span>
                            </div>
                            <div className={styles.resultItem}>
                                <span className={styles.label}>Sample Std Dev (s)</span>
                                <span className={styles.value}>{results.sampleStdDev.toFixed(4)}</span>
                                <span className={styles.subLabel}>Variance: {results.sampleVariance.toFixed(4)}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default StandardDeviationCalculator
