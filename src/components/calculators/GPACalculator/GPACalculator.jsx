import { useState, useEffect } from 'react'
import { Plus, Trash2, GraduationCap } from 'lucide-react'
import styles from './GPACalculator.module.scss'

const GPACalculator = () => {
    const [courses, setCourses] = useState([
        { id: 1, name: 'Course 1', grade: '4.0', credits: 3 },
        { id: 2, name: 'Course 2', grade: '3.7', credits: 3 },
        { id: 3, name: 'Course 3', grade: '3.3', credits: 3 },
    ])
    const [gpa, setGpa] = useState(0)
    const [totalCredits, setTotalCredits] = useState(0)

    const gradePoints = {
        '4.0': 4.0, '3.7': 3.7, '3.3': 3.3,
        '3.0': 3.0, '2.7': 2.7, '2.3': 2.3,
        '2.0': 2.0, '1.7': 1.7, '1.3': 1.3,
        '1.0': 1.0, '0.7': 0.7, '0.0': 0.0
    }

    const gradeOptions = Object.keys(gradePoints).map(g => ({
        label: g === '4.0' ? 'A (4.0)' :
            g === '3.7' ? 'A- (3.7)' :
                g === '3.3' ? 'B+ (3.3)' :
                    g === '3.0' ? 'B (3.0)' :
                        g === '2.7' ? 'B- (2.7)' :
                            g === '2.3' ? 'C+ (2.3)' :
                                g === '2.0' ? 'C (2.0)' :
                                    g === '1.7' ? 'C- (1.7)' :
                                        g === '1.3' ? 'D+ (1.3)' :
                                            g === '1.0' ? 'D (1.0)' :
                                                g === '0.7' ? 'D- (0.7)' : 'F (0.0)',
        value: g
    }))

    useEffect(() => {
        calculateGPA()
    }, [courses])

    const calculateGPA = () => {
        let totalPoints = 0
        let totalCreds = 0

        courses.forEach(course => {
            const coursePoints = gradePoints[course.grade] || 0
            const courseCredits = parseFloat(course.credits) || 0

            if (courseCredits > 0) {
                totalPoints += coursePoints * courseCredits
                totalCreds += courseCredits
            }
        })

        setTotalCredits(totalCreds)
        setGpa(totalCreds > 0 ? (totalPoints / totalCreds).toFixed(2) : 0)
    }

    const addCourse = () => {
        setCourses([
            ...courses,
            { id: Date.now(), name: `Course ${courses.length + 1}`, grade: '4.0', credits: 3 }
        ])
    }

    const removeCourse = (id) => {
        if (courses.length > 1) {
            setCourses(courses.filter(c => c.id !== id))
        }
    }

    const updateCourse = (id, field, value) => {
        setCourses(courses.map(c =>
            c.id === id ? { ...c, [field]: value } : c
        ))
    }

    return (
        <div className={styles.gpaCalculatorContainer}>
            <div className={styles.gpaCalculator}>
                <div className={styles.header}>
                    <h2>GPA Calculator</h2>
                    <p>Calculate your semester or cumulative GPA easily</p>
                </div>

                <div className={styles.coursesList}>
                    {courses.map((course) => (
                        <div key={course.id} className={styles.courseRow}>
                            <div className={styles.inputGroup}>
                                <label>Course Name</label>
                                <input
                                    type="text"
                                    value={course.name}
                                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                                    placeholder="e.g. Mathematics"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Grade</label>
                                <select
                                    value={course.grade}
                                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                                >
                                    {gradeOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Credits</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.5"
                                    value={course.credits}
                                    onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                                />
                            </div>
                            <button
                                className={styles.removeBtn}
                                onClick={() => removeCourse(course.id)}
                                title="Remove Course"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className={styles.actions}>
                    <button className={styles.addBtn} onClick={addCourse}>
                        <Plus size={18} /> Add Course
                    </button>
                </div>

                <div className={styles.resultContainer}>
                    <div className={styles.resultLabel}>Your GPA</div>
                    <div className={styles.resultValue}>{gpa}</div>
                    <div className={styles.resultSummary}>
                        Based on {totalCredits} total credits
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GPACalculator
