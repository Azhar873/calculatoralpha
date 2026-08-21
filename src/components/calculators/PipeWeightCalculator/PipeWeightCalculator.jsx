import { useState } from 'react';
import styles from './PipeWeightCalculator.module.scss';

const MATERIALS = {
  steel: { label: 'Steel', density: 490 },
  stainlessSteel: { label: 'Stainless Steel', density: 494 },
  aluminum: { label: 'Aluminum', density: 169 },
  copper: { label: 'Copper', density: 559 },
  pvc: { label: 'PVC', density: 80 },
};

const PipeWeightCalculator = () => {
  const [unitSystem, setUnitSystem] = useState('metric');
  const [material, setMaterial] = useState('steel');
  const [diameter, setDiameter] = useState('');
  const [wallThickness, setWallThickness] = useState('');
  const [length, setLength] = useState('');
  const [result, setResult] = useState(null);

  const handleUnitChange = (unit) => {
    setUnitSystem(unit);
    setDiameter('');
    setWallThickness('');
    setLength('');
    setResult(null);
  };

  const calculatePipeWeight = () => {
    const outerDiameter = parseFloat(diameter);
    const thickness = parseFloat(wallThickness);
    const pipeLength = parseFloat(length);

    if (
      Number.isNaN(outerDiameter) ||
      Number.isNaN(thickness) ||
      Number.isNaN(pipeLength) ||
      outerDiameter <= 0 ||
      thickness <= 0 ||
      pipeLength <= 0
    ) {
      alert('Please enter valid values for diameter, wall thickness, and length.');
      return;
    }

    if (thickness * 2 >= outerDiameter) {
      alert('Wall thickness must be less than half of the outer diameter.');
      return;
    }

    const density = MATERIALS[material].density;
    const diameterInches = unitSystem === 'metric' ? outerDiameter / 25.4 : outerDiameter;
    const thicknessInches = unitSystem === 'metric' ? thickness / 25.4 : thickness;
    const lengthFeet = unitSystem === 'metric' ? pipeLength * 3.28084 : pipeLength;

    const innerDiameterInches = diameterInches - 2 * thicknessInches;

    const outerRadius = diameterInches / 2;
    const innerRadius = innerDiameterInches / 2;
    const crossSectionAreaSqIn = Math.PI * (outerRadius ** 2 - innerRadius ** 2);
    const volumePerFoot = crossSectionAreaSqIn * 12;
    const volumeInCuFt = volumePerFoot / 1728;

    const weightPerFoot = volumeInCuFt * density;
    const totalWeight = weightPerFoot * lengthFeet;
    const totalWeightKg = totalWeight * 0.453592;

    setResult({
      materialName: MATERIALS[material].label,
      density,
      weightPerFoot: weightPerFoot.toFixed(2),
      totalWeight: totalWeight.toFixed(2),
      totalWeightKg: totalWeightKg.toFixed(2),
    });
  };

  const resetCalculator = () => {
    setDiameter('');
    setWallThickness('');
    setLength('');
    setResult(null);
  };

  return (
    <div className={styles.pipeWeightCalculatorContainer}>
      <div className={styles.pipeWeightCalculator}>
        <div className={styles.header}>
          <h2>Pipe Weight Calculator</h2>
          <p>Estimate pipe weight based on diameter, wall thickness, length, and material.</p>
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
          <label htmlFor="material">Material</label>
          <select id="material" value={material} onChange={(e) => setMaterial(e.target.value)}>
            {Object.entries(MATERIALS).map(([key, item]) => (
              <option key={key} value={key}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="diameter">
            {unitSystem === 'metric' ? 'Outer Diameter (mm)' : 'Outer Diameter (in)'}
          </label>
          <input
            id="diameter"
            type="number"
            value={diameter}
            onChange={(e) => setDiameter(e.target.value)}
            placeholder={unitSystem === 'metric' ? 'e.g. 50' : 'e.g. 2'}
            min="0"
            step="any"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="wallThickness">
            {unitSystem === 'metric' ? 'Wall Thickness (mm)' : 'Wall Thickness (in)'}
          </label>
          <input
            id="wallThickness"
            type="number"
            value={wallThickness}
            onChange={(e) => setWallThickness(e.target.value)}
            placeholder={unitSystem === 'metric' ? 'e.g. 3' : 'e.g. 0.2'}
            min="0"
            step="any"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="length">{unitSystem === 'metric' ? 'Length (m)' : 'Length (ft)'}</label>
          <input
            id="length"
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            placeholder={unitSystem === 'metric' ? 'e.g. 6' : 'e.g. 20'}
            min="0"
            step="any"
          />
        </div>

        <div className={styles.buttonGroup}>
          <button type="button" onClick={calculatePipeWeight} className={styles.calculateBtn}>
            Calculate Weight
          </button>
          <button type="button" onClick={resetCalculator} className={styles.resetBtn}>
            Reset
          </button>
        </div>

        {result && (
          <div className={styles.resultContainer}>
            <h3>Results</h3>
            <div className={styles.resultGrid}>
              <div className={styles.resultItem}>
                <p className={styles.resultLabel}>Material</p>
                <p className={styles.resultValue}>{result.materialName}</p>
              </div>
              <div className={styles.resultItem}>
                <p className={styles.resultLabel}>Weight / ft</p>
                <p className={styles.resultValue}>{result.weightPerFoot} lb/ft</p>
              </div>
              <div className={styles.resultItem + ' ' + styles.highlight}>
                <p className={styles.resultLabel}>Total Weight</p>
                <p className={styles.resultValue}>{result.totalWeight} lb</p>
              </div>
              <div className={styles.resultItem + ' ' + styles.highlight}>
                <p className={styles.resultLabel}>Equivalent in kg</p>
                <p className={styles.resultValue}>{result.totalWeightKg} kg</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PipeWeightCalculator;