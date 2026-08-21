import { useState } from 'react';
import styles from '../PipeWeightCalculator/PipeWeightCalculator.module.scss';

const PipeVolumeCalculator = () => {
  const [unitSystem, setUnitSystem] = useState('metric');
  const [diameter, setDiameter] = useState('');
  const [length, setLength] = useState('');
  const [result, setResult] = useState(null);

  const handleUnitChange = (unit) => {
    setUnitSystem(unit);
    setDiameter('');
    setLength('');
    setResult(null);
  };

  const calculateVolume = () => {
    const innerDiameter = parseFloat(diameter);
    const pipeLength = parseFloat(length);

    if (
      Number.isNaN(innerDiameter) ||
      Number.isNaN(pipeLength) ||
      innerDiameter <= 0 ||
      pipeLength <= 0
    ) {
      alert('Please enter valid values for inner diameter and length.');
      return;
    }

    if (unitSystem === 'metric') {
      const diameterInMeters = innerDiameter / 1000;
      const volumeInCubicMeters = Math.PI * (diameterInMeters / 2) ** 2 * pipeLength;

      setResult({
        primary: `${volumeInCubicMeters.toFixed(4)} m³`,
        secondary: `${(volumeInCubicMeters * 1000).toFixed(2)} L`,
        label: 'Pipe Volume',
      });
      return;
    }

    const volumeInCubicFeet = Math.PI * (innerDiameter / 2) ** 2 * pipeLength / 1728;

    setResult({
      primary: `${volumeInCubicFeet.toFixed(4)} ft³`,
      secondary: `${(volumeInCubicFeet * 7.48052).toFixed(2)} US gal`,
      label: 'Pipe Volume',
    });
  };

  const resetCalculator = () => {
    setDiameter('');
    setLength('');
    setResult(null);
  };

  return (
    <div className={styles.pipeWeightCalculatorContainer}>
      <div className={styles.pipeWeightCalculator}>
        <div className={styles.header}>
          <h2>Pipe Volume Calculator</h2>
          <p>Calculate the internal volume of a cylindrical pipe.</p>
        </div>

        <div className={styles.controls}>
          <div className={styles.toggleGroup}>
            <button
              type="button"
              className={`${styles.toggleBtn} ${unitSystem === 'metric' ? styles.active : ''}`}
              onClick={() => handleUnitChange('metric')}
            >
              Metric (mm, m)
            </button>
            <button
              type="button"
              className={`${styles.toggleBtn} ${unitSystem === 'imperial' ? styles.active : ''}`}
              onClick={() => handleUnitChange('imperial')}
            >
              Imperial (in, ft)
            </button>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="pipe-volume-diameter">
            {unitSystem === 'metric' ? 'Inner Diameter (mm)' : 'Inner Diameter (in)'}
          </label>
          <input
            id="pipe-volume-diameter"
            type="number"
            value={diameter}
            onChange={(event) => setDiameter(event.target.value)}
            placeholder={unitSystem === 'metric' ? 'e.g. 50' : 'e.g. 2'}
            min="0"
            step="any"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="pipe-volume-length">
            {unitSystem === 'metric' ? 'Length (m)' : 'Length (ft)'}
          </label>
          <input
            id="pipe-volume-length"
            type="number"
            value={length}
            onChange={(event) => setLength(event.target.value)}
            placeholder={unitSystem === 'metric' ? 'e.g. 6' : 'e.g. 20'}
            min="0"
            step="any"
          />
        </div>

        <div className={styles.buttonGroup}>
          <button type="button" onClick={calculateVolume} className={styles.calculateBtn}>
            Calculate Volume
          </button>
          <button type="button" onClick={resetCalculator} className={styles.resetBtn}>
            Reset
          </button>
        </div>

        {result && (
          <div className={styles.resultContainer}>
            <h3>Results</h3>
            <div className={styles.resultGrid}>
              <div className={`${styles.resultItem} ${styles.highlight}`}>
                <p className={styles.resultLabel}>{result.label}</p>
                <p className={styles.resultValue}>{result.primary}</p>
              </div>
              <div className={`${styles.resultItem} ${styles.highlight}`}>
                <p className={styles.resultLabel}>Equivalent Volume</p>
                <p className={styles.resultValue}>{result.secondary}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PipeVolumeCalculator;
