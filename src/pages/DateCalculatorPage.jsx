import DateCalculator from '../components/calculators/DateCalculator/DateCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const DateCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Date Calculator',
        'Calculate the difference between two dates or add/subtract days from a date.',
        `/date-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="date-calculator"
                schemaData={schema}
            />
            <DateCalculator />
        </div>
    )
}

export default DateCalculatorPage
