import TimeCalculator from '../components/calculators/TimeCalculator/TimeCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const TimeCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Time Calculator',
        'Calculate time difference, add or subtract time with hours, minutes, and seconds.',
        `/time-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="time-calculator"
                schemaData={schema}
            />
            <TimeCalculator />
        </div>
    )
}

export default TimeCalculatorPage
