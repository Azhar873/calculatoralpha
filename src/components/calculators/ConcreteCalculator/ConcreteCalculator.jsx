import React, { useState } from 'react';
import styles from './ConcreteCalculator.module.scss';

const ConcreteCalculator = () => {
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [thickness, setThickness] = useState('');
    const [result, setResult] = useState(null);

    const calculateConcrete = () => {
        const l = parseFloat(length);
        const w = parseFloat(width);
        const t = parseFloat(thickness);

        if (isNaN(l) || isNaN(w) || isNaN(t)) {
            alert('Please enter valid numbers for all fields');
            return;
        }

        // Convert thickness to feet
        const thicknessInFeet = t / 12;

        // Calculate cubic feet
        const cubicFeet = l * w * thicknessInFeet;

        // Calculate cubic yards
        const cubicYards = cubicFeet / 27;

        // Bags needed (approximate yields)
        // 80lb bag ~= 0.60 cubic feet
        // 60lb bag ~= 0.45 cubic feet
        const bags80 = Math.ceil(cubicFeet / 0.60);
        const bags60 = Math.ceil(cubicFeet / 0.45);

        setResult({
            cubicFeet: cubicFeet.toFixed(2),
            cubicYards: cubicYards.toFixed(2),
            bags80,
            bags60
        });
    };

    const resetCalculator = () => {
        setLength('');
        setWidth('');
        setThickness('');
        setResult(null);
    };

    return (
        <div className={styles.concreteCalculatorContainer}>
            <div className={styles.concreteCalculator}>
                <div className={styles.header}>
                    <h2>Concrete Calculator</h2>
                    <p>Calculate the volume and number of bags needed for your project</p>
                </div>

                <div className={styles.inputGroup}>
                    <label>Length (feet)</label>
                    <input
                        type="number"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        placeholder="e.g. 10"
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Width (feet)</label>
                    <input
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        placeholder="e.g. 10"
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Thickness (inches)</label>
                    <input
                        type="number"
                        value={thickness}
                        onChange={(e) => setThickness(e.target.value)}
                        placeholder="e.g. 4"
                    />
                </div>

                <div className={styles.buttonGroup}>
                    <button onClick={calculateConcrete} className={styles.calculateBtn}>
                        Calculate
                    </button>
                    <button onClick={resetCalculator} className={styles.resetBtn}>
                        Reset
                    </button>
                </div>

                {result && (
                    <div className={styles.resultContainer}>
                        <h3>Results</h3>
                        <div className={styles.resultGrid}>
                            <div className={styles.resultItem}>
                                <p className={styles.resultLabel}>Cubic Yards</p>
                                <p className={styles.resultValue}>{result.cubicYards} yd³</p>
                            </div>
                            <div className={styles.resultItem}>
                                <p className={styles.resultLabel}>Cubic Feet</p>
                                <p className={styles.resultValue}>{result.cubicFeet} ft³</p>
                            </div>
                            <div className={styles.resultItem + ' ' + styles.highlight}>
                                <p className={styles.resultLabel}>80lb Bags Needed</p>
                                <p className={styles.resultValue}>{result.bags80}</p>
                            </div>
                            <div className={styles.resultItem + ' ' + styles.highlight}>
                                <p className={styles.resultLabel}>60lb Bags Needed</p>
                                <p className={styles.resultValue}>{result.bags60}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConcreteCalculator;

