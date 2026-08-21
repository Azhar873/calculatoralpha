import { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import styles from './GradeCalculator.module.scss'

const GradeCalculator = () => {
    const [assignments, setAssignments] = useState([
        { id: 1, name: 'Assignment 1', grade: 85, weight: 20 },
        { id: 2, name: 'Assignment 2', grade: 90, weight: 30 },
        { id: 3, name: 'Final Exam', grade: 95, weight: 50 },
    ])
    const [finalGrade, setFinalGrade] = useState(0)
    const [totalWeight, setTotalWeight] = useState(0)

    useEffect(() => {
        calculateGrade()
    }, [assignments])

    const calculateGrade = () => {
        let totalWeightedScore = 0
        let currentTotalWeight = 0

        assignments.forEach(assignment => {
            const grade = parseFloat(assignment.grade) || 0
            const weight = parseFloat(assignment.weight) || 0

            if (weight > 0) {
                totalWeightedScore += grade * weight
                currentTotalWeight += weight
            }
        })

        setTotalWeight(currentTotalWeight)
        setFinalGrade(currentTotalWeight > 0 ? (totalWeightedScore / currentTotalWeight).toFixed(2) : 0)
    }

    const addAssignment = () => {
        setAssignments([
            ...assignments,
            { id: Date.now(), name: `Assignment ${assignments.length + 1}`, grade: '', weight: '' }
        ])
    }

    const removeAssignment = (id) => {
        if (assignments.length > 1) {
            setAssignments(assignments.filter(a => a.id !== id))
        }
    }

    const updateAssignment = (id, field, value) => {
        setAssignments(assignments.map(a =>
            a.id === id ? { ...a, [field]: value } : a
        ))
    }

    return (
        <div className={styles.gradeCalculatorContainer}>
            <div className={styles.gradeCalculator}>
                <div className={styles.header}>
                    <h2>Grade Calculator</h2>
                    <p>Calculate your class grade by entering assignments and weights</p>
                </div>

                <div className={styles.coursesList}>
                    {assignments.map((assignment) => (
                        <div key={assignment.id} className={styles.courseRow}>
                            <div className={styles.inputGroup}>
                                <label>Assignment Name</label>
                                <input
                                    type="text"
                                    value={assignment.name}
                                    onChange={(e) => updateAssignment(assignment.id, 'name', e.target.value)}
                                    placeholder="e.g. Midterm"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Grade (%)</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={assignment.grade}
                                    onChange={(e) => updateAssignment(assignment.id, 'grade', e.target.value)}
                                    placeholder="85"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Weight</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={assignment.weight}
                                    onChange={(e) => updateAssignment(assignment.id, 'weight', e.target.value)}
                                    placeholder="20"
                                />
                            </div>
                            <button
                                className={styles.removeBtn}
                                onClick={() => removeAssignment(assignment.id)}
                                title="Remove Assignment"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className={styles.actions}>
                    <button className={styles.addBtn} onClick={addAssignment}>
                        <Plus size={18} /> Add Assignment
                    </button>
                </div>

                <div className={styles.resultContainer}>
                    <div className={styles.resultLabel}>Your Weighted Grade</div>
                    <div className={styles.resultValue}>{finalGrade}%</div>
                    <div className={styles.resultSummary}>
                        Based on {totalWeight} total weight units
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GradeCalculator
