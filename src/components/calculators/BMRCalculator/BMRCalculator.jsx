import { useState } from 'react'
import styles from './BMRCalculator.module.scss'

const BMRCalculator = () => {
    const [unitSystem, setUnitSystem] = useState('metric') // 'metric' or 'imperial'
    const [gender, setGender] = useState('male')
    const [age, setAge] = useState('')
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [heightFt, setHeightFt] = useState('')
    const [heightIn, setHeightIn] = useState('')

    const [bmr, setBmr] = useState(null)

    const calculateBMR = () => {
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

            // Convert ipmerial to metric for calculation
            // 1 lb = 0.453592 kg
            weightVal = weightVal * 0.453592

            // 1 ft = 12 in, 1 in = 2.54 cm
            const totalInches = (ft || 0) * 12 + (inch || 0)
            if (totalInches <= 0) {
                alert('Please enter a valid height.')
                return
            }
            heightVal = totalInches * 2.54
        }

        // Mifflin-St Jeor Equation
        let bmrValue = (10 * weightVal) + (6.25 * heightVal) - (5 * ageVal)

        if (gender === 'male') {
            bmrValue += 5
        } else {
            bmrValue -= 161
        }

        setBmr(Math.round(bmrValue))
    }

    const tdeeMultipliers = [
        { label: 'Sedentary (little or no exercise)', value: 1.2 },
        { label: 'Lightly active (1-3 days/week)', value: 1.375 },
        { label: 'Moderately active (3-5 days/week)', value: 1.55 },
        { label: 'Very active (6-7 days/week)', value: 1.725 },
        { label: 'Extra active (physical job or 2x training)', value: 1.9 }
    ]

    return (
        <div className={styles.bmrCalculatorContainer}>
            <div className={styles.bmrCalculator}>
                <div className={styles.header}>
                    <h2>BMR Calculator</h2>
                    <p>Calculate your Basal Metabolic Rate using the Mifflin-St Jeor equation</p>
                </div>

                <div className={styles.controls}>
                    <div className={styles.toggleGroup}>
                        <button
                            className={`${styles.toggleBtn} ${unitSystem === 'metric' ? styles.active : ''}`}
                            onClick={() => {
                                setUnitSystem('metric')
                                setBmr(null)
                            }}
                        >
                            Metric (kg/cm)
                        </button>
                        <button
                            className={`${styles.toggleBtn} ${unitSystem === 'imperial' ? styles.active : ''}`}
                            onClick={() => {
                                setUnitSystem('imperial')
                                setBmr(null)
                            }}
                        >
                            Imperial (lbs/ft)
                        </button>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label>Gender</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
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

                <button className={styles.calculateBtn} onClick={calculateBMR}>
                    Calculate BMR
                </button>

                {bmr && (
                    <div className={styles.resultContainer}>
                        <div className={styles.resultRow}>
                            <div className={styles.resultLabel}>Your BMR</div>
                            <div className={styles.resultValue}>{bmr.toLocaleString()} <span>Calories/day</span></div>
                        </div>

                        <div className={styles.tdeeContainer}>
                            <h3>Daily Calorie Needs based on Activity</h3>
                            {tdeeMultipliers.map((item, index) => (
                                <div key={index} className={styles.tdeeRow}>
                                    <span className={styles.activityLabel}>{item.label}</span>
                                    <span className={styles.activityValue}>{Math.round(bmr * item.value).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BMRCalculator
