import { useState, useEffect } from 'react'
import styles from './ScientificCalculator.module.scss'

function ScientificCalculator() {
    const [display, setDisplay] = useState('0')
    const [memory, setMemory] = useState(0)
    const [angleMode, setAngleMode] = useState('deg') // 'deg' or 'rad'
    const [lastAnswer, setLastAnswer] = useState(0)
    const [isResult, setIsResult] = useState(false)
    const [error, setError] = useState(null)
    const [history, setHistory] = useState(() => {
        const savedHistory = localStorage.getItem('calcHistory')
        return savedHistory ? JSON.parse(savedHistory) : []
    })

    // Clear error after 2 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 2000)
            return () => clearTimeout(timer)
        }
    }, [error])

    // Save history to localStorage
    useEffect(() => {
        localStorage.setItem('calcHistory', JSON.stringify(history))
    }, [history])

    const handleNumber = (num) => {
        if (isResult) {
            setDisplay(String(num))
            setIsResult(false)
        } else {
            setDisplay(display === '0' ? String(num) : display + num)
        }
    }

    const handleDecimal = () => {
        if (isResult) {
            setDisplay('0.')
            setIsResult(false)
        } else {
            // Simple check to prevent multiple decimals in the last number segment
            const parts = display.split(/[\+\-\×\÷\^]/)
            const lastPart = parts[parts.length - 1]
            if (!lastPart.includes('.')) {
                setDisplay(display + '.')
            }
        }
    }

    const handleOperator = (op) => {
        if (isResult) {
            setIsResult(false)
        }

        const lastChar = display.slice(-1)
        if (['+', '-', '×', '÷', '^'].includes(lastChar)) {
            setDisplay(display.slice(0, -1) + op)
        } else {
            setDisplay(display + op)
        }
    }

    const handleFunction = (func) => {
        if (isResult) {
            setIsResult(false)
            if (func === 'Ans') {
                setDisplay(String(lastAnswer))
                return
            }
            if (['sin', 'cos', 'tan', 'log', 'ln', '√'].includes(func)) {
                setDisplay(func + '(')
                return
            }
        }

        switch (func) {
            case 'sin':
            case 'cos':
            case 'tan':
            case 'asin':
            case 'acos':
            case 'atan':
            case 'log':
            case 'ln':
                setDisplay(display === '0' ? func + '(' : display + func + '(')
                break
            case '√':
                setDisplay(display === '0' ? '√(' : display + '√(')
                break
            case 'x²':
                setDisplay(display + '^2')
                break
            case 'x³':
                setDisplay(display + '^3')
                break
            case 'xʸ':
                setDisplay(display + '^')
                break
            case 'eˣ':
                setDisplay(display + 'e^')
                break
            case '10ˣ':
                setDisplay(display + '10^')
                break
            case '1/x':
                setDisplay(display + '^(-1)')
                break
            case 'n!':
                setDisplay(display + '!')
                break
            case '%':
                setDisplay(display + '%')
                break
            case 'π':
                setDisplay(display === '0' ? 'π' : display + 'π')
                break
            case 'e':
                setDisplay(display === '0' ? 'e' : display + 'e')
                break
            case 'Ans':
                setDisplay(display === '0' ? 'Ans' : display + 'Ans')
                break
            case 'EXP':
                setDisplay(display + 'E')
                break
            case 'RND':
                setDisplay(display === '0' ? String(Math.random().toFixed(4)) : display + Math.random().toFixed(4))
                break
            case '(':
            case ')':
                setDisplay(display === '0' ? func : display + func)
                break
            case '±':
                let str = display
                if (str.endsWith(')')) {
                    const match = str.match(/\(-(\d+\.?\d*)\)$/)
                    if (match) {
                        setDisplay(str.slice(0, match.index) + match[1])
                        return
                    }
                }

                const matchNum = str.match(/(\d+\.?\d*)$/)
                if (matchNum) {
                    const num = matchNum[1]
                    const index = matchNum.index
                    setDisplay(str.slice(0, index) + `(-${num})`)
                }
                break
            default:
                break
        }
    }

    const handleClear = () => {
        setDisplay('0')
        setIsResult(false)
        setError(null)
    }

    const handleBack = () => {
        if (isResult) {
            setDisplay('0')
            setIsResult(false)
        } else {
            if (display.length > 1) {
                setDisplay(display.slice(0, -1))
            } else {
                setDisplay('0')
            }
        }
    }

    const clearHistory = () => {
        setHistory([])
    }

    const loadHistoryItem = (item) => {
        setDisplay(item.result)
        setIsResult(true)
    }

    const factorial = (n) => {
        if (n < 0) return NaN
        if (n === 0 || n === 1) return 1
        if (n > 170) return Infinity
        let result = 1
        for (let i = 2; i <= n; i++) result *= i
        return result
    }

    const evaluate = () => {
        try {
            let expr = display

            const openParens = (expr.match(/\(/g) || []).length
            const closeParens = (expr.match(/\)/g) || []).length
            if (openParens > closeParens) {
                expr += ')'.repeat(openParens - closeParens)
            }

            expr = expr.replace(/π/g, 'Math.PI')
            expr = expr.replace(/e/g, 'Math.E')
            expr = expr.replace(/Ans/g, lastAnswer)
            expr = expr.replace(/(\d+)!/g, 'factorial($1)')
            expr = expr.replace(/%/g, '/100')

            const toRad = angleMode === 'deg' ? `*(Math.PI/180)` : ''
            const fromRad = angleMode === 'deg' ? `*(180/Math.PI)` : ''

            expr = expr.replace(/×/g, '*')
            expr = expr.replace(/÷/g, '/')
            expr = expr.replace(/\^/g, '**')
            expr = expr.replace(/√\(/g, 'Math.sqrt(')
            expr = expr.replace(/E/g, '*10**')
            expr = expr.replace(/log\(/g, 'Math.log10(')
            expr = expr.replace(/ln\(/g, 'Math.log(')

            const scope = {
                sin: (x) => Math.sin(angleMode === 'deg' ? x * Math.PI / 180 : x),
                cos: (x) => Math.cos(angleMode === 'deg' ? x * Math.PI / 180 : x),
                tan: (x) => Math.tan(angleMode === 'deg' ? x * Math.PI / 180 : x),
                asin: (x) => (angleMode === 'deg' ? Math.asin(x) * 180 / Math.PI : Math.asin(x)),
                acos: (x) => (angleMode === 'deg' ? Math.acos(x) * 180 / Math.PI : Math.acos(x)),
                atan: (x) => (angleMode === 'deg' ? Math.atan(x) * 180 / Math.PI : Math.atan(x)),
                factorial: factorial,
                Math: Math
            }

            const keys = Object.keys(scope)
            const values = Object.values(scope)

            const func = new Function(...keys, `return ${expr}`)
            const result = func(...values)

            if (!isFinite(result) || isNaN(result)) {
                throw new Error('Invalid Result')
            }

            const formatted = parseFloat(result.toPrecision(12)).toString()

            setLastAnswer(parseFloat(formatted))
            setDisplay(formatted)
            setIsResult(true)

            const newHistoryItem = {
                expression: display,
                result: formatted,
                timestamp: Date.now()
            }
            setHistory(prev => [newHistoryItem, ...prev].slice(0, 50))

        } catch (err) {
            console.error(err)
            setError('Error')
            setIsResult(true)
        }
    }

    const handleMemory = (action) => {
        const current = parseFloat(display)
        if (isNaN(current)) return

        switch (action) {
            case 'MC': setMemory(0); break
            case 'MR':
                if (isResult) {
                    setDisplay(String(memory))
                    setIsResult(false)
                } else {
                    setDisplay(display === '0' ? String(memory) : display + memory)
                }
                break
            case 'M+': setMemory(memory + current); break
            case 'M-': setMemory(memory - current); break
        }
    }

    return (
        <div className={styles.scientificCalculatorContainer}>
            <div className={styles.scientificCalculatorSimple}>
                <div className={styles.calculatorHeader}>
                    <h2>Scientific Calculator</h2>
                    <p className={styles.calculatorDescription}>Standard scientific functions and operations</p>
                </div>
                <div className={styles.calculatorBody}>
                    <div className={styles.calculatorDisplaySimple}>
                        {error && <div className={styles.errorMessage}>{error}</div>}
                        <div className={styles.resultDisplay}>{display}</div>
                    </div>

                    <div className={styles.angleMode}>
                        <label>
                            <input
                                type="radio"
                                name="angleMode"
                                value="deg"
                                checked={angleMode === 'deg'}
                                onChange={() => setAngleMode('deg')}
                            />
                            Deg
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="angleMode"
                                value="rad"
                                checked={angleMode === 'rad'}
                                onChange={() => setAngleMode('rad')}
                            />
                            Rad
                        </label>
                    </div>

                    <div className={styles.calculatorButtonsSimple}>
                        {/* Row 1 - Trig functions */}
                        <button className={`${styles.btnSimple} ${styles.btnFunctionSimple}`} onClick={() => handleFunction('sin')}>sin</button>
                        <button className={`${styles.btnSimple} ${styles.btnFunctionSimple}`} onClick={() => handleFunction('cos')}>cos</button>
                        <button className={`${styles.btnSimple} ${styles.btnFunctionSimple}`} onClick={() => handleFunction('tan')}>tan</button>
                        <div className={styles.spacer}></div>
                        <div className={styles.spacer}></div>

                        {/* Row 2 - Inverse trig + constants */}
                        <button className={`${styles.btnSimple} ${styles.btnFunctionSimple}`} onClick={() => handleFunction('asin')}>sin⁻¹</button>
                        <button className={`${styles.btnSimple} ${styles.btnFunctionSimple}`} onClick={() => handleFunction('acos')}>cos⁻¹</button>
                        <button className={`${styles.btnSimple} ${styles.btnFunctionSimple}`} onClick={() => handleFunction('atan')}>tan⁻¹</button>
                        <button className={`${styles.btnSimple} ${styles.btnFunctionSimple}`} onClick={() => handleFunction('π')}>π</button>
                        <button className={`${styles.btnSimple} ${styles.btnFunctionSimple}`} onClick={() => handleFunction('e')}>e</button>

                        {/* Row 3 - Powers */}
                        <button className={`${styles.btnSimple} ${styles.btnFunctionSimple}`} onClick={() => handleFunction('xʸ')}>x<sup>y</sup></button>
                        <button className={`${styles.btnSimple} ${styles.btnFunctionSimple}`} onClick={() => handleFunction('x³')}>x³</button>
                        <button className={`${styles.btnSimple} ${styles.btnFunctionSimple}`} onClick={() => handleFunction('x²')}>x²</button>
                        <button className={`${styles.btnSimple} ${styles.btnFunctionSimple}`} onClick={() => handleFunction('eˣ')}>e<sup>x</sup></button>
                        <button className={`${styles.btnSimple} ${styles.btnFunctionSimple}`} onClick={() => handleFunction('10ˣ')}>10<sup>x</sup></button>

                        {/* Row 4 - Roots */}
                        <button className={`${styles.btnSimple} ${styles.btnFunctionSimple}`} onClick={() => handleOperator('^ (1/')}><sup>y</sup>√x</button>
                        <button className={`${styles.btnSimple} ${styles.btnFunctionSimple}`} onClick={() => handleFunction('cbrt')}>³√x</button>
                        <button className={`${styles.btnSimple} ${styles.btnFunctionSimple}`} onClick={() => handleFunction('√')}>√x</button>
                        <button className={`${styles.btnSimple} ${styles.btnFunctionSimple}`} onClick={() => handleFunction('ln')}>ln</button>
                        <button className={`${styles.btnSimple} ${styles.btnFunctionSimple}`} onClick={() => handleFunction('log')}>log</button>

                        {/* Row 5 - Parentheses and special */}
                        <button className={`${styles.btnSimple} ${styles.btnFunctionSimple}`} onClick={() => handleFunction('(')}>(</button>
                        <button className={`${styles.btnSimple} ${styles.btnFunctionSimple}`} onClick={() => handleFunction(')')}>)</button>
                        <button className={`${styles.btnSimple} ${styles.btnFunctionSimple}`} onClick={() => handleFunction('1/x')}>1/x</button>
                        <button className={`${styles.btnSimple} ${styles.btnFunctionSimple}`} onClick={() => handleFunction('%')}>%</button>
                        <button className={`${styles.btnSimple} ${styles.btnFunctionSimple}`} onClick={() => handleFunction('n!')}>n!</button>

                        {/* Row 6 - Numbers 7-9 and operators */}
                        <button className={`${styles.btnSimple} ${styles.btnNumberSimple}`} onClick={() => handleNumber(7)}>7</button>
                        <button className={`${styles.btnSimple} ${styles.btnNumberSimple}`} onClick={() => handleNumber(8)}>8</button>
                        <button className={`${styles.btnSimple} ${styles.btnNumberSimple}`} onClick={() => handleNumber(9)}>9</button>
                        <button className={`${styles.btnSimple} ${styles.btnOperatorSimple}`} onClick={() => handleOperator('+')}>+</button>
                        <button className={`${styles.btnSimple} ${styles.btnSpecialSimple}`} onClick={handleBack}>Back</button>

                        {/* Row 7 - Numbers 4-6 */}
                        <button className={`${styles.btnSimple} ${styles.btnNumberSimple}`} onClick={() => handleNumber(4)}>4</button>
                        <button className={`${styles.btnSimple} ${styles.btnNumberSimple}`} onClick={() => handleNumber(5)}>5</button>
                        <button className={`${styles.btnSimple} ${styles.btnNumberSimple}`} onClick={() => handleNumber(6)}>6</button>
                        <button className={`${styles.btnSimple} ${styles.btnOperatorSimple}`} onClick={() => handleOperator('-')}>-</button>
                        <button className={`${styles.btnSimple} ${styles.btnSpecialSimple}`} onClick={() => handleFunction('Ans')}>Ans</button>

                        {/* Row 8 - Numbers 1-3 */}
                        <button className={`${styles.btnSimple} ${styles.btnNumberSimple}`} onClick={() => handleNumber(1)}>1</button>
                        <button className={`${styles.btnSimple} ${styles.btnNumberSimple}`} onClick={() => handleNumber(2)}>2</button>
                        <button className={`${styles.btnSimple} ${styles.btnNumberSimple}`} onClick={() => handleNumber(3)}>3</button>
                        <button className={`${styles.btnSimple} ${styles.btnOperatorSimple}`} onClick={() => handleOperator('×')}>×</button>
                        <button className={`${styles.btnSimple} ${styles.btnMemorySimple}`} onClick={() => handleMemory('M+')}>M+</button>

                        {/* Row 9 - Zero and decimal */}
                        <button className={`${styles.btnSimple} ${styles.btnNumberSimple}`} onClick={() => handleNumber(0)}>0</button>
                        <button className={`${styles.btnSimple} ${styles.btnNumberSimple}`} onClick={handleDecimal}>.</button>
                        <button className={`${styles.btnSimple} ${styles.btnFunctionSimple}`} onClick={() => handleFunction('EXP')}>EXP</button>
                        <button className={`${styles.btnSimple} ${styles.btnOperatorSimple}`} onClick={() => handleOperator('÷')}>÷</button>
                        <button className={`${styles.btnSimple} ${styles.btnMemorySimple}`} onClick={() => handleMemory('M-')}>M-</button>

                        {/* Row 10 - Bottom row */}
                        <button className={`${styles.btnSimple} ${styles.btnFunctionSimple}`} onClick={() => handleFunction('±')}>±</button>
                        <button className={`${styles.btnSimple} ${styles.btnFunctionSimple}`} onClick={() => handleFunction('RND')}>RND</button>
                        <button className={`${styles.btnSimple} ${styles.btnClearSimple}`} onClick={handleClear}>AC</button>
                        <button className={`${styles.btnSimple} ${styles.btnEqualsSimple}`} onClick={evaluate}>=</button>
                        <button className={`${styles.btnSimple} ${styles.btnMemorySimple}`} onClick={() => handleMemory('MR')}>MR</button>
                    </div>
                </div>
            </div>

            <div className={styles.calculatorHistory}>
                <div className={styles.historyHeader}>
                    <h3>History</h3>
                    <button className={styles.clearHistoryBtn} onClick={clearHistory}>Clear</button>
                </div>
                <div className={styles.historyList}>
                    {history.length === 0 ? (
                        <p className={styles.noHistory}>No calculations yet</p>
                    ) : (
                        history.map((item, index) => (
                            <div key={index} className={styles.historyItem} onClick={() => loadHistoryItem(item)}>
                                <div className={styles.historyExpression}>{item.expression} =</div>
                                <div className={styles.historyResult}>{item.result}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default ScientificCalculator
