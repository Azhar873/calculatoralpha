import { useState } from 'react'
import styles from './TriangleCalculator.module.scss'

function TriangleCalculator() {
    const [mode, setMode] = useState('base-height') // base-height, three-sides
    const [values, setValues] = useState({
        base: '',
        height: '',
        sideA: '',
        sideB: '',
        sideC: ''
    })
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const calculate = () => {
        setError(null)
        setResult(null)

        if (mode === 'base-height') {
            const b = parseFloat(values.base)
            const h = parseFloat(values.height)

            if (isNaN(b) || isNaN(h)) {
                setError('Please enter valid numbers for Base and Height.')
                return
            }
            if (b <= 0 || h <= 0) {
                setError('Values must be greater than zero.')
                return
            }

            const area = 0.5 * b * h
            setResult({
                area: area.toLocaleString(undefined, { maximumFractionDigits: 4 })
            })

        } else if (mode === 'three-sides') {
            const a = parseFloat(values.sideA)
            const b = parseFloat(values.sideB)
            const c = parseFloat(values.sideC)

            if (isNaN(a) || isNaN(b) || isNaN(c)) {
                setError('Please enter valid numbers for all 3 sides.')
                return
            }
            if (a <= 0 || b <= 0 || c <= 0) {
                setError('Side lengths must be greater than zero.')
                return
            }

            // Triangle Inequality Theorem
            if (a + b <= c || a + c <= b || b + c <= a) {
                setError('The sum of any two sides must be greater than the third side.')
                return
            }

            const perimeter = a + b + c
            const s = perimeter / 2 // semi-perimeter
            const area = Math.sqrt(s * (s - a) * (s - b) * (s - c))

            setResult({
                perimeter: perimeter.toLocaleString(undefined, { maximumFractionDigits: 4 }),
                area: area.toLocaleString(undefined, { maximumFractionDigits: 4 })
            })
        }
    }

    const handleClear = () => {
        setValues({
            base: '',
            height: '',
            sideA: '',
            sideB: '',
            sideC: ''
        })
        setResult(null)
        setError(null)
    }

    const handleModeChange = (e) => {
        setMode(e.target.value)
        handleClear()
    }

    return (
        <div className={styles.triangleCalculator}>
            <div className={styles.calculatorCard}>
                <h2>Triangle Calculator</h2>

                <div className={styles.modeSelect}>
                    <select value={mode} onChange={handleModeChange}>
                        <option value="base-height">Base & Height (Area)</option>
                        <option value="three-sides">3 Sides (Area & Perimeter)</option>
                    </select>
                </div>

                <div className={styles.inputSection}>
                    {mode === 'base-height' && (
                        <>
                            <div className={styles.inputGroup}>
                                <label>Base</label>
                                <input
                                    type="number"
                                    name="base"
                                    value={values.base}
                                    onChange={handleInputChange}
                                    placeholder="Enter base"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Height</label>
                                <input
                                    type="number"
                                    name="height"
                                    value={values.height}
                                    onChange={handleInputChange}
                                    placeholder="Enter height"
                                />
                            </div>
                        </>
                    )}

                    {mode === 'three-sides' && (
                        <>
                            <div className={styles.inputGroup}>
                                <label>Side A</label>
                                <input
                                    type="number"
                                    name="sideA"
                                    value={values.sideA}
                                    onChange={handleInputChange}
                                    placeholder="Enter side A"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Side B</label>
                                <input
                                    type="number"
                                    name="sideB"
                                    value={values.sideB}
                                    onChange={handleInputChange}
                                    placeholder="Enter side B"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Side C</label>
                                <input
                                    type="number"
                                    name="sideC"
                                    value={values.sideC}
                                    onChange={handleInputChange}
                                    placeholder="Enter side C"
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
                        <div className={styles.resultGrid}>
                            <div className={styles.resultItem}>
                                <span className={styles.resultLabel}>Area</span>
                                <span className={styles.resultValue}>{result.area}</span>
                            </div>
                            {result.perimeter && (
                                <div className={styles.resultItem}>
                                    <span className={styles.resultLabel}>Perimeter</span>
                                    <span className={styles.resultValue}>{result.perimeter}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TriangleCalculator
