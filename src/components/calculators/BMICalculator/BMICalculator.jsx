import { useState } from 'react'
import styles from './BMICalculator.module.scss'

const BMICalculator = () => {
    const [unitSystem, setUnitSystem] = useState('metric') // 'metric' or 'imperial'
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [heightFt, setHeightFt] = useState('')
    const [heightIn, setHeightIn] = useState('')

    const [bmi, setBmi] = useState(null)
    const [category, setCategory] = useState('')

    const calculateBMI = () => {
        let weightVal = parseFloat(weight)
        let heightVal = parseFloat(height)
        let bmiValue = 0

        if (unitSystem === 'metric') {
            if (!weightVal || !heightVal || weightVal <= 0 || heightVal <= 0) {
                alert('Please enter valid positive values for weight and height.')
                return
            }
            // BMI = kg / m^2
            const heightInMeters = heightVal / 100
            bmiValue = weightVal / (heightInMeters * heightInMeters)
        } else {
            const ft = parseFloat(heightFt)
            const inch = parseFloat(heightIn)

            if (!weightVal || weightVal <= 0 || (isNaN(ft) && isNaN(inch))) {
                alert('Please enter valid positive values.')
                return
            }

            // Convert everything to inches
            // 1 ft = 12 in
            const totalInches = (ft || 0) * 12 + (inch || 0)

            if (totalInches <= 0) {
                alert('Please enter a valid height.')
                return
            }

            // BMI = 703 * lbs / in^2
            bmiValue = 703 * weightVal / (totalInches * totalInches)
        }

        const finalBmi = bmiValue.toFixed(1)
        setBmi(finalBmi)
        determineCategory(parseFloat(finalBmi))
    }

    const determineCategory = (bmiVal) => {
        let cat = ''
        if (bmiVal < 18.5) cat = 'Underweight'
        else if (bmiVal < 25) cat = 'Normal weight'
        else if (bmiVal < 30) cat = 'Overweight'
        else cat = 'Obese'
        setCategory(cat)
    }

    return (
        <div className={styles.bmiCalculatorContainer}>
            <div className={styles.bmiCalculator}>
                <div className={styles.header}>
                    <h2>BMI Calculator</h2>
                    <p>Calculate your Body Mass Index</p>
                </div>

                <div className={styles.controls}>
                    <div className={styles.toggleGroup}>
                        <button
                            className={`${styles.toggleBtn} ${unitSystem === 'metric' ? styles.active : ''}`}
                            onClick={() => {
                                setUnitSystem('metric')
                                setBmi(null)
                            }}
                        >
                            Metric (kg/cm)
                        </button>
                        <button
                            className={`${styles.toggleBtn} ${unitSystem === 'imperial' ? styles.active : ''}`}
                            onClick={() => {
                                setUnitSystem('imperial')
                                setBmi(null)
                            }}
                        >
                            Imperial (lbs/ft)
                        </button>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label>Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})</label>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder={unitSystem === 'metric' ? "e.g. 70" : "e.g. 150"}
                    />
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

                <button className={styles.calculateBtn} onClick={calculateBMI}>
                    Calculate BMI
                </button>

                {bmi && (
                    <div className={styles.resultContainer}>
                        <div className={styles.resultRow}>
                            <div className={styles.resultLabel}>Your BMI</div>
                            <div className={styles.resultValue}>{bmi}</div>
                        </div>
                        <div className={styles.categoryBadge} data-category={category}>
                            {category}
                        </div>
                        <div className={styles.scaleContainer}>
                            <div className={styles.scaleRange} style={{ flex: 18.5, background: '#38bdf8' }} title="Underweight"></div>
                            <div className={styles.scaleRange} style={{ flex: 6.5, background: '#4ade80' }} title="Normal"></div>
                            <div className={styles.scaleRange} style={{ flex: 5, background: '#facc15' }} title="Overweight"></div>
                            <div className={styles.scaleRange} style={{ flex: 10, background: '#f87171' }} title="Obese"></div>
                            <div
                                className={styles.indicator}
                                style={{
                                    left: `${Math.min(Math.max((parseFloat(bmi) / 40) * 100, 0), 100)}%`
                                }}
                            ></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BMICalculator
