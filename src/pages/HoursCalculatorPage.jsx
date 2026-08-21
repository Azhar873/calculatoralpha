import HoursCalculator from '../components/calculators/HoursCalculator/HoursCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const HoursCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Hours Calculator',
        'Calculate hours and minutes between two times for work time tracking.',
        `/hours-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="hours-calculator"
                schemaData={schema}
            />
            <HoursCalculator />
        </div>
    )
}

export default HoursCalculatorPage
