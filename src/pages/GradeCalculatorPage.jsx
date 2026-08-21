import GradeCalculator from '../components/calculators/GradeCalculator/GradeCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const GradeCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Grade Calculator',
        'Calculate your final grade based on assignments, tests, and exams with weighted categories.',
        `/grade-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="grade-calculator"
                schemaData={schema}
            />
            <GradeCalculator />
        </div>
    )
}

export default GradeCalculatorPage
