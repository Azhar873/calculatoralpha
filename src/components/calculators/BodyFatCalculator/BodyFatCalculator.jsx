import { useState } from 'react'
import styles from './BodyFatCalculator.module.scss'

const BodyFatCalculator = () => {
    const [unitSystem, setUnitSystem] = useState('metric') // 'metric' or 'imperial'
    const [gender, setGender] = useState('male')
    const [age, setAge] = useState('')
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [heightFt, setHeightFt] = useState('')
    const [heightIn, setHeightIn] = useState('')
    const [neck, setNeck] = useState('')
    const [waist, setWaist] = useState('')
    const [hip, setHip] = useState('')

    const [result, setResult] = useState(null)

    const calculateBodyFat = () => {
        let weightVal = parseFloat(weight)
        let heightVal = parseFloat(height)
        let neckVal = parseFloat(neck)
        let waistVal = parseFloat(waist)
        let hipVal = parseFloat(hip)
        const ageVal = parseFloat(age)

        if (!ageVal || ageVal <= 0) {
            alert('Please enter a valid age.')
            return
        }

        if (unitSystem === 'metric') {
            if (!weightVal || !heightVal || !neckVal || !waistVal || (gender === 'female' && !hipVal)) {
                alert('Please enter valid positive values for all fields.')
                return
            }
            if (weightVal <= 0 || heightVal <= 0 || neckVal <= 0 || waistVal <= 0 || (gender === 'female' && hipVal <= 0)) {
                alert('Please enter valid positive values.')
                return
            }
        } else {
            const ft = parseFloat(heightFt)
            const inch = parseFloat(heightIn)
            // Check if fields are filled
            if (!weightVal || (isNaN(ft) && isNaN(inch)) || !neckVal || !waistVal || (gender === 'female' && !hipVal)) {
                alert('Please enter valid positive values for all fields.')
                return
            }

            // Convert to metric for calculation logic consistency or use imperial formula directly
            // Let's use the standard Navy Method which often uses specific formulas.
            // Actually, it's safer to convert everything to CM for the standard formulas to avoid coefficient errors.

            // 1 inch = 2.54 cm
            // 1 lb = 0.453592 kg (Note: Weight isn't used in the standard Navy BF% formula, but often collected)

            const totalHeightInches = (ft || 0) * 12 + (inch || 0)
            if (totalHeightInches <= 0) {
                alert('Please enter a valid height.')
                return
            }

            heightVal = totalHeightInches * 2.54
            neckVal = neckVal * 2.54
            waistVal = waistVal * 2.54
            hipVal = hipVal * 2.54
        }

        // Validation for measurements
        // Waist must be larger than neck (usually)
        if (waistVal <= neckVal) {
            // This might be biologically possible but unusual for the formula logic which uses log(waist - neck)
            // Actually, for men it is waist - neck. If waist <= neck, log is undefined/NaN.
            if (gender === 'male') {
                alert('Waist measurement must be larger than neck measurement.')
                return
            }
        }

        if (gender === 'female') {
            // Formula: 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
            if ((waistVal + hipVal - neckVal) <= 0) {
                alert('Invalid measurements provided.')
                return
            }
        }


        let bodyFatPercentage = 0

        if (gender === 'male') {
            // Formula: 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
            const logWaistNeck = Math.log10(waistVal - neckVal)
            const logHeight = Math.log10(heightVal)
            bodyFatPercentage = 495 / (1.0324 - 0.19077 * logWaistNeck + 0.15456 * logHeight) - 450
        } else {
            // Formula: 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
            const logWaistHipNeck = Math.log10(waistVal + hipVal - neckVal)
            const logHeight = Math.log10(heightVal)
            bodyFatPercentage = 495 / (1.29579 - 0.35004 * logWaistHipNeck + 0.22100 * logHeight) - 450
        }

        // Determine Category
        let category = ''
        const bf = bodyFatPercentage

        if (gender === 'male') {
            if (bf < 6) category = 'Essential Fat'
            else if (bf < 14) category = 'Athletes'
            else if (bf < 18) category = 'Fitness'
            else if (bf < 25) category = 'Average'
            else category = 'Obese'
        } else {
            if (bf < 14) category = 'Essential Fat'
            else if (bf < 21) category = 'Athletes'
            else if (bf < 25) category = 'Fitness'
            else if (bf < 32) category = 'Average'
            else category = 'Obese'
        }

        setResult({
            percentage: bodyFatPercentage.toFixed(1),
            category: category
        })
    }

    return (
        <div className={styles.bodyFatCalculatorContainer}>
            <div className={styles.bodyFatCalculator}>
                <div className={styles.header}>
                    <h2>Body Fat Calculator</h2>
                    <p>Estimate your body fat percentage using the U.S. Navy Method</p>
                </div>

                <div className={styles.controls}>
                    <div className={styles.toggleGroup}>
                        <button
                            className={`${styles.toggleBtn} ${unitSystem === 'metric' ? styles.active : ''}`}
                            onClick={() => {
                                setUnitSystem('metric')
                                setResult(null)
                            }}
                        >
                            Metric (kg/cm)
                        </button>
                        <button
                            className={`${styles.toggleBtn} ${unitSystem === 'imperial' ? styles.active : ''}`}
                            onClick={() => {
                                setUnitSystem('imperial')
                                setResult(null)
                            }}
                        >
                            Imperial (lbs/in)
                        </button>
                    </div>
                </div>

                <div className={styles.radioGroup}>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={gender === 'male'}
                            onChange={(e) => {
                                setGender(e.target.value)
                                setResult(null)
                            }}
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={gender === 'female'}
                            onChange={(e) => {
                                setGender(e.target.value)
                                setResult(null)
                            }}
                        />
                        Female
                    </label>
                </div>

                <div className={styles.inputGroup}>
                    <label>Age</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="e.g. 30"
                    />
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
                    <>
                        <div className={styles.inputGroup}>
                            <label>Height (cm)</label>
                            <input
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                placeholder="e.g. 175"
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Neck (cm)</label>
                            <input
                                type="number"
                                value={neck}
                                onChange={(e) => setNeck(e.target.value)}
                                placeholder="e.g. 38"
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Waist (cm)</label>
                            <input
                                type="number"
                                value={waist}
                                onChange={(e) => setWaist(e.target.value)}
                                placeholder="e.g. 85"
                            />
                        </div>
                        {gender === 'female' && (
                            <div className={styles.inputGroup}>
                                <label>Hip (cm)</label>
                                <input
                                    type="number"
                                    value={hip}
                                    onChange={(e) => setHip(e.target.value)}
                                    placeholder="e.g. 95"
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <>
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
                        <div className={styles.inputGroup}>
                            <label>Neck (in)</label>
                            <input
                                type="number"
                                value={neck}
                                onChange={(e) => setNeck(e.target.value)}
                                placeholder="e.g. 15"
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Waist (in)</label>
                            <input
                                type="number"
                                value={waist}
                                onChange={(e) => setWaist(e.target.value)}
                                placeholder="e.g. 34"
                            />
                        </div>
                        {gender === 'female' && (
                            <div className={styles.inputGroup}>
                                <label>Hip (in)</label>
                                <input
                                    type="number"
                                    value={hip}
                                    onChange={(e) => setHip(e.target.value)}
                                    placeholder="e.g. 38"
                                />
                            </div>
                        )}
                    </>
                )}

                <button className={styles.calculateBtn} onClick={calculateBodyFat}>
                    Calculate Body Fat
                </button>

                {result && (
                    <div className={styles.resultContainer}>
                        <div className={styles.resultHeading}>Body Fat Percentage</div>
                        <div className={styles.mainResult}>
                            <span className={styles.resultValue}>{result.percentage}</span>
                            <span className={styles.resultUnit}>%</span>
                        </div>

                        <div className={styles.categoryResult}>
                            <span className={styles.categoryLabel}>Category:</span>
                            <span className={styles.categoryValue}>{result.category}</span>
                        </div>

                        <div style={{ marginTop: '16px', fontSize: '12px', color: '#64748b' }}>
                            Based on U.S. Navy Method
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BodyFatCalculator
