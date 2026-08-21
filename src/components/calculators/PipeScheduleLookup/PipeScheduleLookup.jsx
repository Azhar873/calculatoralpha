import { useState } from 'react';
import styles from '../PipeWeightCalculator/PipeWeightCalculator.module.scss';

const PIPE_SIZES = {
  '1/2': { label: '1/2 in', od: 0.84, schedules: { 5: 0.065, 10: 0.065, 40: 0.109, 80: 0.147, 160: 0.187 } },
  '3/4': { label: '3/4 in', od: 1.05, schedules: { 5: 0.065, 10: 0.065, 40: 0.113, 80: 0.154, 160: 0.218 } },
  '1': { label: '1 in', od: 1.315, schedules: { 5: 0.065, 10: 0.065, 40: 0.133, 80: 0.179, 160: 0.25 } },
  '1.25': { label: '1 1/4 in', od: 1.66, schedules: { 5: 0.065, 10: 0.065, 40: 0.14, 80: 0.191, 160: 0.25 } },
  '1.5': { label: '1 1/2 in', od: 1.9, schedules: { 5: 0.065, 10: 0.065, 40: 0.145, 80: 0.2, 160: 0.281 } },
  '2': { label: '2 in', od: 2.375, schedules: { 5: 0.065, 10: 0.065, 40: 0.154, 80: 0.218, 160: 0.343 } },
  '2.5': { label: '2 1/2 in', od: 2.875, schedules: { 5: 0.083, 10: 0.083, 40: 0.203, 80: 0.276, 160: 0.375 } },
  '3': { label: '3 in', od: 3.5, schedules: { 5: 0.083, 10: 0.083, 40: 0.216, 80: 0.3, 160: 0.437 } },
  '4': { label: '4 in', od: 4.5, schedules: { 5: 0.083, 10: 0.083, 40: 0.237, 80: 0.337, 160: 0.531 } },
  '6': { label: '6 in', od: 6.625, schedules: { 5: 0.134, 10: 0.134, 40: 0.28, 80: 0.432, 160: 0.718 } },
  '8': { label: '8 in', od: 8.625, schedules: { 5: 0.148, 10: 0.148, 40: 0.322, 80: 0.5, 160: 0.906 } },
  '10': { label: '10 in', od: 10.75, schedules: { 5: 0.165, 10: 0.165, 40: 0.365, 80: 0.594, 160: 1.125 } },
  '12': { label: '12 in', od: 12.75, schedules: { 5: 0.18, 10: 0.18, 40: 0.375, 80: 0.687, 160: 1.312 } },
};

const PipeScheduleLookup = () => {
  const [nominalSize, setNominalSize] = useState('2');
  const [schedule, setSchedule] = useState('40');
  const [result, setResult] = useState(null);

  const selectedPipe = PIPE_SIZES[nominalSize];
  const availableSchedules = Object.keys(selectedPipe.schedules);

  const lookupSchedule = () => {
    const wallThickness = selectedPipe.schedules[schedule];
    const innerDiameter = selectedPipe.od - wallThickness * 2;

    setResult({
      nominalSize: selectedPipe.label,
      schedule,
      outerDiameter: selectedPipe.od,
      wallThickness,
      innerDiameter,
    });
  };

  const handleSizeChange = (event) => {
    const nextSize = event.target.value;
    const nextSchedules = Object.keys(PIPE_SIZES[nextSize].schedules);
    setNominalSize(nextSize);
    setSchedule(nextSchedules.includes(schedule) ? schedule : nextSchedules[0]);
    setResult(null);
  };

  const resetLookup = () => {
    setNominalSize('2');
    setSchedule('40');
    setResult(null);
  };

  const toMillimeters = (value) => (value * 25.4).toFixed(2);

  return (
    <div className={styles.pipeWeightCalculatorContainer}>
      <div className={styles.pipeWeightCalculator}>
        <div className={styles.header}>
          <h2>Pipe Schedule Lookup</h2>
          <p>Find standard pipe dimensions by nominal size and schedule.</p>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="pipe-schedule-size">Nominal Pipe Size (NPS)</label>
          <select id="pipe-schedule-size" value={nominalSize} onChange={handleSizeChange}>
            {Object.entries(PIPE_SIZES).map(([value, pipe]) => (
              <option key={value} value={value}>
                NPS {pipe.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="pipe-schedule-number">Pipe Schedule</label>
          <select
            id="pipe-schedule-number"
            value={schedule}
            onChange={(event) => {
              setSchedule(event.target.value);
              setResult(null);
            }}
          >
            {availableSchedules.map((value) => (
              <option key={value} value={value}>
                Schedule {value}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.buttonGroup}>
          <button type="button" onClick={lookupSchedule} className={styles.calculateBtn}>
            Find Dimensions
          </button>
          <button type="button" onClick={resetLookup} className={styles.resetBtn}>
            Reset
          </button>
        </div>

        {result && (
          <div className={styles.resultContainer}>
            <h3>NPS {result.nominalSize} | Schedule {result.schedule}</h3>
            <div className={styles.resultGrid}>
              <div className={styles.resultItem}>
                <p className={styles.resultLabel}>Outside Diameter</p>
                <p className={styles.resultValue}>{result.outerDiameter} in / {toMillimeters(result.outerDiameter)} mm</p>
              </div>
              <div className={styles.resultItem}>
                <p className={styles.resultLabel}>Wall Thickness</p>
                <p className={styles.resultValue}>{result.wallThickness} in / {toMillimeters(result.wallThickness)} mm</p>
              </div>
              <div className={`${styles.resultItem} ${styles.highlight}`}>
                <p className={styles.resultLabel}>Inside Diameter</p>
                <p className={styles.resultValue}>{result.innerDiameter.toFixed(3)} in / {toMillimeters(result.innerDiameter)} mm</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PipeScheduleLookup;
