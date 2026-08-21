import { useState } from 'react'
import styles from './CalorieCalculator.module.scss'

const CalorieCalculator = () => {
    const [unitSystem, setUnitSystem] = useState('metric') // 'metric' or 'imperial'
    const [gender, setGender] = useState('male')
    const [age, setAge] = useState('')
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [heightFt, setHeightFt] = useState('')
    const [heightIn, setHeightIn] = useState('')
    const [activityLevel, setActivityLevel] = useState('1.2')

    const [result, setResult] = useState(null)

    const calculateCalories = () => {
        let weightVal = parseFloat(weight)
        let heightVal = parseFloat(height)
        let ageVal = parseFloat(age)

        if (!ageVal || ageVal <= 0) {
            alert('Please enter a valid age.')
            return
        }

        if (unitSystem === 'metric') {
            if (!weightVal || !heightVal || weightVal <= 0 || heightVal <= 0) {
                alert('Please enter valid positive values for weight and height.')
                return
            }
        } else {
            const ft = parseFloat(heightFt)
            const inch = parseFloat(heightIn)

            if (!weightVal || weightVal <= 0 || (isNaN(ft) && isNaN(inch))) {
                alert('Please enter valid positive values.')
                return
            }

            // Convert everything to metric for calculation
            // 1 lb = 0.453592 kg
            weightVal = weightVal * 0.453592

            // 1 ft = 30.48 cm, 1 in = 2.54 cm
            const totalInches = (ft || 0) * 12 + (inch || 0)
            if (totalInches <= 0) {
                alert('Please enter a valid height.')
                return
            }
            heightVal = totalInches * 2.54
        }

        // Mifflin-St Jeor Equation
        // Men: 10W + 6.25H - 5A + 5
        // Women: 10W + 6.25H - 5A - 161
        // W in kg, H in cm, A in years

        let bmr = (10 * weightVal) + (6.25 * heightVal) - (5 * ageVal)

        if (gender === 'male') {
            bmr += 5
        } else {
            bmr -= 161
        }

        const tdee = bmr * parseFloat(activityLevel)

        setResult({
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
            loss: Math.round(tdee - 500),
            gain: Math.round(tdee + 500)
        })
    }

    return (
        <div className={styles.calorieCalculatorContainer}>
            <div className={styles.calorieCalculator}>
                <div className={styles.header}>
                    <h2>Calorie Calculator</h2>
                    <p>Calculate your daily calorie needs (TDEE)</p>
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
                            Imperial (lbs/ft)
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
                            onChange={(e) => setGender(e.target.value)}
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={gender === 'female'}
                            onChange={(e) => setGender(e.target.value)}
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

                <div className={styles.inputGroup}>
                    <label>Activity Level</label>
                    <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
                        <option value="1.2">Sedentary (little or no exercise)</option>
                        <option value="1.375">Lightly active (exercise 1-3 days/week)</option>
                        <option value="1.55">Moderately active (exercise 3-5 days/week)</option>
                        <option value="1.725">Very active (exercise 6-7 days/week)</option>
                        <option value="1.9">Extra active (very hard exercise/job)</option>
                    </select>
                </div>

                <button className={styles.calculateBtn} onClick={calculateCalories}>
                    Calculate Calories
                </button>

                {result && (
                    <div className={styles.resultContainer}>
                        <div className={styles.resultHeading}>Maintain Weight</div>
                        <div className={styles.mainResult}>
                            <span className={styles.resultValue}>{result.tdee}</span>
                            <span className={styles.resultUnit}>kcal/day</span>
                        </div>

                        <table className={styles.breakdownTable}>
                            <thead>
                                <tr>
                                    <th>Goal</th>
                                    <th>Calories/Day</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Maintain Weight</td>
                                    <td>{result.tdee}</td>
                                </tr>
                                <tr>
                                    <td>Weight Loss (-0.5kg/week)</td>
                                    <td>{result.loss}</td>
                                </tr>
                                <tr>
                                    <td>Weight Gain (+0.5kg/week)</td>
                                    <td>{result.gain}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div style={{ marginTop: '16px', fontSize: '12px', color: '#64748b' }}>
                            Based on Mifflin-St Jeor Equation
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CalorieCalculator
