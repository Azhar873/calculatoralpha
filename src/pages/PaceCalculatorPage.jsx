import PaceCalculator from '../components/calculators/PaceCalculator/PaceCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const PaceCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Pace Calculator',
        'Calculate your running or walking pace, speed, and finish time.',
        `/pace-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="pace-calculator"
                schemaData={schema}
            />
            <PaceCalculator />
        </div>
    )
}

export default PaceCalculatorPage
