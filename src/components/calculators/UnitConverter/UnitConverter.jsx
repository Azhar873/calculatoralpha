import { useEffect, useState } from 'react';
import styles from './UnitConverter.module.scss';

const CATEGORIES = {
  pressure: {
    label: 'Pressure',
    units: {
      psi: { label: 'PSI', rate: 14.5038 },
      bar: { label: 'Bar', rate: 1 },
    },
    defaults: ['psi', 'bar'],
  },
  length: {
    label: 'Length',
    units: {
      millimeter: { label: 'Millimeter (mm)', rate: 1000 },
      inch: { label: 'Inch (in)', rate: 39.3701 },
    },
    defaults: ['millimeter', 'inch'],
  },
  volume: {
    label: 'Volume',
    units: {
      gallon: { label: 'US Gallon (gal)', rate: 0.264172 },
      liter: { label: 'Liter (L)', rate: 1 },
    },
    defaults: ['gallon', 'liter'],
  },
};

const UnitConverter = () => {
  const [category, setCategory] = useState('pressure');
  const [fromUnit, setFromUnit] = useState('psi');
  const [toUnit, setToUnit] = useState('bar');
  const [inputValue, setInputValue] = useState('1');
  const [outputValue, setOutputValue] = useState('');

  useEffect(() => {
    const value = parseFloat(inputValue);
    if (Number.isNaN(value)) {
      setOutputValue('');
      return;
    }

    const units = CATEGORIES[category].units;
    const baseValue = value / units[fromUnit].rate;
    const result = baseValue * units[toUnit].rate;
    setOutputValue(parseFloat(result.toFixed(6)).toString());
  }, [category, fromUnit, inputValue, toUnit]);

  const handleCategoryChange = (event) => {
    const nextCategory = event.target.value;
    const [nextFromUnit, nextToUnit] = CATEGORIES[nextCategory].defaults;
    setCategory(nextCategory);
    setFromUnit(nextFromUnit);
    setToUnit(nextToUnit);
  };

  const units = CATEGORIES[category].units;

  return (
    <div className={styles.unitConverter}>
      <div className={styles.header}>
        <h2>Unit Converter</h2>
        <p>Convert pressure, length, and volume units quickly.</p>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="unit-converter-category">Category</label>
        <select id="unit-converter-category" value={category} onChange={handleCategoryChange}>
          {Object.entries(CATEGORIES).map(([value, item]) => (
            <option key={value} value={value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.conversionGrid}>
        <div className={styles.unitBox}>
          <label htmlFor="unit-converter-input">From</label>
          <input
            id="unit-converter-input"
            type="number"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            step="any"
          />
          <select value={fromUnit} onChange={(event) => setFromUnit(event.target.value)}>
            {Object.entries(units).map(([value, unit]) => (
              <option key={value} value={value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.unitBox}>
          <label htmlFor="unit-converter-output">To</label>
          <input
            id="unit-converter-output"
            type="text"
            value={outputValue}
            readOnly
            className={styles.readonlyInput}
          />
          <select value={toUnit} onChange={(event) => setToUnit(event.target.value)}>
            {Object.entries(units).map(([value, unit]) => (
              <option key={value} value={value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.summary}>
        {inputValue || '0'} {units[fromUnit].label} = {outputValue || '0'} {units[toUnit].label}
      </div>
    </div>
  );
};

export default UnitConverter;
