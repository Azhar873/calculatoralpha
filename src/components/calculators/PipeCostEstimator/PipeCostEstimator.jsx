import { useState } from 'react';
import styles from '../PipeWeightCalculator/PipeWeightCalculator.module.scss';

const PIPE_SIZES = {
  '1': { label: '1 in', od: 1.315, schedules: { 40: 0.133, 80: 0.179 } },
  '1.5': { label: '1 1/2 in', od: 1.9, schedules: { 40: 0.145, 80: 0.2 } },
  '2': { label: '2 in', od: 2.375, schedules: { 40: 0.154, 80: 0.218 } },
  '3': { label: '3 in', od: 3.5, schedules: { 40: 0.216, 80: 0.3 } },
  '4': { label: '4 in', od: 4.5, schedules: { 40: 0.237, 80: 0.337 } },
  '6': { label: '6 in', od: 6.625, schedules: { 40: 0.28, 80: 0.432 } },
  '8': { label: '8 in', od: 8.625, schedules: { 40: 0.322, 80: 0.5 } },
};

const MATERIALS = {
  steel: { label: 'Carbon Steel', density: 7850 },
  stainless: { label: 'Stainless Steel', density: 8000 },
  aluminum: { label: 'Aluminum', density: 2700 },
  pvc: { label: 'PVC', density: 1400 },
};

const PipeCostEstimator = () => {
  const [size, setSize] = useState('2');
  const [schedule, setSchedule] = useState('40');
  const [length, setLength] = useState('6');
  const [material, setMaterial] = useState('steel');
  const [price, setPrice] = useState('2.5');
  const [result, setResult] = useState(null);

  const selectedPipe = PIPE_SIZES[size];
  const schedules = Object.keys(selectedPipe.schedules);

  const calculateCost = () => {
    const pipeLength = parseFloat(length);
    const pricePerKg = parseFloat(price);

    if (
      Number.isNaN(pipeLength) ||
      Number.isNaN(pricePerKg) ||
      pipeLength <= 0 ||
      pricePerKg < 0
    ) {
      alert('Please enter a valid length and material price.');
      return;
    }

    const outerDiameterMeters = selectedPipe.od * 0.0254;
    const wallThicknessMeters = selectedPipe.schedules[schedule] * 0.0254;
    const innerDiameterMeters = outerDiameterMeters - wallThicknessMeters * 2;
    const crossSectionArea = Math.PI * (
      (outerDiameterMeters / 2) ** 2 - (innerDiameterMeters / 2) ** 2
    );
    const volume = crossSectionArea * pipeLength;
    const weight = volume * MATERIALS[material].density;
    const totalCost = weight * pricePerKg;

    setResult({
      weight: weight.toFixed(2),
      totalCost: totalCost.toFixed(2),
      material: MATERIALS[material].label,
      size: selectedPipe.label,
      schedule,
    });
  };

  const handleSizeChange = (event) => {
    const nextSize = event.target.value;
    const nextSchedules = Object.keys(PIPE_SIZES[nextSize].schedules);
    setSize(nextSize);
    setSchedule(nextSchedules.includes(schedule) ? schedule : nextSchedules[0]);
    setResult(null);
  };

  const resetCalculator = () => {
    setSize('2');
    setSchedule('40');
    setLength('6');
    setMaterial('steel');
    setPrice('2.5');
    setResult(null);
  };

  return (
    <div className={styles.pipeWeightCalculatorContainer}>
      <div className={styles.pipeWeightCalculator}>
        <div className={styles.header}>
          <h2>Pipe Cost Estimator</h2>
          <p>Estimate pipe weight and material cost for your project.</p>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="pipe-cost-size">Nominal Pipe Size</label>
          <select id="pipe-cost-size" value={size} onChange={handleSizeChange}>
            {Object.entries(PIPE_SIZES).map(([value, pipe]) => (
              <option key={value} value={value}>NPS {pipe.label}</option>
            ))}
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="pipe-cost-schedule">Pipe Schedule</label>
          <select id="pipe-cost-schedule" value={schedule} onChange={(event) => setSchedule(event.target.value)}>
            {schedules.map((value) => (
              <option key={value} value={value}>Schedule {value}</option>
            ))}
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="pipe-cost-length">Pipe Length (m)</label>
          <input id="pipe-cost-length" type="number" min="0" step="any" value={length} onChange={(event) => setLength(event.target.value)} />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="pipe-cost-material">Material</label>
          <select id="pipe-cost-material" value={material} onChange={(event) => setMaterial(event.target.value)}>
            {Object.entries(MATERIALS).map(([value, item]) => (
              <option key={value} value={value}>{item.label}</option>
            ))}
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="pipe-cost-price">Material Price (per kg)</label>
          <input id="pipe-cost-price" type="number" min="0" step="any" value={price} onChange={(event) => setPrice(event.target.value)} />
        </div>

        <div className={styles.buttonGroup}>
          <button type="button" onClick={calculateCost} className={styles.calculateBtn}>Estimate Cost</button>
          <button type="button" onClick={resetCalculator} className={styles.resetBtn}>Reset</button>
        </div>

        {result && (
          <div className={styles.resultContainer}>
            <h3>{result.size} | Schedule {result.schedule}</h3>
            <div className={styles.resultGrid}>
              <div className={styles.resultItem}>
                <p className={styles.resultLabel}>Material</p>
                <p className={styles.resultValue}>{result.material}</p>
              </div>
              <div className={styles.resultItem}>
                <p className={styles.resultLabel}>Estimated Weight</p>
                <p className={styles.resultValue}>{result.weight} kg</p>
              </div>
              <div className={`${styles.resultItem} ${styles.highlight}`}>
                <p className={styles.resultLabel}>Estimated Cost</p>
                <p className={styles.resultValue}>${result.totalCost}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PipeCostEstimator;
