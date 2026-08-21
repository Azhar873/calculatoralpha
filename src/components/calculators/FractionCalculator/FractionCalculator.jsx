import { useState, useEffect } from 'react'
import styles from './FractionCalculator.module.scss'

function FractionCalculator() {
    const [fraction1, setFraction1] = useState({ num: '', den: '' })
    const [fraction2, setFraction2] = useState({ num: '', den: '' })
    const [operation, setOperation] = useState('+')
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)

    const gcd = (a, b) => {
        return b === 0 ? a : gcd(b, a % b)
    }

    const simplify = (num, den) => {
        if (den === 0) return null
        const common = gcd(Math.abs(num), Math.abs(den))
        let n = num / common
        let d = den / common
        if (d < 0) {
            n = -n
            d = -d
        }
        return { num: n, den: d }
    }

    const calculate = () => {
        setError(null)
        const n1 = parseInt(fraction1.num)
        const d1 = parseInt(fraction1.den)
        const n2 = parseInt(fraction2.num)
        const d2 = parseInt(fraction2.den)

        if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2)) {
            setError('Please enter valid numbers for both fractions.')
            return
        }

        if (d1 === 0 || d2 === 0) {
            setError('Denominator cannot be zero.')
            return
        }

        let resNum, resDen

        switch (operation) {
            case '+':
                resNum = n1 * d2 + n2 * d1
                resDen = d1 * d2
                break
            case '-':
                resNum = n1 * d2 - n2 * d1
                resDen = d1 * d2
                break
            case '*':
                resNum = n1 * n2
                resDen = d1 * d2
                break
            case '/':
                if (n2 === 0) {
                    setError('Cannot divide by zero.')
                    return
                }
                resNum = n1 * d2
                resDen = d1 * n2
                break
            default:
                return
        }

        const simplified = simplify(resNum, resDen)
        setResult(simplified)
    }

    const handleClear = () => {
        setFraction1({ num: '', den: '' })
        setFraction2({ num: '', den: '' })
        setOperation('+')
        setResult(null)
        setError(null)
    }

    return (
        <div className={styles.fractionCalculator}>
            <div className={styles.calculatorCard}>
                <h2>Fraction Calculator</h2>
                <div className={styles.inputSection}>
                    <div className={styles.fractionInput}>
                        <input
                            type="number"
                            placeholder="Num"
                            value={fraction1.num}
                            onChange={(e) => setFraction1({ ...fraction1, num: e.target.value })}
                        />
                        <div className={styles.divider}></div>
                        <input
                            type="number"
                            placeholder="Den"
                            value={fraction1.den}
                            onChange={(e) => setFraction1({ ...fraction1, den: e.target.value })}
                        />
                    </div>

                    <div className={styles.operatorSelect}>
                        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
                            <option value="+">+</option>
                            <option value="-">-</option>
                            <option value="*">×</option>
                            <option value="/">÷</option>
                        </select>
                    </div>

                    <div className={styles.fractionInput}>
                        <input
                            type="number"
                            placeholder="Num"
                            value={fraction2.num}
                            onChange={(e) => setFraction2({ ...fraction2, num: e.target.value })}
                        />
                        <div className={styles.divider}></div>
                        <input
                            type="number"
                            placeholder="Den"
                            value={fraction2.den}
                            onChange={(e) => setFraction2({ ...fraction2, den: e.target.value })}
                        />
                    </div>
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
                            <div className={styles.fractionResult}>
                                <span className={styles.resultNum}>{result.num}</span>
                                <span className={styles.resultDivider}></span>
                                <span className={styles.resultDen}>{result.den}</span>
                            </div>
                            {result.den !== 1 && (
                                <div className={styles.decimalResult}>
                                    = {(result.num / result.den).toFixed(4)}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FractionCalculator
