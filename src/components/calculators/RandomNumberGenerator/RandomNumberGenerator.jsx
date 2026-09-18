import React, { useState } from 'react';
import styles from './RandomNumberGenerator.module.scss';

const RandomNumberGenerator = () => {
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(100);
    const [quantity, setQuantity] = useState(1);
    const [results, setResults] = useState([]);

    const generateNumbers = () => {
        const newNumbers = [];
        const minValue = parseInt(min);
        const maxValue = parseInt(max);
        const qty = Math.min(Math.max(1, parseInt(quantity)), 100); // Limit quantity to 100

        if (isNaN(minValue) || isNaN(maxValue) || isNaN(qty)) return;

        if (minValue > maxValue) {
            alert('Minimum value cannot be greater than maximum value');
            return;
        }

        for (let i = 0; i < qty; i++) {
            const random = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
            newNumbers.push(random);
        }

        setResults(newNumbers);
    };

    return (
        <div className={styles.Numbercontainer}>
            <div className={styles.container}>
                <h2>Random Number Generator</h2>

                <div className={styles.controls}>
                    <div className={styles.inputGroup}>
                        <label>Minimum Value</label>
                        <input
                            type="number"
                            value={min}
                            onChange={(e) => setMin(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Maximum Value</label>
                        <input
                            type="number"
                            value={max}
                            onChange={(e) => setMax(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Quantity</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            min="1"
                            max="100"
                        />
                    </div>
                </div>

                <button className={styles.generateBtn} onClick={generateNumbers}>
                    Generate Numbers
                </button>

                {results.length > 0 && (
                    <div className={styles.results}>
                        <h3>Results:</h3>
                        <div className={styles.numbersGrid}>
                            {results.map((num, index) => (
                                <div key={index} className={styles.number}>
                                    {num}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RandomNumberGenerator;
