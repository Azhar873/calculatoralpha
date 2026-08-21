import { useState } from 'react';
import styles from './AgeCalculator.module.scss';

const AgeCalculator = () => {
    const [birthDate, setBirthDate] = useState('');
    const [age, setAge] = useState(null);

    const calculateAge = () => {
        if (!birthDate) return;

        const today = new Date();
        const dob = new Date(birthDate);

        let years = today.getFullYear() - dob.getFullYear();
        let months = today.getMonth() - dob.getMonth();
        let days = today.getDate() - dob.getDate();

        if (days < 0) {
            months--;
            // Get days in previous month
            const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        setAge({ years, months, days });
    };

    const clear = () => {
        setBirthDate('');
        setAge(null);
    };

    return (
        <div className={styles.ageCalculatorContainer}>
            <div className={styles.ageCalculator}>
                <div className={styles.header}>
                    <h2>Age Calculator</h2>
                    <p>Calculate your exact age in years, months, and days</p>
                </div>
                <div className={styles.controls}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="birthDate">Date of Birth</label>
                        <input
                            type="date"
                            id="birthDate"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.buttonGroup}>
                    <button className={styles.clearButton} onClick={clear}>Clear</button>
                    <button className={styles.calculateButton} onClick={calculateAge}>Calculate Age</button>
                </div>

                {age && (
                    <div className={styles.result}>
                        <h3>Your Age</h3>
                        <div className={styles.ageDisplay}>
                            <div><strong>{age.years}</strong> Years</div>
                            <div><strong>{age.months}</strong> Months</div>
                            <div><strong>{age.days}</strong> Days</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AgeCalculator;
