import DueDateCalculator from '../components/calculators/DueDateCalculator/DueDateCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const DueDateCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Due Date Calculator',
        'Calculate your pregnancy due date based on last menstrual period or conception date.',
        `/due-date-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="due-date-calculator"
                schemaData={schema}
            />
            <DueDateCalculator />
        </div>
    )
}

export default DueDateCalculatorPage
