import { useState } from 'react'
import styles from './PercentageCalculator.module.scss'

function PercentageCalculator() {
    const [mode, setMode] = useState('value') // value, percentage, change
    const [val1, setVal1] = useState('')
    const [val2, setVal2] = useState('')
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)

    const calculate = () => {
        setError(null)
        setResult(null)

        const n1 = parseFloat(val1)
        const n2 = parseFloat(val2)

        if (isNaN(n1) || isNaN(n2)) {
            setError('Please enter valid numbers.')
            return
        }

        let res
        let text = ''

        switch (mode) {
            case 'value':
                // What is X% of Y?
                res = (n1 / 100) * n2
                text = `${n1}% of ${n2}`
                break
            case 'percentage':
                // X is what % of Y?
                if (n2 === 0) {
                    setError('Cannot divide by zero.')
                    return
                }
                res = (n1 / n2) * 100
                text = `${n1} is what % of ${n2}`
                break
            case 'change':
                // % change from X to Y
                if (n1 === 0) {
                    setError('Starting value cannot be zero for percentage change.')
                    return
                }
                res = ((n2 - n1) / n1) * 100
                text = `Change from ${n1} to ${n2}`
                break
            default:
                return
        }

        setResult({ value: res, text })
    }

    const handleClear = () => {
        setVal1('')
        setVal2('')
        setResult(null)
        setError(null)
    }

    const handleModeChange = (e) => {
        setMode(e.target.value)
        handleClear()
    }

    return (
        <div className={styles.percentageCalculator}>
            <div className={styles.calculatorCard}>
                <h2>Percentage Calculator</h2>

                <div className={styles.modeSelect}>
                    <select value={mode} onChange={handleModeChange}>
                        <option value="value">What is X% of Y?</option>
                        <option value="percentage">X is what % of Y?</option>
                        <option value="change">Percentage Change (X to Y)</option>
                    </select>
                </div>

                <div className={styles.inputSection}>
                    {mode === 'value' && (
                        <>
                            <div className={styles.inputGroup}>
                                <span>What is</span>
                                <input
                                    type="number"
                                    value={val1}
                                    onChange={(e) => setVal1(e.target.value)}
                                    placeholder="X"
                                />
                                <span>%</span>
                            </div>
                            <div className={styles.inputGroup}>
                                <span>of</span>
                                <input
                                    type="number"
                                    value={val2}
                                    onChange={(e) => setVal2(e.target.value)}
                                    placeholder="Y"
                                />
                            </div>
                        </>
                    )}

                    {mode === 'percentage' && (
                        <>
                            <div className={styles.inputGroup}>
                                <input
                                    type="number"
                                    value={val1}
                                    onChange={(e) => setVal1(e.target.value)}
                                    placeholder="X"
                                />
                                <span>is what % of</span>
                            </div>
                            <div className={styles.inputGroup}>
                                <input
                                    type="number"
                                    value={val2}
                                    onChange={(e) => setVal2(e.target.value)}
                                    placeholder="Y"
                                />
                            </div>
                        </>
                    )}

                    {mode === 'change' && (
                        <>
                            <div className={styles.inputGroup}>
                                <span>From</span>
                                <input
                                    type="number"
                                    value={val1}
                                    onChange={(e) => setVal1(e.target.value)}
                                    placeholder="Start"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <span>to</span>
                                <input
                                    type="number"
                                    value={val2}
                                    onChange={(e) => setVal2(e.target.value)}
                                    placeholder="End"
                                />
                            </div>
                        </>
                    )}
                </div>

                <div className={styles.controls}>
                    <button className={styles.calculateBtn} onClick={calculate}>Calculate</button>
                    <button className={styles.clearBtn} onClick={handleClear}>Clear</button>
                </div>

                {error && <div className={styles.error}>{error}</div>}

                {result && (
                    <div className={styles.resultSection}>
                        <h3>Result</h3>
                        <div className={styles.resultDisplay}>
                            <span className={styles.resultValue}>
                                {mode === 'value' ? result.value.toLocaleString(undefined, { maximumFractionDigits: 4 }) : result.value.toFixed(2) + '%'}
                            </span>
                            <span className={styles.resultText}>
                                {result.text}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PercentageCalculator
