import React, { useState, useEffect } from 'react';
import styles from './ConversionCalculator.module.scss';

const ConversionCalculator = () => {
    const [category, setCategory] = useState('length');
    const [fromUnit, setFromUnit] = useState('meter');
    const [toUnit, setToUnit] = useState('feet');
    const [inputValue, setInputValue] = useState(1);
    const [outputValue, setOutputValue] = useState('');

    const categories = {
        length: {
            units: ['meter', 'kilometer', 'centimeter', 'millimeter', 'mile', 'yard', 'feet', 'inch'],
            rates: { // base is meter
                meter: 1,
                kilometer: 0.001,
                centimeter: 100,
                millimeter: 1000,
                mile: 0.000621371,
                yard: 1.09361,
                feet: 3.28084,
                inch: 39.3701
            }
        },
        weight: {
            units: ['kilogram', 'gram', 'milligram', 'pound', 'ounce'],
            rates: { // base is kilogram
                kilogram: 1,
                gram: 1000,
                milligram: 1000000,
                pound: 2.20462,
                ounce: 35.274
            }
        },
        temperature: {
            units: ['celsius', 'fahrenheit', 'kelvin']
            // Temperature logic is custom
        }
    };

    const convert = () => {
        let result = 0;
        const val = parseFloat(inputValue);

        if (isNaN(val)) {
            setOutputValue('');
            return;
        }

        if (category === 'temperature') {
            if (fromUnit === toUnit) {
                result = val;
            } else if (fromUnit === 'celsius') {
                if (toUnit === 'fahrenheit') result = (val * 9 / 5) + 32;
                if (toUnit === 'kelvin') result = val + 273.15;
            } else if (fromUnit === 'fahrenheit') {
                if (toUnit === 'celsius') result = (val - 32) * 5 / 9;
                if (toUnit === 'kelvin') result = (val - 32) * 5 / 9 + 273.15;
            } else if (fromUnit === 'kelvin') {
                if (toUnit === 'celsius') result = val - 273.15;
                if (toUnit === 'fahrenheit') result = (val - 273.15) * 9 / 5 + 32;
            }
        } else {
            const rates = categories[category].rates;
            const baseValue = val / rates[fromUnit];
            result = baseValue * rates[toUnit];
        }

        // Format result to avoid long decimals but keep precision
        setOutputValue(parseFloat(result.toFixed(6)).toString());
    };

    useEffect(() => {
        convert();
    }, [inputValue, fromUnit, toUnit, category]);

    const handleCategoryChange = (e) => {
        const newCat = e.target.value;
        setCategory(newCat);
        setFromUnit(categories[newCat].units[0]);
        setToUnit(categories[newCat].units[1] || categories[newCat].units[0]);
    };

    return (
        <div className={styles.conversionCalculatorContainer}>
            <div className={styles.conversionCalculator}>
                <div className={styles.header}>
                    <h2>Unit Converter</h2>
                    <p>Fast and accurate unit conversion across multiple categories</p>
                </div>

                <div className={styles.inputGroup}>
                    <label>Category</label>
                    <select
                        value={category}
                        onChange={handleCategoryChange}
                    >
                        <option value="length">Length</option>
                        <option value="weight">Weight</option>
                        <option value="temperature">Temperature</option>
                    </select>
                </div>

                <div className={styles.conversionGrid}>
                    <div className={styles.unitBox}>
                        <label>From</label>
                        <input
                            type="number"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <select
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value)}
                        >
                            {categories[category].units.map(u => (
                                <option key={u} value={u}>{u.charAt(0).toUpperCase() + u.slice(1)}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.unitBox}>
                        <label>To</label>
                        <input
                            type="text"
                            value={outputValue}
                            readOnly
                            className={styles.readonlyInput}
                        />
                        <select
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value)}
                        >
                            {categories[category].units.map(u => (
                                <option key={u} value={u}>{u.charAt(0).toUpperCase() + u.slice(1)}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={styles.summary}>
                    {inputValue} {fromUnit} = {outputValue} {toUnit}
                </div>
            </div>
        </div>
    );
};

export default ConversionCalculator;

